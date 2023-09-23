import { useState, useEffect } from 'react';
import { AuthData } from '../services/AuthWrapper';
import { getChild } from '../services/childrenService';
import RecordPlayAudio from '../components/AudioExercise/RecordPlayAudio';
import BackButton from '../components/navigation/BackButton';

const Exercises = () => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];
  const [child, setChild] = useState({ hasChild });

  useEffect(() => {
    getChild(hasChild).then((child) => {
      setChild(child);
    });
  }, []);

  // TODO: multiple images
  // TODO: set of exercises? Waiting for specifications
  // TODO: recommended words
  // TODO: spoken words where word = word
  const word = 'banana';

  return (
    <>
      <BackButton />
      <RecordPlayAudio child={child} word={word} />
    </>
  );
};

export default Exercises;
