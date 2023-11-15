import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authToken = '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'

const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
    prepareHeaders: (headers) => {
      if (authToken) headers.set('Authorization', `token ${authToken}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: (searchString) => {
        console.log(searchString)
        return {
          url: `/search/users`,
          method: 'GET',
          params: {
            q: searchString,
            sort: 'followers',
            type: 'user',
            order: 'desc',
          },
        }
      },
    }),
  }),
})

export const { useSearchUsersQuery } = githubApi

export default githubApi
