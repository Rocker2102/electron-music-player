import React from "react";
import logo from './logo.svg';
import './App.css';
import type { CustomElectron } from '../types/electron';

console.log(window.electronBridge);
console.log(window.electronBridge.api);

export default class App extends React.Component <{}, { appName: any, appVersion: any }> {
    constructor (props: any) {
        super(props);

        this.state = {
            appName: '-',
            appVersion: '-',
        };
    }

    componentDidMount() {
        setTimeout(() => window.electronBridge.api.send('MAIN', {}), 2000);
        window.electronBridge.api.receive('MAIN', (event, arg) => {
            console.log(arg, event);
            const { appName, appVersion } = arg;
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
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
        </div>
    }
}
