import React, { ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import SongInfo from './SongInfo';
import VolumeOptions from './VolumeOptions';
import PlaybackOptions from './PlaybackOptions';


const defaultMusicArt = 'static/images/kali-square.jpg';

export default class NowPlaying extends React.PureComponent
    <unknown, { albumArt: null | string, height: null | number }> {

    private minHeight = 108;
    protected baseContainerId = 'now-playing';

    constructor(props: unknown) {
        super(props);

        this.state = {
            albumArt: null,
            height: null
        };
    }

    componentDidMount(): void {
        const e = document.getElementById(this.baseContainerId);

        console.log(e?.clientHeight);
        this.setState({
            height: e?.clientHeight ?? null
        });

        setTimeout(() => {
            this.setState({
                albumArt: defaultMusicArt,
                height: e?.clientHeight ?? null
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
                className="gradient-bg" sx={{ minHeight: `${this.minHeight}px` }}
            >
                <SongInfo albumArt={this.state.albumArt} height={this.state.height} />

                <PlaybackOptions />

                <VolumeOptions />
            </Grid>
        </Container>;
    }
}
