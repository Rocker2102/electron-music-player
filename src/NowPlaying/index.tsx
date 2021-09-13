import React, { ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import SongInfo from './SongInfo';
import VolumeOptions from './VolumeOptions';
import PlaybackOptions from './PlaybackOptions';

import type { _NowPlaying } from '_App';


const defaultMusicArt = 'static/images/kali-square.jpg';

export default class NowPlaying extends React.PureComponent
    <unknown, { albumArt: null | string, height?: number }> {

    private maxHeight = 120;
    protected baseContainerId = 'now-playing';

    constructor(props: unknown) {
        super(props);

        this.state = {
            albumArt: null
        };
    }

    componentDidMount(): void {
        const e = document.getElementById(this.baseContainerId);

        this.setState({
            height: e?.clientHeight
        });

        setTimeout(() => {
            this.setState({
                albumArt: defaultMusicArt
            });
        }, 2000);
        setTimeout(() => {
            this.setState({
                albumArt: null
            });
        }, 4000);
        setTimeout(() => {
            this.setState({
                albumArt: defaultMusicArt
            });
        }, 6000);
    }

    render(): ReactNode {
        return <Container className="NowPlaying" id={this.baseContainerId}
            sx={{ boxShadow: 5, position: 'fixed', bottom: 0, minWidth: '100%', zIndex: 50 }}
            disableGutters={true} fixed={true} maxWidth={false}
        >
            <Grid container
                justifyContent={'space-between'} alignItems={'center'}
                className="gradient-bg" sx={{ maxHeight: `${this.maxHeight}px` }}
            >
                <SongInfo name="Song Name (maybe large, therefore truncated)"
                    picture={this.state.albumArt} height={this.state.height}
                    other="Other Info"
                />

                <PlaybackOptions length={283} current={42} shuffle={false} isPlaying={false}
                    repeatType="off"
                />

                <VolumeOptions isMute={false} volume={5} />
            </Grid>
        </Container>;
    }
}
