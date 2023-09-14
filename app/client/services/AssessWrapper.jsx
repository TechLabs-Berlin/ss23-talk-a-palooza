import { createContext, useContext, useState, useEffect } from 'react';
import InitialAssessment from '../pages/InitialAssessment';

const AssessContext = createContext();

export const AssessData = () => useContext(AssessContext, {});
const baseUrl = 'http://localhost:3001/api/vocablogs';

export const AssessWrapper = () => {
  const [assessChild, setAssessChild] = useState({
    child: {},
    isAssessed: false,
  });

  useEffect(() => {
    getChild();
  }, []);

  return (
    <AssessContext.Provider value={assessChild}>
      <>
        <InitialAssessment />
      </>
    </AssessContext.Provider>
  );
};
