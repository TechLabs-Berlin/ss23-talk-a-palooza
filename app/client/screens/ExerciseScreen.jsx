import { AuthData } from '../services/AuthWrapper';
import { getChild } from '../services/childrenService';

import { useState, useEffect } from 'react';

import Exercise from '../components/Exercise/Exercise';

const ExerciseScreen = () => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];
  const [child, setChild] = useState({ hasChild });

  useEffect(() => {
    getChild(hasChild).then((child) => {
      setChild(child);
    });
  }, []);

  return <Exercise child={child} />;
};

export default ExerciseScreen;
