import * as VideoThumbnails from "expo-video-thumbnails";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

// https://docs.expo.dev/versions/latest/sdk/imagepicker/
const EXPO_MEDIA_PICKER = {
  MediaTypeOptions: ImagePicker.MediaTypeOptions,
  requestMediaLibraryPermissionsAsync:
    ImagePicker.requestMediaLibraryPermissionsAsync,
  // TODO: maybe create a separate file for image resizing.

  generateThumbnailFromVideo: async (videoUrl: string) => {
    const result = await VideoThumbnails.getThumbnailAsync(videoUrl, {
      time: 1,
    });
    return result;
  },

  openPicker: async (options?: any) => {
    // https://docs.expo.dev/versions/latest/sdk/imagepicker/#returns-4
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      videoQuality:
        Platform.OS === "ios"
          ? ImagePicker.UIImagePickerControllerQualityType.Medium
          : undefined,
      // videoExportPreset: ImagePicker.VideoExportPreset.LowQuality, //ImagePicker.VideoExportPreset.H264_640x480,
      videoMaxDuration: 10, //max 30 second video
      ...options,
    });

    return result;
  },
};

export default EXPO_MEDIA_PICKER;
