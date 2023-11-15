import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import moment from 'moment'

const authToken = import.meta.env.VITE_REACT_APP_GITHUB_AUTH_TOKEN

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
    userRepositories: builder.query({
      query: (username) => {
        return {
          url: `/users/${username}/repos`,
          method: 'GET',
          params: {
            sort: 'updated',
            order: 'desc',
          },
        }
      },
    }),
    repositoryCommits: builder.query({
      query: ({ userName, repoName }) => {
        return {
          url: `/repos/${userName}/${repoName}/commits`,
          method: 'GET',
          params: {
            order: 'desc',
            per_page: 100,
            until: moment().format('YYYY-MM-DD'),
          },
        }
      },
    }),
    repositoryContributors: builder.query({
      query: ({ userName, repoName }) => {
        return {
          url: `/repos/${userName}/${repoName}/contributors`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useSearchUsersQuery,
  useUserRepositoriesQuery,
  useRepositoryCommitsQuery,
  useRepositoryContributorsQuery,
} = githubApi

export default githubApi
