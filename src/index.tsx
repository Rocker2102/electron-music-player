import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import App from './App/index';
import NowPlaying from './NowPlaying/index';

import './index.css';


class BaseLayout extends React.Component
    <unknown, unknown> {

    constructor(props: unknown) {
        super(props);
    }

    render(): ReactNode {
        return <React.StrictMode>
            <App />
            <NowPlaying />
        </React.StrictMode>;
    }
}

ReactDOM.render(
    <BaseLayout />,
    document.getElementById('root')
);
