const ADD = '/timeline/ADD';
const CHANGE_TIMELINE = '/timeline/CHANGE_TIMELINE';
const CLEAR = '/timeline/CLEAR';

export const addTimeline = timeline => ({ type: ADD, ...timeline });
export const changeTimeline = timeline => ({ type: CHANGE_TIMELINE, ...timeline });
export const clear = () => ({ type: CLEAR });

const startDate = new Date();
startDate.setHours(9, 0, 0, 0);
const endDate = new Date();
endDate.setHours(18, 0, 0, 0);

const initialState = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    currentStatus: '',
    currentIndex: -1,
    timeline: []
}

export default function workingHours(state = initialState, action) {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                currentIndex: state.currentIndex + 1,
                currentStatus: action.status,
                timeline: [
                    ...state.timeline,
                    {
                        ...action.timeline,
                        index: state.currentIndex + 1
                    }
                ]
            }
        case CHANGE_TIMELINE:
            return {
                ...state,
                timeline: state.timeline.map(item => {
                    if (item.index == action.index) {
                        return {
                            ...item,
                            width: action.width,
                            lastDate: action.lastDate
                        };
                    }
                    return item;
                })
            }
        case CLEAR:
            return initialState;
        default:
            return state;
    }
}