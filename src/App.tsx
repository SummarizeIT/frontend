import React from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorModal from './components/ErrorModal';

function App() {
  return (
    <>
    <ErrorModal errorMessage='test' errorTitle='Testing'/>
    </>
  );
}

export default App;
