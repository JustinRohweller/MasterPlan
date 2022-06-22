import * as Yup from "yup";
import {
  EMAIL_PROPS,
  HIDE_UNDERLINE_PROPS,
  PASSWORD_PROPS,
  PHONE_CODE_PROPS,
  PHONE_PROPS,
  POSTAL_CODE_PROPS,
  SERIOUS_PROPS,
} from "./inputPropGroups";

// info: HOW IT WORKS:
// BASICALLY JUST USE CREATEONESCHEME for each component that you need.

// https://github.com/jquense/yup

// have defaults for standard screens.
// sign up
// log in
// forgot password
// update password
// ect.

// todo:
// start time
// end time (VERY COMMON)
// location
//

// https://reactnative.dev/docs/textinput
// https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/

// todo: maybe split into multiple files?/folder

// INFO:
//  WE ARE SAYING THAT THE GREATER SCHEME/COMBINATION OF SCHEMES IS A SCHEMA

const COMPONENT_TYPES = [
  "textinput",
  "datepicker",
  "timepicker",
  "imagepicker",
  "buttongroup",
  "ampm", //currently no component exists.
  "singleSelect", //UI kitten select
  "multiSelect",
  "check",
];

const createOneScheme = <
  ValueType,
  SchemaType,
  ComponentPropsType,
  WrapperPropsType
>(
  id: string,
  value: ValueType,
  schema: any,
  componentType: string,
  componentProps?: ComponentPropsType,
  wrapperProps?: WrapperPropsType
) => {
  const defaultObj = {
    id,
    title: id, //FORMIK IS USING THE TITLE PROPERTY, SO WE NEED TO USE IT.
    value,
    schema,
    componentType,
    componentProps,
    wrapperProps,
  };

  return defaultObj;
};

// https://reactnative.dev/docs/textinput

// todo: info:
// id is the id.
const PASSWORD_SCHEME = createOneScheme(
  "password",
  "",
  Yup.string().required("Password is required"),
  COMPONENT_TYPES[0],
  {
    ...PASSWORD_PROPS,
    ...HIDE_UNDERLINE_PROPS,
  }
);

const EMAIL_SCHEME = createOneScheme(
  "email",
  "",
  Yup.string()
    .email("Please enter a valid email address")
    .trim()
    .required("Email is required"),
  COMPONENT_TYPES[0],
  {
    ...EMAIL_PROPS,
    ...HIDE_UNDERLINE_PROPS,
  }
);

const RE_PASSWORD_SCHEME = createOneScheme(
  "confirm password",
  "",
  Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .min(6, "Passwords must be at least 6 characters long")
    .required("Password confirm is required"),
  COMPONENT_TYPES[0],
  {
    ...PASSWORD_PROPS,
    ...HIDE_UNDERLINE_PROPS,
    placeholder: "Confirm Password",
  }
);

const PHONE_SCHEME = createOneScheme(
  "phone",
  "",
  Yup.string()
    .min(10, "Phone numbers must be at least 10 characters long")
    .trim()
    .required("Phone is required"),
  COMPONENT_TYPES[0],
  {
    ...PHONE_PROPS,
    ...HIDE_UNDERLINE_PROPS,
  }
);

const POSTAL_CODE_SCHEME = createOneScheme(
  "postal code",
  "",
  Yup.string()
    .min(5, "Postal code must be exactly 5 characters long")
    .max(5, "Postal code must be exactly 5 characters long")
    .matches(/^[0-9]+$/, "Postal code must be made only from digits")
    .required("Postal code is required"),
  COMPONENT_TYPES[0],
  {
    ...POSTAL_CODE_PROPS,
    ...HIDE_UNDERLINE_PROPS,
  }
);

const PHONE_CODE_SCHEME = createOneScheme(
  "code",
  "",
  Yup.string()
    .min(6, "Code must be exactly least 6 characters long")
    .required("Code is required"),
  COMPONENT_TYPES[0],
  {
    ...PHONE_CODE_PROPS,
    ...HIDE_UNDERLINE_PROPS,
  }
);

const DATE_SCHEME = createOneScheme(
  "date",
  "",
  Yup.number().required("Date is required"),
  COMPONENT_TYPES[1],
  {
    placeholder: "Date",
  }
);

const TIME_SCHEME = createOneScheme(
  "time",
  "",
  Yup.string().required("Time is required"),
  COMPONENT_TYPES[2]
);

const IMAGE_SCHEME = createOneScheme(
  "image",
  "",
  Yup.object().shape({
    uri: Yup.string().required(),
    height: Yup.number().required(),
    width: Yup.number().required(),
    type: Yup.string().required(),
  }),
  COMPONENT_TYPES[3]
);

// MORE FOR AN EXAMPLE THAN ANYTHING.
const BUTTON_GROUP_SCHEME = createOneScheme(
  "button group",
  "",
  Yup.string().required("Choice is required"),
  COMPONENT_TYPES[4],
  { options: ["0", "1"] }
);

const AM_PM_SCHEME = createOneScheme(
  "AMPM",
  "AM",
  Yup.string().required("AM or PM is required"),
  COMPONENT_TYPES[5]
);

// MORE FOR AN EXAMPLE THAN ANYTHING.
// todo: make an example. hasn't been used yet.
const SINGLE_SELECT_SCHEME = createOneScheme(
  "singleSelect",
  "",
  Yup.object()
    .shape({
      id: Yup.string().required(),
      title: Yup.string(),
    })
    .required("Choice is required"),
  COMPONENT_TYPES[6],
  {
    data: [
      { id: "0", title: "0" },
      { id: "1", title: "1" },
    ],
  }
);

const FIRST_NAME_SCHEME = createOneScheme(
  "first name",
  "",
  Yup.string()
    .required("First name is required")
    .matches(
      /^[a-z ,.'-]+$/i,
      "Your first name must not contain any special characters"
    ),
  COMPONENT_TYPES[0],
  {
    ...HIDE_UNDERLINE_PROPS,
    ...SERIOUS_PROPS,
  }
);

const FULL_NAME_SCHEME = createOneScheme(
  "full name",
  "",
  Yup.string()
    .required("Name is required")
    .matches(
      /^[a-z ,.'-]+$/i,
      "Your name must not contain any special characters"
    ),
  COMPONENT_TYPES[0],
  {
    ...HIDE_UNDERLINE_PROPS,
    ...SERIOUS_PROPS,
  }
);

const LAST_NAME_SCHEME = createOneScheme(
  "last name",
  "",
  Yup.string()
    .required("Last name is required")
    .matches(
      /^[a-z ,.'-]+$/i,
      "Your last name must not contain any special characters"
    ),
  COMPONENT_TYPES[0],
  {
    ...HIDE_UNDERLINE_PROPS,
    ...SERIOUS_PROPS,
  }
);

// @ts-ignore
export const VALIDATION = {
  COMPONENT_TYPES,

  // SPECIFIC SCHEMES: INSTANCE OF A SCHEME (think one component)
  PASSWORD_SCHEME,
  EMAIL_SCHEME,
  RE_PASSWORD_SCHEME,
  PHONE_SCHEME,
  POSTAL_CODE_SCHEME,
  PHONE_CODE_SCHEME,
  DATE_SCHEME,
  TIME_SCHEME,
  IMAGE_SCHEME,
  BUTTON_GROUP_SCHEME,
  AM_PM_SCHEME,
  FIRST_NAME_SCHEME,
  FULL_NAME_SCHEME,
  LAST_NAME_SCHEME,
  SINGLE_SELECT_SCHEME,

  // todo: INFO: SPECIFIC INSTANCE OF A SCHEMA. (think entire screen.)
  // COMMON validation schemas
  SIGNUP_SCHEMA: [EMAIL_SCHEME, PASSWORD_SCHEME, RE_PASSWORD_SCHEME],
  LOGIN_SCHEMA: [EMAIL_SCHEME, PASSWORD_SCHEME],
  MAGIC_LINK_EMAIL_SCHEMA: [EMAIL_SCHEME],
  FORGOT_PASSWORD_SCHEMA: [EMAIL_SCHEME],
  DELETE_ACCOUNT_SCHEMA: [PASSWORD_SCHEME],
  EDIT_EMAIL_SCHEMA: [PASSWORD_SCHEME, EMAIL_SCHEME],
  PHONE_SCHEMA: [PHONE_SCHEME],
  PHONE_CODE_SCHEMA: [PHONE_CODE_SCHEME],
  POSTAL_CODE_SCHEMA: [POSTAL_CODE_SCHEME],
  DATE_SCHEMA: [DATE_SCHEME],
  TIME_SCHEMA: [TIME_SCHEME],
  IMAGE_SCHEMA: [IMAGE_SCHEME],
  BUTTON_GROUP_SCHEMA: [BUTTON_GROUP_SCHEME],
  AM_PM_SCHEMA: [AM_PM_SCHEME],
  FIRST_NAME_SCHEMA: [FIRST_NAME_SCHEME],
  FULL_NAME_SCHEMA: [FULL_NAME_SCHEME],
  LAST_NAME_SCHEMA: [LAST_NAME_SCHEME],
  SINGLE_SELECT_SCHEMA: [SINGLE_SELECT_SCHEME],

  // todo: More general creations of a schema.

  createOneScheme,

  // todo: change to switch.
  ValidationSchema: (
    params = { premadeType: "Sign Up", baseSchema: VALIDATION.SIGNUP_SCHEMA }
  ) => {
    if (params.premadeType) {
      if (params.premadeType === "Sign Up") {
        return VALIDATION.SIGNUP_SCHEMA;
      } else if (params.premadeType === "Log In") {
        return VALIDATION.LOGIN_SCHEMA;
      } else if (params.premadeType === "Magic Link Email") {
        return VALIDATION.MAGIC_LINK_EMAIL_SCHEMA;
      } else if (params.premadeType === "Forgot Password") {
        return VALIDATION.FORGOT_PASSWORD_SCHEMA;
      } else if (params.premadeType === "Delete Account") {
        return VALIDATION.DELETE_ACCOUNT_SCHEMA;
      } else if (params.premadeType === "Phone") {
        return VALIDATION.PHONE_SCHEMA;
      } else if (params.premadeType === "Phone Code") {
        return VALIDATION.PHONE_CODE_SCHEMA;
      } else if (params.premadeType === "Postal Code") {
        return VALIDATION.POSTAL_CODE_SCHEMA;
      } else if (params.premadeType === "Edit Email") {
        return VALIDATION.EDIT_EMAIL_SCHEMA;
      }
    }
    if (params.baseSchema) {
      // lets them use whatever schema they can create.
      return params.baseSchema;
    }
    // return VALIDATION.getSignUpSchema();
  },
};
