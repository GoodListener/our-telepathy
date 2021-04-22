import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import LineProgress from './dataDisplay/LineProgress'

const useStyles = makeStyles({
    progress: {
        height: "1.5rem",
        backgroundColor: "#fff",
        borderRadius: '0.3rem'
    }
});

export default function MyWorkBox({}) {
    const styles = useStyles();
    const [lines, setLines] = useState([{
        color: '#C6BDFB',
        width: 15,
        isFirst: true,
    }, {
        color: '#FFCBC0',
        width: 10
    }, {
        color: '#C6BDFB',
        width: 35,
        isLast: true
    }]);

    return (
        <Box>
            <LineProgress className={styles.progress} lines={lines}></LineProgress>
        </Box>
    )
}