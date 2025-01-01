/// <reference types="vite/client" />

//user-info types

interface UserInfoInterface {
    userId: boolean;
    username: string,
    email: string,
    savedCodes: Array<string>,
}

interface loginCredentials {
  userId: string;
  password: string;
}

interface signupCredentails {
  username: string;
  email: string;
  password: string;
}