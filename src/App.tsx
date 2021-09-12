import React, { ReactNode } from 'react';

import Main from './Main/index';
import NowPlaying from './NowPlaying/index';

import './App.css';


export default class App extends React.Component
    <unknown, unknown> {

    constructor(props: unknown) {
        super(props);
    }

    render(): ReactNode {
        return <React.StrictMode>
            <Main />
            <NowPlaying />
        </React.StrictMode>;
    }
}
