import React, { ReactNode } from 'react';

import MiniDrawer from '../Drawer/MiniDrawerComponent';

import MyMusic from './MyMusic/MyMusicComponent';
import NowPlaying from './NowPlayingComponent';
import RecentMusic from './RecentMusicComponent';
import AllPlaylists from './AllPlaylistsComponent';
import type { MainProps, MainState } from '../../types/MainType';


interface RenderComponentProps {
    component: MainState['renderComponent']
}

const RenderComponent: React.FC<RenderComponentProps> = ({ component }) => {
    switch (component) {
        case 'main': return <MyMusic />;
        case 'recent': return <RecentMusic />;
        case 'playlists': return <AllPlaylists />;
        case 'nowPlaying': return <NowPlaying />;
        default: return <MyMusic />;
    }
};

export default class Main extends React.PureComponent
    <MainProps, MainState> {

    state: MainState = {
        appName: '-',
        appVersion: '0.0.0',
        renderComponent: 'main'
    };

    switchComponent = (component: MainState['renderComponent']): void => {
        if (component === this.state.renderComponent) { return }

        this.setState({
            renderComponent: component
        });
    }

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
                switchComponent={this.switchComponent}
                currentComponent={this.state.renderComponent}
            >
                <RenderComponent component={this.state.renderComponent} />
            </MiniDrawer>
        </div>;
    }
}
