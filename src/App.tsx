import React from "react";
import logo from './logo.svg';
import './App.css';

import type { CustomElectron } from '../types/electron';

export default class App extends React.Component <{}, { appName: any, appVersion: any }> {
    constructor (props: any) {
        super(props);

        this.state = { appName: '-', appVersion: 0 };
    }

    componentDidMount = () => {
        window.electronBridge.api.send('MAIN', {});

        window.electronBridge.api.receive('MAIN', (event, args) => {
            const { appName, appVersion } = args;
            this.setState({ appName, appVersion });
        });
    }

    render () {
        return <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                    <br />
                    { this.state.appName }, { this.state.appVersion }
                </p>
            </header>
        </div>
    }
}
