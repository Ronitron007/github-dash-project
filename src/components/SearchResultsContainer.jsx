import React from 'react'
import { useSearchUsersQuery } from '../features/githubSlice'
import styled from 'styled-components'
import UserWrapper from './UserListing'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const SearchResultContainer = (props) => {
  const { userInput } = props
  const { data, isLoading, error } = useSearchUsersQuery(userInput)

  console.log(data, userInput)

  return (
    <>
      <ResultsContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error :(</p>
        ) : (
          data.items.map((user) => <UserWrapper key={user.id} user={user} />)
        )}
      </ResultsContainer>
    </>
  )
}

export default SearchResultContainer
