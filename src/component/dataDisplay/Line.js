import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    root: (props) => ({
        backgroundColor: props.line.color,
        width: `${props.line.width}%`,
        height: '100%',
        display: 'inline-block',
        borderRadius: props.line.isFirst ? '0.3rem 0 0 0.3rem' : props.line.isLast ? '0 0.3rem 0.3rem 0' : '0',

    })
});

export default function Line(props) {
    const styles = useStyles(props);
    return <span className={styles.root}></span>
}