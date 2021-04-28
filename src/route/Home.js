import React, { useEffect, useState } from 'react';
import { Button, Box, makeStyles, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    home: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
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
        fontSize: '1.2rem'
    }
})

export default function Home() {
    const styles = useStyles();
    const history = useHistory();
    const [started, setStarted] = useState(false);
    const [teamId, setTeamId] = useState('');
    const [userName, setUserName] = useState('');
    const myInfo = useSelector(state => state.myInfo);

    useEffect(() => {
        if (myInfo.id) {
            setTeamId(myInfo.team);
            setUserName(myInfo.name);
        }
    }, []);

    function handleChange(e) {
        setTeamId(e.target.value);
    }
    
    function handleChangeMyName(e) {
        setUserName(e.target.value);
    }
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            if (!started && teamId.trim().length <= 0) {
                return;
            } else if (started && userName.trim().length <= 0) {
                return;
            }

            started ? setStarted(true) : joinTheTeam();
        }
    }
    function joinTheTeam() {
        if (!started && teamId.trim().length <= 0) {
            return;
        }
        setStarted(true);
    }
    function handleClick() {
        if (started && userName.trim().length <= 0) {
            return;
        }
        history.push(`/team/${teamId}/${userName}`);
    }

    return (
        <Box className={styles.home}>
            <h2 className={styles.title}>TeleTele</h2>
            <h3>
                {!started && <>
                    <TextField
                        label="TEAM"
                        className={styles.joinTextField}
                        onChange={handleChange}
                        onKeyPress={handleEnterKey}
                        value={teamId}
                        required
                    />
                    <br/><br/>
                    <Button
                        className={styles.startButton}
                        onClick={joinTheTeam}
                    >JOIN
                    </Button>
                </>}
                {started && <>
                    <TextField
                        label="MY NAME"
                        className={styles.joinTextField}
                        onChange={handleChangeMyName}
                        onKeyPress={handleEnterKey}
                        value={userName}
                        required
                    />
                    <br/><br/>
                    <Button
                        className={styles.startButton}
                        onClick={handleClick}>START
                    </Button>
                </>}
            </h3>
        </Box >
    )
}