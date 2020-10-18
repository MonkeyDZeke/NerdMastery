import React, { useReducer } from 'react';
import './App.css';
import Nerd from './components/Nerd';
import nerdReducer, { init, initialNerds } from './components/Nerd/reducer'

function App() {
  const [nerds, dispatch] = useReducer(nerdReducer, initialNerds, init)
  return (
    <div className="App">
      <div className="roster">{nerds.map(nerd => <Nerd {...nerd} key={nerd.id} />)}</div>
      <div className="panel">Do the stuff</div>
    </div>
  );
}

export default App;
