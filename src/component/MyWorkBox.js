import { Box, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTotalTime } from '../store/workingHours/workingHours.reducer';
import LineProgress from './dataDisplay/LineProgress'

const useStyles = makeStyles({
    progress: {
        height: "1.5rem",
        backgroundColor: "#fff",
        borderRadius: '0.3rem'
    },
    workingInputHoursBox: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '5px'
    }
});

export default function MyWorkBox() {
    const styles = useStyles();
    const workingHours = useSelector(state => state.workingHours);
    const [startTime, setStartTime] = useState(getFormattedTime(workingHours.startDate));
    const [endTime, setEndTime] = useState(getFormattedTime(workingHours.endDate));
    const dispatch = useDispatch();

    function handleStartTime(e) {
        setStartTime(e.target.value);
    }

    function handleEndTime(e) {
        setEndTime(e.target.value);
    }

    useEffect(() => {
        const startDate = new Date();
        const endDate = new Date();
        startDate.setHours(startTime.split(':')[0], startTime.split(':')[1]);
        endDate.setHours(endTime.split(':')[0], endTime.split(':')[1]);
        const totalTime = endDate - startDate;
        if (totalTime > 0) {
            dispatch(changeTotalTime({
                totalTime: totalTime,
                startDate: startDate,
                endDate: endDate
            }))
        }
    }, [startTime, endTime])

    return (
        <Box className={styles.workingInputHoursBox}>
            <TextField
                id="startTime"
                label="출근"
                type="time"
                defaultValue={startTime}
                inputProps={{
                    step: 60,
                }}
                onChange={handleStartTime}
            />
            <TextField
                id="endTime"
                label="퇴근"
                type="time"
                defaultValue={endTime}
                inputProps={{
                    step: 60
                }}
                onChange={handleEndTime}
            />
            <LineProgress className={styles.progress} timeline={workingHours.timeline}></LineProgress>
        </Box>
    )
}

function getFormattedTime(date) {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return (hours > 9 ? hours : '0' + hours) + ":" + (minutes > 9 ? minutes : '0' + minutes);
}