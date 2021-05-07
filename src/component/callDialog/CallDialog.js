import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CallEnd, Mic, MicOff } from '@material-ui/icons';
import socketManager from '../../socket/socketManager';
import rtc from '../../rtc/rtc';

const useStyles = makeStyles((theme) => ({
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    micOnIcon: {
        color: '#A30014'
    },
    endCallIcon: {
        border: '1px solid gray',
    },
    dialogContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    memberName: {
        marginLeft: theme.spacing(1)
    }
}));

export default function CallDialog(props) {
    const styles = useStyles();
    const [title, setTitle] = useState('연결중');
    const [micOn, setMicOn] = useState(false);
    const { member, onClose, open } = props;

    useEffect(() => {
        open && offerToMember(member);
    })

    function offerToMember(member) {
        rtc.createOffer(member.id)
            .then(({ pc, sessionDescription }) => {
                pc.onicecandidate = (event) => { handleIceCandidate(member.id, event) };
                pc.onaddstream = (event) => { handleRemoteStreamAdded(member.id, event); };
                pc.onremovestream = handleRemoteStreamRemoved;
                socketManager.sendMessageToUser('offer', member.id, sessionDescription);
            });
    }

    function handleMicOn() {
        setMicOn(!micOn);
    }

    function handleEndCall() {
        setTitle('통화 종료');
        setTimeout(() => {
            onClose();
        }, 3000);
    }

    function handleIceCandidate(id, event) {
        if (event.candidate) {
            socketManager.sendMessageToUser('candidate', id, event.candidate);
        }
    }

    function handleRemoteStreamAdded(id, event) {
        console.log(id, event);
    }

    function handleRemoteStreamRemoved(event) {
        console.log(event);
    }

    return (
        <Dialog fullWidth={true} maxWidth={"xs"} aria-labelledby="dialog-title" open={open}>
            <DialogTitle id="dialog-title" className={styles.dialogTitle}>
                <Typography>{title}</Typography>
                <IconButton onClick={onClose} className={styles.closeButton}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <Avatar className={styles.orange}>응</Avatar>
                <Typography className={styles.memberName}>
                    {member.name}
                </Typography>
                <IconButton onClick={handleMicOn} className={styles.micOnIcon}>
                    {micOn ? <Mic /> : <MicOff />}
                </IconButton>
            </DialogContent>
            <DialogActions className={styles.dialogContent}>
                <IconButton onClick={handleEndCall} color="secondary">
                    <CallEnd />
                </IconButton>
            </DialogActions>
        </Dialog>
    );
}

CallDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    member: PropTypes.any.isRequired
}