import React from 'react'
import InputField from '../components/SearchInput'
import SearchResultContainer from '../components/SearchResultsContainer'

const Home = (props) => {
  const [userInput, setUserInput] = React.useState('')

  return (
    <div className="mx-auto w-full my-auto px-10 flex flex-row justify-center py-20">
      <div className="mx-auto absolute">
        <InputField inputName={'User'} setSearchString={setUserInput} />
      </div>
      {userInput ? <SearchResultContainer userInput={userInput} /> : null}
    </div>
  )
}

export default Home
