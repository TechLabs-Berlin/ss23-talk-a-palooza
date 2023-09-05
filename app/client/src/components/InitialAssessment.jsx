const InitialAssessment = ({ authUser }) => {
  console.log({ authUser });

  return (
    <>
      <h2>InitialAssessment</h2>
      <p>
        Hi {authUser.displayName}! (
        {authUser.children[0] ? 'Child registered' : 'No child assessed yet'})
      </p>
    </>
  );
};

export default InitialAssessment;
