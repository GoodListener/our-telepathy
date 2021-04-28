import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
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
    cardAction: {
        width: '100%'
    }
}));

export default function Member({member}) {
    const styles = useStyles();
    const [label, setLabel] = useState('');
    const [selectColor, setSelectColor] = useState('primary');

    useEffect(() => {
        changeStatus(member.status);
    });

    function changeStatus (status) {
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

    return <Grid item xs={6} md={3}>
        <Card>
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
                >
                    Call
                </Button>
            </CardActions>
        </Card>
    </Grid>
}