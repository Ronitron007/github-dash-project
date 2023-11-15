import React from 'react'
import InputField from '../components/SearchInput'
import SearchResultContainer from '../components/SearchResultsContainer'

const Home = (props) => {
  const [userInput, setUserInput] = React.useState('')

  return (
    <div>
      <InputField userInput={userInput} setUserInput={setUserInput} />
      <SearchResultContainer userInput={userInput} />
    </div>
  )
}

export default Home
