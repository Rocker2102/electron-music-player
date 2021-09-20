import React, { ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import SongInfo from './SongInfo';
import VolumeOptions from './VolumeOptions';
import PlaybackOptions from './PlaybackOptions';


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
                className="gradient-bg" sx={{ maxHeight: this.maxHeight }}
            >
                <SongInfo {...this.props.songInfo} height={this.state.height} />

                <PlaybackOptions
                    {...this.props.playbackOptions}
                    isLoading={this.props.isLoading}
                />

                <VolumeOptions {...this.props.volumeOptions} />
            </Grid>
        </Container>;
    }
}
