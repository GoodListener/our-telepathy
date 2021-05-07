import { makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import statusList from '../../dto/statusList'

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
        },
        "&:hover": {
            boxShadow: `0 0 2px 2px ${props.line.color}88`
        }

    })
});

const useStylesTooltip = makeStyles({
    tooltip: (props) => ({
        backgroundColor: props.line.color
    })
})

export default function Line(props) {
    const styles = useStyles(props);
    const classes = useStylesTooltip(props);
    const label = statusList.getStatus(props.line.status).label;
    const startDate = new Date(props.line.startDate);
    const startTime = startDate.getHours() + ":" + startDate.getMinutes();
    const lastDate = new Date(props.line.lastDate);
    const lastTime = lastDate.getHours() + ":" + lastDate.getMinutes();
    return <Tooltip title={label + ' (' + startTime + ' ~ ' + lastTime + ')'} classes={classes}><span className={styles.root}></span></Tooltip>
}