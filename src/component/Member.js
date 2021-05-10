import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import statusList from '../dto/statusList'
import CallDialog from './callDialog/CallDialog';
import socketManager from '../socket/socketManager';
import rtc from '../rtc/rtc';

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
    cardAction: {
        width: '100%'
    }
}));

export default function Member({member}) {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState('');
    const [stream, setStream] = useState(null);
    const [selectColor, setSelectColor] = useState('primary');

    useEffect(() => {
        changeStatus(member.status);
    });

    function offerToMember(member) {
        rtc.createOffer(member.id)
            .then(({ pc, sessionDescription }) => {
                pc.onicecandidate = (event) => { handleIceCandidate(member.id, event) };
                pc.onaddstream = (event) => { handleRemoteStreamAdded(member.id, event); };
                pc.onremovestream = handleRemoteStreamRemoved;
                socketManager.sendMessageToUser('offer', member.id, sessionDescription);
            });
    }

    function handleIceCandidate(id, event) {
        if (event.candidate) {
            socketManager.sendMessageToUser('candidate', id, event.candidate);
        }
    }

    function handleRemoteStreamAdded(id, event) {
        console.log(id, event);
        setStream(event.stream);
    }

    function handleRemoteStreamRemoved(event) {
        console.log(event);
    }

    function changeStatus (status) {
        const statusInfo = statusList.getStatus(status);
        setLabel(statusInfo.label);
        setSelectColor(statusInfo.buttonColor);
    }

    function handleClickCallDialogOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return <Grid item xs={6} md={3}>
        <Card elevation={4}>
            <CardHeader
                className={styles.cardHeader}
                action={<Chip className={styles.cardStatusChip} color={selectColor} label={label} />}
            >
            </CardHeader>
            <CardContent className={styles.cardContent}>
                <Avatar className={styles.orange}>O</Avatar>
                <Typography>{member.name}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.cardAction}
                    onClick={handleClickCallDialogOpen}
                >
                    Call
                </Button>
            </CardActions>
            <CallDialog type="offer" member={member} open={open} onClose={handleClose} connect={offerToMember} stream={stream}></CallDialog>
        </Card>
    </Grid>
}

Member.propTypes = {
    member: PropTypes.any.isRequired
}