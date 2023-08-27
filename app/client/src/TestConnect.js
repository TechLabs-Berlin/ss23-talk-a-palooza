import { useState, useEffect } from 'react';

import sampleService from './services/samplesServices';

const Sample = ({ sample, toggleImportance }) => {
  const label = sample.important ? 'make not important' : 'make important';
  return (
    <li>
      {sample.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

const TestConnect = () => {
  const [samples, setSamples] = useState([]);
  const [newSample, setNewSample] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    sampleService.getAll().then((initialSamples) => {
      setSamples(initialSamples);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    const sample = samples.find((sample) => sample.id === id);
    const changedSample = { ...sample, important: !sample.important };

    sampleService.update(id, changedSample).then((returnedSample) => {
      setSamples(
        samples.map((sample) => (sample.id !== id ? sample : returnedSample))
      );
    });
  };

  const addSample = (event) => {
    event.preventDefault();
    const sampleObject = {
      content: newSample,
      important: Math.random() < 0.5,
    };
    sampleService.create(sampleObject).then((returnedSample) => {
      setSamples(samples.concat(returnedSample));
    });
  };

  const handleSampleChange = (event) => {
    console.log(event.target.value);
    setNewSample(event.target.value);
  };

  const samplesToShow = showAll
    ? samples
    : samples.filter((sample) => sample.important);

  return (
    <>
      <h2>Test Connection DB</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {samplesToShow.map((sample) => (
          <Sample
            key={sample.id}
            sample={sample}
            toggleImportance={() => toggleImportanceOf(sample.id)}
          />
        ))}
      </ul>
      <form onSubmit={addSample}>
        <input value={newSample} onChange={handleSampleChange} />
        <button type='submit'>save</button>
      </form>
    </>
  );
};

export default TestConnect;
