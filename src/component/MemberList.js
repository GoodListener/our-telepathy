import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketManager from '../socket/socketManager';
import EmptyMember from './EmptyMember';
import Member from './Member';
import { changeStatus, addMember, removeMember } from '../store/memberList/memberList.reducer';

const useStyles = makeStyles({
    memberBox: {
        padding: "10px 40px",
        marginTop: "20px"
    }
})

export default function MemberList() {
    const memberList = useSelector(state => state.memberList);
    const dispatch = useDispatch();
    const styles = useStyles();

    useEffect(() => {
        socketManager.onJoin(onAddMember, onRemoveMember);

        return () => {
            socketManager.offJoin();
        }
    });

    useEffect(() => {
        socketManager.onChangeStatus(onChangeStatus);

        return () => {
            socketManager.offChangeStatus();
        }
    });

    function onAddMember(member) {
        dispatch(addMember(member));
    }

    /**
     * 
     * @param {string} id 
     */
    function onRemoveMember(id) {
        dispatch(removeMember(id));
    }

    function updateMember(newMember) {
        dispatch(changeStatus(newMember))
    }

    function onChangeStatus(member) {
        const foundMember = memberList.find(mem => mem.id === member.id);
        if (foundMember) {
            foundMember.status = member.status;
            updateMember(foundMember);
        }
    }

    return <Grid container spacing={3} className={styles.memberBox}>
        {memberList.map(member => <Member key={member.id} member={member}></Member>)}
        <EmptyMember></EmptyMember>
    </Grid>
}