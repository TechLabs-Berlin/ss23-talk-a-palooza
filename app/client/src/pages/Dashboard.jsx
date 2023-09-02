import TestConnect from '../components/TestConnect';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <img
            src=''
            alt=''
            className='avatar'
            width='32px'
            height='32px'
            sx={{ width: 32, height: 32, br: '50%' }}
          />
        </li>
        <li>John doe</li>
        <li>log out</li>
      </ul>
      <TestConnect />
    </>
  );
};

export default Dashboard;
