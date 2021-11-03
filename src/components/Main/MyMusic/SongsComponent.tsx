import React from 'react';

import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { formatString, formatTime } from '../../../utils/Utils';
import type { Song } from '../../../types/LibraryType';


const RowItem: React.FC = ({ children }) => {
    return (
        <Typography variant="subtitle1" noWrap={true}>{children}</Typography>
    );
};

const GridRow: React.FC<Song> = (props) => {
    return (
        <React.Fragment>
            <Grid item xs={6} sm={5} md={4} lg={3}>
                <RowItem>{props.name}</RowItem>
            </Grid>

            <Grid item xs={4} sm={3}>
                <RowItem>{formatString(props.artist)}</RowItem>
            </Grid>

            <Grid item sm={2} display={{ xs: 'none', sm: 'inline-block' }}>
                <RowItem>{props.album ?? '-'}</RowItem>
            </Grid>

            <Grid item md={1} display={{ xs: 'none', md: 'inline-block' }}>
                <RowItem>{props.year ?? '-'}</RowItem>
            </Grid>

            <Grid item lg={2} display={{ xs: 'none', lg: 'inline-block' }}>
                <RowItem>{props.genre ?? '-'}</RowItem>
            </Grid>

            <Grid item xs={2} lg={1}>
                <RowItem>{formatTime(props.length)}</RowItem>
            </Grid>
        </React.Fragment>
    );
};

interface SongsProps {
    prop?: null
}

interface SongsState {
    state?: null
}

export default class Songs extends React.Component<SongsProps, SongsState> {
    private tmpMusic: Song[] = [
        {
            src: 'http://localhost:3000/audio.mp3',
            name: 'Caller Tune',
            artist: 'Unknown',
            length: 29
        },
        {
            src: 'http://localhost:3000/audio__.mp3',
            name: 'Yeh Dooriyan',
            year: 2020,
            genre: 'Romantic',
            album: 'Love Aaj Kal',
            artist: 'Mohit Chauhan',
            length: 241
        },
        {
            src: 'http://localhost:3000/audio_.mp3',
            name: 'Qaafiraana',
            year: 2019,
            album: 'Kedarnath',
            artist: [ 'Arijit Singh', 'Nikita Gandhi' ],
            length: 341
        },
        {
            src: 'http://localhost:3000/audio__.mp3',
            name: 'Yeh Dooriyan',
            year: 2020,
            genre: 'Romantic',
            album: 'Love Aaj Kal',
            artist: 'Mohit Chauhan',
            length: 241
        },
        {
            src: 'http://localhost:3000/audio_.mp3',
            name: 'Qaafiraana',
            year: 2019,
            album: 'Kedarnath',
            artist: [ 'Arijit Singh', 'Nikita Gandhi' ],
            length: 341
        }
    ];

    render (): React.ReactNode {
        return (
            <Fade in={true} timeout={300}>
                <Grid container columnSpacing={{ xs: 0.5, md: 1.5, lg: 3 }} rowSpacing={1}>
                    {this.tmpMusic.map(song => {
                        return (
                            <Grid container item spacing={0} key={song.src}>
                                <GridRow {...song}></GridRow>
                            </Grid>
                        );
                    })}
                </Grid>
           </Fade>
        );
    }
}
