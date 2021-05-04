import { Avatar, Button, Card, CardContent, CardHeader, Chip, Grid, makeStyles } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketManager from '../socket/socketManager';
import { changeStatus, setMyInfo } from '../store/myInfo/myInfo.reducer'
import { addTimeline, changeTimeline, clear } from '../store/workingHours/workingHours.reducer';
import utils from '../utils/utils';
import statusList from '../dto/statusList';

const useStyles = makeStyles((theme) => ({
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    cardHeader: {
        alignItems: "center"
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between"
    },
    cardStatusChip: {
        alignSelf: "center"
    },
    workingStatusButton: {
        color: '#5843BE'
    },
    restStatusButton: {
        color: '#FFA067'
    },
    offStatusButton: {
        color: '#282828'
    }
}));

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default function MyInfoBox({ teamId, userName }) {
    const styles = useStyles();
    const [label, setLabel] = useState('');
    const [selectColor, setSelectColor] = useState('primary');
    const myInfo = useSelector(state => state.myInfo);
    const workingHours = useSelector(state => state.workingHours);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMyInfo({
            id: myInfo.id ? myInfo.id : utils.getNewId(),
            name: userName,
            team: teamId,
            status: myInfo.status ? myInfo.status : 'working'
        }))

        socketManager.join(myInfo);
        updateMyStatus(myInfo.status);
    }, []);

    useEffect(() => {
        socketManager.changeStatus(myInfo);
    }, [myInfo])

    useEffect(() => {
        if (getFullDate(new Date(workingHours.workDate)) !== getFullDate(new Date)) {
            dispatch(clear());
        }
    }, [])

    useInterval(() => {
        dispatch(changeTimeline({
            index: workingHours.currentIndex,
            lastDate: new Date().toISOString()
        }))
    }, 1000)

    function setTimeline(status) {
        dispatch(addTimeline({
            status: status,
            timeline: {
                status: status,
                color: statusList.getStatus(status).lineColor,
                startDate: new Date().toISOString()
            }
        }))
    }

    function getFullDate(date) {
        return date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString();
    }

    function updateMyStatus(status) {
        dispatch(changeStatus({ status: status }));
        setTimeline(status);
        const statusInfo = statusList.getStatus(status);
        setLabel(statusInfo.label);
        setSelectColor(statusInfo.buttonColor);
    }

    return (
        <Card elevation={0}>
            <CardHeader
                className={styles.cardHeader}
                avatar={<Avatar className={styles.orange}>응</Avatar>}
                title={myInfo.name}
                action={<Chip className={styles.cardStatusChip} color={selectColor} label={label} />}
            >
            </CardHeader>
            <CardContent className={styles.cardContent}>
                {(statusList.list.map((item, index) => (
                        <Grid key={index} item xs="auto">
                            <Button
                                variant={myInfo.status === item.status ? "contained" : "text"}
                                color={selectColor}
                                onClick={() => { updateMyStatus(item.status) }}
                            >{item.label}</Button>
                        </Grid>
                    )
                ))}
            </CardContent>

        </Card>
    )
}