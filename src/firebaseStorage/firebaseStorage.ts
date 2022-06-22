import { EXPO_MEDIA_PICKER } from "@jrohweller/mycomponents.ui.expo-media-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { getAuth } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";

// TODO: would be better as a class. OOP ftw?
// then we'd do export const new MediaPicker(400, firebase_config);

export const MEDIA_FOLDER_NAME = "userUploads";

interface ImageResult {
  uri: string;
  width: number;
  height: number;
}

// const firebaseApp = initializeApp(GOOGLE_FIREBASE_CONFIG);
// const storage = getStorage(firebaseApp);

const FIREBASE_STORAGE = {
  MAX_SIZE: 400,

  // options is MediaPickerOptions
  selectAndUploadMedia: async (
    options: any,
    storageRef: string,
    storage: any
  ) => {
    const { currentUser } = getAuth();
    let result = await EXPO_MEDIA_PICKER.openPicker(options);

    if (!result.cancelled) {
      // STICK IN DB AS WELL.

      try {
        if (currentUser) {
          const mediaContentCopy = await FIREBASE_STORAGE.getUploadedMedia(
            result,
            storageRef,
            storage
          );
          return mediaContentCopy;

          // TODO: send mediaContentCopy uri.
        }
      } catch (error) {
        console.info(error);
        return null;
      }
    }
    return null;
  },

  uploadImageAsync: async (uri: string, id: string, storage: any) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    // TODO: tell other people:
    // THE ACTUAL SOLUTION:
    // https://github.com/invertase/react-native-firebase/issues/2521
    // everything else did jack.
    let blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.info(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imagesRef = ref(storage, `${MEDIA_FOLDER_NAME}/${id}`);
    // const fileRef = ref(getStorage(), id);
    const metadata = {
      cacheControl: "public, max-age=86400",
    };

    // @ts-ignore
    await uploadBytes(imagesRef, blob, metadata);

    // We're done with the blob, close and release it
    // @ts-ignore
    blob.close();

    return await getDownloadURL(imagesRef);
  },

  resizeImage: async (
    uri: string,
    width: number,
    height: number,
    mult: number
  ): Promise<ImageResult> => {
    // https://docs.expo.io/versions/latest/sdk/imagemanipulator/

    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [
          {
            resize: {
              width: Math.round(width * mult),
              height: Math.round(height * mult),
            },
          },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult;
    } catch (error) {
      console.info(error);
      return { uri, width, height };
    }
  },

  getMultValue: (width: number, height: number, size?: number) => {
    // no divide by zero or undefined. typescript would prevent this.
    if (!width || !height) {
      return 1;
    }

    let newWidth = width;
    let newHeight = height;
    // while the current height is too big, make it smaller.
    while (
      newHeight > (size || FIREBASE_STORAGE.MAX_SIZE) ||
      newWidth > (size || FIREBASE_STORAGE.MAX_SIZE)
    ) {
      //
      newHeight *= 0.99;
      newWidth *= 0.99;
    }

    return newWidth / width;
  },

  // https://firebase.google.com/docs/storage/web/delete-files

  deleteMediaUrl: async (
    url: string,
    onDeleteComplete: VoidFunction,
    storage: any
  ) => {
    const mediaRef = ref(storage, url);
    await deleteObject(mediaRef)
      .then(() => {
        // File deleted successfully
        onDeleteComplete();
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        console.info(JSON.stringify(error));
      });
  },

  // https://firebase.google.com/docs/storage/web/file-metadata
  getFileMetadata: async (url: string, storage: any) => {
    try {
      const metadataRef = await ref(storage, url);
      const metadata = await getMetadata(metadataRef);
      return metadata;
    } catch (error) {
      console.info(JSON.stringify(error));
      return { error, isError: true };
    }
  },

  getUploadedMedia: async (
    mediaContent: any,
    id: string,
    storage: any,
    size?: number
  ) => {
    let mediaContentCopy = {
      uri: "",
      width: size || FIREBASE_STORAGE.MAX_SIZE,
      height: size || FIREBASE_STORAGE.MAX_SIZE,
    };
    if (mediaContent?.uri) {
      mediaContentCopy = { ...mediaContent };
      if (mediaContent?.type !== "video") {
        const multValue = await FIREBASE_STORAGE.getMultValue(
          mediaContent?.width || size || FIREBASE_STORAGE.MAX_SIZE,
          mediaContent?.height || size || FIREBASE_STORAGE.MAX_SIZE
        );
        const manipResult = await FIREBASE_STORAGE.resizeImage(
          mediaContent?.uri,
          mediaContent?.width || size || FIREBASE_STORAGE.MAX_SIZE,
          mediaContent?.height || size || FIREBASE_STORAGE.MAX_SIZE,
          multValue
        );
        const url = await FIREBASE_STORAGE.uploadImageAsync(
          manipResult.uri,
          id,
          storage
        );

        mediaContentCopy.uri = url;
        mediaContentCopy.width = manipResult.width;
        mediaContentCopy.height = manipResult.height;
        return mediaContentCopy;
      } else {
        const url = await FIREBASE_STORAGE.uploadImageAsync(
          mediaContent.uri,
          id,
          storage
        );
        const thumbnailContent =
          await EXPO_MEDIA_PICKER.generateThumbnailFromVideo(url);

        const multValue = await FIREBASE_STORAGE.getMultValue(
          thumbnailContent?.width || size || FIREBASE_STORAGE.MAX_SIZE,
          thumbnailContent?.height || size || FIREBASE_STORAGE.MAX_SIZE
        );
        const manipResult = await FIREBASE_STORAGE.resizeImage(
          thumbnailContent?.uri,
          thumbnailContent?.width || size || FIREBASE_STORAGE.MAX_SIZE,
          thumbnailContent?.height || size || FIREBASE_STORAGE.MAX_SIZE,
          multValue
        );
        const thumbnailUrl = await FIREBASE_STORAGE.uploadImageAsync(
          manipResult.uri,
          `thumbnail${id}`,
          storage
        );

        // @ts-ignore
        mediaContentCopy.thumbnailContent = {
          uri: thumbnailUrl,
          width: manipResult.width,
          height: manipResult.height,
        };
        mediaContentCopy.uri = url;
        return mediaContentCopy;
      }
    }
    return mediaContentCopy;
  },
};

export default FIREBASE_STORAGE;
