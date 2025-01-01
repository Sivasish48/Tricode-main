import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { compilerSliceStateType } from "./CompilerSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    saveCode: builder.mutation<
      { url: string; status: string },
      compilerSliceStateType["fullCode"]
    >({
      query: (fullCode) => ({
        url: "/compiler/save",
        method: "POST",
        body: fullCode,
      }),
    }),
    loadCode: builder.mutation<
      { fullCode: compilerSliceStateType["fullCode"] },
      { urlId: string }
    >({
      query: (body) => ({
        url: `/compiler/load`,
        method: "POST",
        body: { urlId: body.urlId },
      }),
    }),
    login: builder.mutation<UserInfoInterface, loginCredentials>({
      query: (body) => ({
        url: `/api/user/login`,
        method: "POST",
        body: body,
      }),
    }),
    signup: builder.mutation<
    UserInfoInterface, 
    signupCredentails>({
      query: (body) => ({
        url: `/api/user/signup`,
        method: "POST",
        body: body,
      }),
    }),
    userDetails: builder.query<UserInfoInterface, void>({
      query: () => ({
        url: `/api/user/user-details`,
        cache: "no-store",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/api/user/logout`,
        method: "POST",
      }),
    }),
  }),
});

// Corrected export statement
export const {
  useSaveCodeMutation,
  useLoadCodeMutation,
  useLoginMutation,
  useUserDetailsQuery,
  useLogoutMutation,
  useSignupMutation,
} = api;
export default api;
