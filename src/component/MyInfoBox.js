import { Avatar, Button, Card, CardContent, CardHeader, Chip, Grid, makeStyles } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketManager from '../socket/socketManager';
import { changeStatus, setMyInfo } from '../store/myInfo/myInfo.reducer'
import utils from '../utils/utils';

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

export default function MyInfoBox({ teamId, userName }) {
    const styles = useStyles();
    const [label, setLabel] = useState('');
    const [selectColor, setSelectColor] = useState('primary');
    const myInfo = useSelector(state => state.myInfo);
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

    function updateMyStatus (status) {
        dispatch(changeStatus({status: status}));
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
            default :
                setLabel('업무중')
                setSelectColor('primary')
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
                <Grid item xs="auto">
                    <Button
                        variant={myInfo.status === 'working' ? "contained" : "text"}
                        color={selectColor}
                        onClick={() => {updateMyStatus('working')}}
                    >업무</Button>
                </Grid>
                <Grid item xs="auto">
                    <Button 
                        variant={myInfo.status === 'meeting' ? "contained" : "text"}
                        color={selectColor}
                        onClick={() => {updateMyStatus('meeting')}}
                    >회의</Button>
                </Grid>
                <Grid item xs="auto">
                    <Button 
                        variant={myInfo.status === 'rest' ? "contained" : "text"}
                        color={selectColor}
                        onClick={() => {updateMyStatus('rest')}}
                    >휴식</Button>
                </Grid>
                <Grid item xs="auto">
                    <Button 
                        variant={myInfo.status === 'meal' ? "contained" : "text"}
                        color={selectColor}
                        onClick={() => {updateMyStatus('meal')}}
                    >식사</Button>
                </Grid>
                <Grid item xs="auto">
                    <Button 
                        variant={myInfo.status === 'offwork' ? "contained" : "text"}
                        color={selectColor}
                        onClick={() => {updateMyStatus('offwork')}}
                    >퇴근</Button>
                </Grid>
            </CardContent>

        </Card>
    )
}