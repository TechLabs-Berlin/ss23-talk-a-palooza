import { AuthData } from '../components/auth/AuthWrapper';
import TestConnect from '../components/TestConnect';

const Dashboard = () => {
  const { authUser } = AuthData();
  console.log(authUser);
  const logout = () => {
    window.open('http://localhost:3001/api/auth/logout', '_self');
  };

  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <img
            src={authUser.profilePhoto}
            alt=''
            className='avatar'
            width='32px'
            height='32px'
            sx={{ width: 32, height: 32, br: '50%' }}
          />
        </li>
        <li>Username: {authUser.displayName}</li>
        <button onClick={logout}>Logout</button>
      </ul>
      <TestConnect />
    </>
  );
};

export default Dashboard;
