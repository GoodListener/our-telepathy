import { Card, CardContent, Grid, IconButton, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import InviteDialog from './inviteDialog/InviteDialog'

const useStyles = makeStyles({
    emptyContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '140px'
    },
    plusIcon: {
        width: '80px',
        height: '80px',
    }
})

export default function EmptyMember() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    function handleOpenInviteDialog() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Grid item xs={6} md={3}>
            <Card variant="outlined">
                <CardContent className={classes.emptyContent}>
                    <IconButton className={classes.plusIcon} onClick={handleOpenInviteDialog}>
                        <Add />
                    </IconButton>
                </CardContent>
            </Card>
            <InviteDialog open={open} onClose={handleClose}></InviteDialog>
        </Grid>
    )
}