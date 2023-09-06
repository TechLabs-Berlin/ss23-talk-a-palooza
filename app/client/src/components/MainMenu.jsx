import { Link } from 'react-router-dom';

const Main = ({ authUser }) => {
  console.log({ authUser });
  const logout = () => {
    window.open('http://localhost:3001/api/auth/logout', '_self');
  };
  return (
    <div>
      <h2>Main</h2>
      <h3>Hello {authUser.firstName}</h3>
      {/* <p>({!getUser ? 'Child registered' : 'No child assessed yet'})</p> */}
      <ul>
        <li>My own path</li>
        <li>Catalog</li>
        <Link to='/dashboard'>Dashboard</Link>
      </ul>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Main;