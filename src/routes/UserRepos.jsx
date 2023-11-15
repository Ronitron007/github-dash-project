import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUserRepositoriesQuery } from '../features/githubSlice'
import RepositoriesListing from '../components/RepositoriesListing'
import InputField from '../components/SearchInput'

const UserRepos = (props) => {
  const { username } = useParams()
  const [searchString, setSearchString] = React.useState('')
  const [filteredRepos, setFilteredRepos] = React.useState([])
  const { data, isLoading, error } = useUserRepositoriesQuery(username)
  useEffect(() => {
    filterRepos(searchString)
  }, [data, searchString])
  const filterRepos = (searchString) => {
    if (searchString === '') {
      setFilteredRepos(data)
    } else {
      setFilteredRepos(
        data.filter((repo) =>
          repo.name.toLowerCase().includes(searchString.toLowerCase()),
        ),
      )
    }
  }
  return (
    <>
      <div className="float-right mr-20 mt-8">
        <InputField
          inputName={'Repository'}
          setSearchString={setSearchString}
        />
      </div>
      {filteredRepos ? <RepositoriesListing repos={filteredRepos} /> : null}
    </>
  )
}

export default UserRepos
