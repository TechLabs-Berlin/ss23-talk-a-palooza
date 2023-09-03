import { AuthWrapper } from './components/auth/AuthWrapper';

const App = () => {
  return (
    <>
      <AuthWrapper />
    </>
  );

  // <Routes>
  //   <Route index elements={<StartScreen />} />
  //   <Route path='startscreen' element={<StartScreen />} />
  //   <Route path='login' element={<Login />} />
  //   <Route
  //     path='main'
  //     element={
  //       <ProtectedRoute user={user}>
  //         <Main />
  //       </ProtectedRoute>
  //     }
  //   />
  // </Routes>

  // if (user) {
  //   return (
  //     <Routes>
  //       <Route
  //         path='/'
  //         element={
  //           user.children[0] ? <Navigate to='/main' /> : <InitialAssessment />
  //         }
  //       />
  //       <Route
  //         path='/login'
  //         element={user.children[0] ? <Main /> : <InitialAssessment />}
  //       />
  //       <Route
  //         path='/main'
  //         element={user.children[0] ? <Main /> : <InitialAssessment />}
  //       />
  //       <Route
  //         path='/dashboard'
  //         element={user.children[0] ? <Dashboard /> : <InitialAssessment />}
  //       />
  //     </Routes>
  //   );
  // } else {
  //   return (
  //     <Routes>
  //       <Route path='/' element={<StartScreen />} />
  //       <Route path='/login' element={<Login />} />
  //       <Route path='/main' element={<Main />} />
  //       <Route path='/dashboard' element={<Dashboard />} />
  //     </Routes>
  //   );
  // }
};

export default App;
