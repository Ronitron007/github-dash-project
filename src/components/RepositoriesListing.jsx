import React from 'react'
import styled from 'styled-components'
import UserWrapper from './UserListing'
import { useParams } from 'react-router-dom'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import SvgIcon from '@mui/material/SvgIcon'
import RepoModal from './RepoModal'

function GitForkIcon() {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M7,12 L14.5,12 C16.277025,12 17.7447372,10.6756742 17.970024,8.96013518 C16.2885152,8.7047201 15,7.25283448 15,5.5 C15,3.56700338 16.5670034,2 18.5,2 C20.4329966,2 22,3.56700338 22,5.5 C22,7.27155475 20.6838151,8.73569805 18.9759671,8.96790818 C18.7419236,11.2333126 16.8272778,13 14.5,13 L7,13 L7,15.0354444 C8.69614707,15.2780593 10,16.736764 10,18.5 C10,20.4329966 8.43299662,22 6.5,22 C4.56700338,22 3,20.4329966 3,18.5 C3,16.736764 4.30385293,15.2780593 6,15.0354444 L6,8.96455557 C4.30385293,8.72194074 3,7.26323595 3,5.5 C3,3.56700338 4.56700338,2 6.5,2 C8.43299662,2 10,3.56700338 10,5.5 C10,7.26323595 8.69614707,8.72194074 7,8.96455557 L7,12 Z M4,18.5 C4,19.8807119 5.11928813,21 6.5,21 C7.88071187,21 9,19.8807119 9,18.5 C9,17.1192881 7.88071187,16 6.5,16 C5.11928813,16 4,17.1192881 4,18.5 Z M4,5.5 C4,6.88071187 5.11928813,8 6.5,8 C7.88071187,8 9,6.88071187 9,5.5 C9,4.11928813 7.88071187,3 6.5,3 C5.11928813,3 4,4.11928813 4,5.5 Z M18.5,3 C17.1192881,3 16,4.11928813 16,5.5 C16,6.88071187 17.1192881,8 18.5,8 C19.8807119,8 21,6.88071187 21,5.5 C21,4.11928813 19.8807119,3 18.5,3 Z" />
      </svg>
    </SvgIcon>
  )
}

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
  padding: 20px;
`

const RepoCell = styled.div`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  min-width: 14%;
  max-width: 350px;
  height: 300px;
  border: 2px solid #d1d1d1;
  border-radius: 10px;
  padding: 20px 10px;
  &:hover {
    border: 2px solid #51adf6ab;
  }
  h2 {
    color: #000;
  }
  p {
    margin-left: 1rem;
    color: #000;
  }
`

const RepositoriesListingContainer = (props) => {
  const { repos } = props
  const [modalOpen, setModalOpen] = React.useState(false)
  const [currentRepoName, setCurrentRepoName] = React.useState('')
  const { username } = useParams()
  const handleModalToggle = (repoName = '') => {
    setModalOpen(!modalOpen)
    setCurrentRepoName(repoName)
  }
  return (
    <>
      <h2 className="mx-8 text-xl font-bold py-8">{username}'s Repositories</h2>
      <ResultsContainer className="mx-auto">
        {repos.map((repo) => (
          <RepoCell key={repo.id} onClick={() => handleModalToggle(repo.name)}>
            <div className="flex flex-col"></div>
            <h2 className="mx-4 text-xl font-bold ml-4 mb-4">{repo.name}</h2>
            <p className="text-clip overflow-hidden">{repo.description}</p>
            <div className="mt-auto flex flex-col">
              <div className="flex flex-row gap-x-4 ml-4 ">
                <div className="flex flex-row">
                  {' '}
                  <StarBorderIcon></StarBorderIcon>{' '}
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex flex-row">
                  {' '}
                  <GitForkIcon />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="flex flex-row">
                  {' '}
                  <span className="font-bold">Open Issues :</span>
                  <span>{repo.open_issues_count}</span>
                </div>
              </div>
              <div className="mx-4 self-baseline">
                <h2 className="text-md ml-0 font-light">Owner: </h2>
                <UserWrapper user={repo.owner} />
              </div>
            </div>
          </RepoCell>
        ))}
      </ResultsContainer>
      {modalOpen ? (
        <RepoModal
          isOpen={modalOpen}
          handleToggle={handleModalToggle}
          userName={username}
          repoName={currentRepoName}
        />
      ) : null}
    </>
  )
}

export default RepositoriesListingContainer
