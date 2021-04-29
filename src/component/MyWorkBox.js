import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import LineProgress from './dataDisplay/LineProgress'

const useStyles = makeStyles({
    progress: {
        height: "1.5rem",
        backgroundColor: "#fff",
        borderRadius: '0.3rem'
    }
});

export default function MyWorkBox() {
    const styles = useStyles();
    const workingHours = useSelector(state => state.workingHours);

    return (
        <Box>
            <LineProgress className={styles.progress} timeline={workingHours.timeline}></LineProgress>
        </Box>
    )
}