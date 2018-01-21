import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Accelerate sync
window.ServerDate.amortizationRate = 100

ReactDOM.render(<App />, document.getElementById('root'));
