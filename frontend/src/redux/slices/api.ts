import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { compilerSliceStateType } from "./CompilerSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
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
  }),
});

export const { useSaveCodeMutation } = api;
