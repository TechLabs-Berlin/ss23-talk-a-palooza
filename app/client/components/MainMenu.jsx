import { Link } from 'react-router-dom';

const Main = ({ authUser }) => {
  return (
    <div>
      <h2>Main</h2>
      <h3>Hello {authUser.firstName}</h3>
      <ul>
        <li>My own path</li>
        <li>Catalog</li>
        <Link to='/dashboard'>Dashboard</Link>
      </ul>
    </div>
  );
};

export default Main;
