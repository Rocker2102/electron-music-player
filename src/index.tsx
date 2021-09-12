import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import NowPlaying from './NowPlaying/index';

import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
        <NowPlaying />
    </React.StrictMode>,
    document.getElementById('root')
);
