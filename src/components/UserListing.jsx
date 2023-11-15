import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserCell = styled.div`
  display: flex;
  text-decoration: none;
  flex-direction: row;
  align-items: center;
  min-width: 14%;
  border: 2px solid #d1d1d1;
  border-radius: 10px;
  padding: 10px;
  &:hover {
    border: 2px solid #51adf6ab;
  }
  h2 {
    margin-left: 1rem;
    color: #000;
  }
`

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const UserWrapper = ({ user }) => {
  return (
    <Link to={`/user/${user.login}`} style={{ textDecoration: 'none' }}>
      <UserCell>
        <UserAvatar src={user.avatar_url} />
        <h2 className="mx-4">{user.login}</h2>
      </UserCell>
    </Link>
  )
}

export default UserWrapper
