import React from 'react'
import { useSearchUsersQuery } from '../features/githubSlice'
import styled from 'styled-components'
import UserWrapper from './UserListing'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  column-gap: 1%;
  row-gap: 1rem;
  height: 100%;
  margin-top: 80px;
`

const SearchResultContainer = (props) => {
  const { userInput } = props
  const { data, isLoading, error } = useSearchUsersQuery(userInput)

  return (
    <>
      <ResultsContainer className="mx-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error :{`(`}</p>
        ) : (
          data.items.map((user) => <UserWrapper key={user.id} user={user} />)
        )}
      </ResultsContainer>
    </>
  )
}

export default SearchResultContainer
