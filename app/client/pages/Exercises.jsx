import { useState, useEffect } from 'react';
import { AuthData } from '../services/AuthWrapper';
import { getChild } from '../services/childrenService';
import RecordPlayAudio from '../components/AudioExercise/RecordPlayAudio';

const Exercises = () => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];
  const [child, setChild] = useState({ hasChild });

  useEffect(() => {
    getChild(hasChild).then((child) => {
      setChild(child);
    });
  }, []);
  console.log('Fetching now from the child collection', child);

  // Todo: when audio created and saved, show button next
  // Todo: multiple images
  // Todo: set of exercises? Waiting for specifications

  return <RecordPlayAudio child={child} />;
};

export default Exercises;
