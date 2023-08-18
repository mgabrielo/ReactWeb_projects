import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// =http://localhost:1337
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:1337" }),
    reducerPath: "main",
    tagTypes: [],
    endpoints: (build) => ({
        postAiText: build.mutation({
            query: (payload) => ({
                url: "openai/text",
                method: "POST",
                body: payload
            })
        })
    })
})

export const { usePostAiMutation } = api