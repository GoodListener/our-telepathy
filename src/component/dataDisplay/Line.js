import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    root: (props) => ({
        backgroundColor: props.line.color,
        width: `${props.line.width}%`,
        height: '100%',
        display: 'inline-block',
        "&:first-child": {
            borderRadius: '0.3rem 0 0 0.3rem'
        },
        "&:last-child": {
            minWidth: '3px',
            borderRadius: '0 0.3rem 0.3rem 0'
        }

    })
});

export default function Line(props) {
    const styles = useStyles(props);
    return <span className={styles.root}></span>
}