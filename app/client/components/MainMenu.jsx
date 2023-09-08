import { Link } from 'react-router-dom';

const Main = ({ child }) => {
  return (
    <div>
      <h2>Main</h2>
      <h3>Hello {child}</h3>
      <ul>
        <li>My own path</li>
        <li>Catalog</li>
        <Link to='/dashboard'>Dashboard</Link>
      </ul>
    </div>
  );
};

export default Main;
