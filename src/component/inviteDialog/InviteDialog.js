import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    linkText: {
        width: '100%'
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '150px'
    }
}));

export default function InviteDialog(props) {
    const styles = useStyles();
    const inviteLink = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1);
    const [title, setTitle] = useState('멤버 초대');
    const [link, setLink] = useState(inviteLink);
    const [userName, setUserName] = useState('');
    const { onClose, open } = props;

    function handleChangeInviteUserName(e) {
        setUserName(e.target.value)
    }

    function handleFocus(e) {
        e.target.select();
    }

    return (
        <Dialog onClose={onClose} fullWidth={true} maxWidth={"sm"} aria-labelledby="dialog-title" open={open}>
            <DialogTitle id="dialog-title" className={styles.dialogTitle}>
                <Typography>{title}</Typography>
                <IconButton onClick={onClose} className={styles.closeButton}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <TextField
                    label="초대할 사용자 이름"
                    onChange={handleChangeInviteUserName}
                    value={userName}
                    required
                />
                <TextField
                    label="초대 링크"
                    className={styles.linkText}
                    aria-readonly={true}
                    value={link + userName}
                    variant="outlined"
                    onFocus={handleFocus}
                ></TextField>
            </DialogContent>
        </Dialog>
    );
}

InviteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}