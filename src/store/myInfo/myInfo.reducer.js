import { createStore } from "redux";

const SET_MY_INFO = '/myInfo/SET_MY_INFO';
const CHANGE_STATUS = '/myInfo/CHANGE_STATUS';

export const setMyInfo = myInfo => ({type: SET_MY_INFO, ...myInfo});
export const changeStatus = myInfo => ({type: CHANGE_STATUS, ...myInfo});

const initialState = {
    id: '',
    name: '',
    team: '',
    status: ''
}


export default function myInfo(state = initialState, action) {
    switch(action.type) {
        case SET_MY_INFO:
            return {
                ...state,
                id: action.id,
                name: action.name,
                team: action.team,
                status: action.status
            }
        case CHANGE_STATUS:
            return {
                ...state,
                status: action.status
            }
        default :
            return state;
    }
}