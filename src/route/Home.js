import React, { useState } from 'react';
import { Button, Box, makeStyles, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    home: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#fff',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    },
    title: {
        height: '3rem',
        fontSize: '2rem'
    },
    startButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: '#fff',
        width: '200px',
        height: '50px',
        borderRadius: '30px',
        fontSize: '1.2rem'
    },
    joinButton: {
        fontSize: '1.2rem',
        color: '#fff'
    }
})

export default function Home() {
    const styles = useStyles();
    const history = useHistory();
    const [started, setStarted] = useState(false);
    const [teamId, setTeamId] = useState('');
    const [userName, setUserName] = useState('');

    function handleClick() {
        setStarted(true);
    }
    function handleChange(e) {
        setTeamId(e.target.value);
    }
    function handleChangeMyName(e) {
        setUserName(e.target.value);
    }
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            started ? joinTheTeam() : setStarted(true);
        }
    }
    function joinTheTeam() {
        history.push(`/team/${teamId}/${userName}`);
    }

    return (
        <Box className={styles.home}>
            <h2 className={styles.title}>T E L E P A T H Y</h2>
            <h3>
                {!started && 
                <>
                    <TextField
                        label="MY NAME"
                        className={styles.joinTextField}
                        onChange={handleChangeMyName}
                        onKeyPress={handleEnterKey}
                        required
                    />
                    <br/><br/>
                    <Button
                        className={styles.startButton}
                        onClick={handleClick}>START
                    </Button>
                </>}
                {started && <div>
                    <Button
                        className={styles.joinButton}
                        onClick={joinTheTeam}>JOIN THE
                    </Button>
                    <TextField
                        label="TEAM"
                        className={styles.joinTextField}
                        onChange={handleChange}
                        onKeyPress={handleEnterKey}
                    />
                </div>}
            </h3>
        </Box >
    )
}