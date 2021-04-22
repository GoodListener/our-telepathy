import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import React, { useEffect, useState } from 'react';

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

export default function MyInfoBox({ myInfo, setMyInfo }) {
    const styles = useStyles();
    const [label, setLabel] = useState('');
    const [selectColor, setSelectColor] = useState('primary');

    useEffect(() => {
        changeMyStatus(myInfo.status);
    }, []);

    function changeMyStatus (status) {
        setMyInfo({...myInfo, status: status});
        switch(status) {
            case 'working': 
                setLabel('업무중')
                setSelectColor('primary')
                break;
            case 'meeting': 
                setLabel('회의중')
                setSelectColor('primary')
                break;
            case 'meal': 
                setLabel('식사중')
                setSelectColor('secondary')
                break;
            case 'rest': 
                setLabel('휴식중')
                setSelectColor('secondary')
                break;
            case 'offwork': 
                setLabel('퇴근')
                setSelectColor('default')
                break;
        }
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
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <Button
                        variant={myInfo.status == 'working' ? "contained" : "none"}
                        color={selectColor}
                        onClick={() => {changeMyStatus('working')}}
                    >업무</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button 
                        variant={myInfo.status == 'meeting' ? "contained" : "none"}
                        color={selectColor}
                        onClick={() => {changeMyStatus('meeting')}}
                    >회의</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button 
                        variant={myInfo.status == 'rest' ? "contained" : "none"}
                        color={selectColor}
                        onClick={() => {changeMyStatus('rest')}}
                    >휴식</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button 
                        variant={myInfo.status == 'meal' ? "contained" : "none"}
                        color={selectColor}
                        onClick={() => {changeMyStatus('meal')}}
                    >식사</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button 
                        variant={myInfo.status == 'offwork' ? "contained" : "none"}
                        color={selectColor}
                        onClick={() => {changeMyStatus('offwork')}}
                    >퇴근</Button>
                </Grid>
                <Grid item xs={1}></Grid>
            </CardContent>

        </Card>
    )
}