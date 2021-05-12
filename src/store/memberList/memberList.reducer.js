const ADD_MEMBER = '/memberList/ADD_MEMBER';
const REMOVE_MEMBER = '/memberList/REMOVE_MENBER';
const CHANGE_STATUS = '/memberLIST/CHANGE_STATUS';

export const addMember = member => ({type: ADD_MEMBER, member});
export const removeMember = memberId => ({type: REMOVE_MEMBER, memberId});
export const changeStatus = member => ({type: CHANGE_STATUS, member});

const initialState = [];

export default function memberList(state = initialState, action) {
    switch(action.type) {
        case ADD_MEMBER:
            return [
                ...state,
                action.member
            ]
        case REMOVE_MEMBER:
            return state.filter(member => {
                return member.id !== action.memberId;
            })
        case CHANGE_STATUS: 
            return state.map(member => {
                if (member.id === action.member.id) {
                    return action.member;
                }
                return member;
            })
        default :
            return state;
    }
}