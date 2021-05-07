import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import statusList from '../dto/statusList'
import CallDialog from './callDialog/CallDialog';

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
    const [selectColor, setSelectColor] = useState('primary');

    useEffect(() => {
        changeStatus(member.status);
    });

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
            <CallDialog member={member} open={open} onClose={handleClose}></CallDialog>
        </Card>
    </Grid>
}

Member.propTypes = {
    member: PropTypes.any.isRequired
}