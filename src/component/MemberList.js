import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import socketManager from '../socket/socketManager';
import Member from './Member';

const useStyles = makeStyles({
    memberBox: {
        padding: "10px 40px",
        marginTop: "20px"
    }
})

export default function MemberList() {
    const [memberList, setMemberList] = useState([]);
    const styles = useStyles();

    useEffect(() => {
        socketManager.onJoin(addMember, removeMember);

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

    function addMember(member) {
        setMemberList(memberList => [...memberList, member]);
    }

    /**
     * 
     * @param {string} id 
     */
    function removeMember(id) {
        setMemberList(memberList => memberList.filter(member => {
            return member.id !== id;
        }));
    }

    function updateMember(newMember) {
        const index = [...memberList].findIndex(member => {
            return member.id === newMember.id
        });
        let newMemberList = [...memberList];
        newMemberList[index] = newMember;
        setMemberList(() => newMemberList);
    }

    function onChangeStatus(member) {
        const foundMember = [...memberList].find(mem => mem.id === member.id);
        if (foundMember) {
            foundMember.status = member.status;
            updateMember(foundMember);
        }
    }

    return <Grid container spacing={3} className={styles.memberBox}>
        {memberList.map(member => <Member key={member.id} member={member}></Member>)}
    </Grid>
}