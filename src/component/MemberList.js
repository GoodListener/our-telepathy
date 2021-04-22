import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Member from './Member';

const useStyles = makeStyles({
    memberBox: {
        padding: "10px 40px",
        marginTop: "20px"
    }
})

export default function MemberList({ memberList, offerToMember }) {
    const styles = useStyles();

    return <Grid container spacing={3} className={styles.memberBox}>
        {memberList.map(member => <Member key={member.id} member={member}></Member>)}
    </Grid>
}