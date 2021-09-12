import React, { ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import SongInfo from './SongInfo';
import PlaybackOptions from './PlaybackOptions';
import VolumeOptions from './VolumeOptions';


export default class NowPlaying extends React.Component
    <unknown, { albumArt: null | string, height: null | number }> {

    private height = 108;
    protected rootElementId = 'now-playing';

    constructor(props: unknown) {
        super(props);

        this.state = {
            albumArt: null,
            height: null
        };
    }

    componentDidMount(): void {
        const e = document.getElementById(this.rootElementId);

        setTimeout(() => {
            this.setState({
                albumArt: 'static/images/music-default.png',
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
                albumArt: 'static/images/music-default.png'
            });
        }, 6000);
    }

    render(): ReactNode {
        return <Container className="NowPlaying" id={this.rootElementId}
            sx={{ boxShadow: 3, position: 'fixed', bottom: 0, minWidth: '100%', zIndex: 50 }}
            disableGutters={true} fixed={true} maxWidth={false} >

            <Grid container
                justifyContent={'space-between'} alignItems={'center'}
                className="gradient-bg" sx={{ minHeight: `${this.height}px`,
                height: this.state.height ? `${this.state.height}px` : 'auto' }} >

                <SongInfo albumArt={this.state.albumArt} height={this.state.height} />

                <PlaybackOptions />

                <VolumeOptions />

            </Grid>
        </Container>;
    }
}
