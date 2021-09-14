import React, { ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import SongInfo from './SongInfo';
import VolumeOptions from './VolumeOptions';
import PlaybackOptions from './PlaybackOptions';

import type { _NowPlaying } from '_App';


export default class NowPlaying extends React.PureComponent
    <_NowPlaying.props, _NowPlaying.state> {

    private maxHeight = 120;
    protected baseContainerId = 'now-playing';

    constructor(props: _NowPlaying.props) {
        super(props);

        this.state = {
            height: undefined
        };
    }

    componentDidMount(): void {
        const e = document.getElementById(this.baseContainerId);

        this.setState({
            height: e?.clientHeight
        });
    }

    render(): ReactNode {
        return <Container className="NowPlaying" id={this.baseContainerId}
            sx={{ boxShadow: 5, position: 'fixed', bottom: 0, minWidth: '100%', zIndex: 50 }}
            disableGutters={true} fixed={true} maxWidth={false}
        >
            <Grid container
                alignItems={'center'}
                className="gradient-bg" sx={{ maxHeight: `${this.maxHeight}px` }}
            >
                <SongInfo name={this.props.songInfo.name}
                    picture={this.props.songInfo.picture} height={this.state.height}
                    other="Other Info"
                />

                <PlaybackOptions length={this.props.playbackOptions.length}
                    current={this.props.playbackOptions.current}
                    shuffle={false} isPlaying={false}
                    repeatType="off"
                />

                <VolumeOptions isMute={this.props.volumeOptions.isMute} volume={5}
                    handleMuteUpdate={this.props.volumeOptions.handleMuteUpdate} />
            </Grid>
        </Container>;
    }
}
