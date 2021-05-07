import { Box, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("18:00");
    const workingHours = useSelector(state => state.workingHours);

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
    }, [startTime, endTime])

    return (
        <Box>
            <Box className={styles.workingInputHoursBox}>
                <TextField
                    id="startTime"
                    label="출근"
                    type="time"
                    defaultValue="09:00"
                    inputProps={{
                        step: 60,
                    }}
                    onChange={handleStartTime}
                />
                <TextField
                    id="endTime"
                    label="퇴근"
                    type="time"
                    defaultValue="18:00"
                    inputProps={{
                        step: 60
                    }}
                    onChange={handleEndTime}
                />
            </Box>
            <LineProgress className={styles.progress} timeline={workingHours.timeline}></LineProgress>
        </Box>
    )
}