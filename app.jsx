import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <>
      <h1>React Drum Machine</h1>
    </>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);