import { Platform } from "react-native";

// https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/
// https://reactnative.dev/docs/textinput

// have defaults for standard data entry types
// number
// postal code
// firstname
// lastname
// phone number
// phone code
// address todo:
// text

export const EMAIL_PROPS = {
  placeholder: "Email",
  spellCheck: false,
  autoCorrect: true,
  autoCompleteType: "email",
  textContentType: "emailAddress",
  keyboardType: "email-address",
  autoCapitalize: "none",
};

export const SERIOUS_PROPS = {
  spellCheck: false,
  autoCorrect: true,
  keyboardType: Platform.OS === "android" ? "default" : "ascii-capable",
};

export const USERNAME_PROPS = {
  placeholder: "Username",
  ...SERIOUS_PROPS,
  autoCorrect: false,
  autoCompleteType: "off",
  numberOfLines: 1,
  maxLength: 10,
};

export const PASSWORD_PROPS = {
  placeholder: "Password",
  secureTextEntry: true, //causes other textinputs to not have suggestions.
  spellCheck: false,
  autoCorrect: true,
  autoCompleteType: "password",
  textContentType: "password", //causes other textinputs to not have suggestions.
  keyboardType: Platform.OS === "android" ? "default" : "ascii-capable",
};

export const HIDE_UNDERLINE_PROPS = {
  underlineColorAndroid: "transparent",
};

export const NUMBER_PROPS = {
  placeholder: "Number",
  autoCapitalize: "none",
  autoCompleteType: "off",
  autoCorrect: false,
  keyboardType: "number-pad",
  returnKeyType: "done",
};

export const POSTAL_CODE_PROPS = {
  // is an extension of number
  ...NUMBER_PROPS,
  textContentType: "postalCode",
  autoCompleteType: "postal-code",
  keyboardType: "number-pad",
  placeholder: "Postal Code",
  maxLength: 5,
};

export const PHONE_PROPS = {
  // is an extension of number
  ...NUMBER_PROPS,
  textContentType: "telephoneNumber",
  autoCompleteType: "tel",
  keyboardType: "phone-pad",
  placeholder: "Phone",
  maxLength: 11,
  importantForAutofill: true,
};

// I believe this is the best we can do. Maybe we need auto entry stuff?
export const PHONE_CODE_PROPS = {
  // an extension of number
  ...NUMBER_PROPS,
  textContentType: "oneTimeCode", //this is the main one, maybe try only with this and nothing else?
  // autoCompleteType: "off",
  keyboardType: "number-pad",
  placeholder: "Code",
  maxLength: 6,
  importantForAutofill: true,
};
