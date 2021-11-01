import React, { ReactNode } from 'react';

import MiniDrawer from '../Drawer/index';

import logo from '../logo.svg';
import './Main.css';
import { MainProps, MainState } from '../types/MainType';


function MusicMain(): JSX.Element {
    return <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
                <br />
                {/* { this.state.appName }, { this.state.appVersion } */}
            </p>
        </header>
    </div>;
}

export default class Main extends React.PureComponent
    <MainProps, MainState> {

    state: MainState = {
        appName: '-',
        appVersion: '0.0.0'
    };

    componentDidMount = (): void => {
        if (typeof window.electronBridge?.api === 'undefined') { return }

        window.electronBridge.api.send('MAIN', {});
        window.electronBridge.api.receive('MAIN', (event, args) => {
            const { appName, appVersion } = args;
            this.setState({ appName, appVersion });
        });
    }

    render (): ReactNode {
        return <div>
            <MiniDrawer
                themeMode={this.props.themeMode}
                toggleTheme={this.props.toggleTheme}
            >
                <MusicMain />
            </MiniDrawer>
        </div>;
    }
}
