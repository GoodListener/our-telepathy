import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import React from 'react';

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
    }
}));

export default function Member({member}) {
    const styles = useStyles();

    return <Grid item xs={3} md={3}>
        <Card>
            <CardHeader
                className={styles.cardHeader}
                avatar={<Avatar className={styles.orange}>O</Avatar>}
                title={member.name}
                action={<Chip className={styles.cardStatusChip} color="primary" label="업무중" />}
            >
            </CardHeader>
            <CardContent className={styles.cardContent}>
            </CardContent>
        </Card>
    </Grid>
}