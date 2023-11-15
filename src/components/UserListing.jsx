import styled from 'styled-components';

const UserCell = styled.a`
  display: flex;
  text-decoration: none;
  flex-direction: row;
  align-items: center;
  margin: 10px auto 10px auto;
  width: 50vw;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  &:hover {
    background-color: #51adf6ab;
  }
  h2 {
    margin-left: 1rem;
    color: #000;
  }
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const UserWrapper = ({ user }) => {
  return (
    <UserCell className="mx-auto" href={user.html_url}>
      <UserAvatar src={user.avatar_url} />
      <h2 className="mx-4">{user.login}</h2>
    </UserCell>
  );
};

export default UserWrapper;
