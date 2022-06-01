import type { User } from "@firebase/auth";

export interface IFirebaseError extends Error {
  code: string;
  message: string;
  stack?: string;
}

export interface AuthFormValues {
  email: string;
  password: string;
}

export type UserVoidFunc = (user: User) => void;
