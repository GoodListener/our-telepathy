const ADD = '/timeline/ADD';
const CHANGE_TIMELINE = '/timeline/CHANGE_TIMELINE';

export const addTimeline = timeline => ({type: ADD, ...timeline});
export const changeTimeline = timeline => ({type: CHANGE_TIMELINE, ...timeline});

const initialState = []

export default function timeline(state = initialState, action) {
    console.log(action);
    switch(action.type) {
        case ADD:
            return [
                ...state,
                action
            ]
        case CHANGE_TIMELINE:
            return state.map(item => {
                if (item.index == action.index) {
                    return action;
                }
                return item;
            })
    }
}