import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CallEnd, Mic, MicOff } from '@material-ui/icons';
import AudioControl from '../audio/AudioControl';

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
    const [isConnect, setIsConnect] = useState(false);
    const { type, member, onClose, open, connect, stream } = props;

    useEffect(() => {
        if (type === 'offer' && !isConnect) {
            open && connect(member);
            setIsConnect(true);
        }

        if (!open) {
            setIsConnect(false);
        }
    });

    function handleMicOn() {
        setMicOn(!micOn);
    }

    function handleReceiveCall() {
        if (type === 'answer' && !isConnect) {
            connect(member);
            setIsConnect(true);
        }
    }

    function handleEndCall() {
        setTitle('통화 종료');
        setTimeout(() => {
            onClose();
        }, 3000);
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
                {
                    isConnect ?
                        (<IconButton onClick={handleEndCall} color="secondary">
                            <CallEnd />
                        </IconButton>)
                        :
                        (<IconButton onClick={handleReceiveCall} color="primary">
                            <CallEnd />
                        </IconButton>)
                }
            </DialogActions>
            <AudioControl stream={stream}></AudioControl>
        </Dialog>
    );
}

CallDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    member: PropTypes.any.isRequired
}