const ADD = '/timeline/ADD';
const CHANGE_TIMELINE = '/timeline/CHANGE_TIMELINE';
const CLEAR = '/timeline/CLEAR';
const CHANGE_TOTAL_TIME = '/timeline/CHANGE_WORKING_HOURS';

export const addTimeline = workingHours => ({ type: ADD, ...workingHours });
export const changeTimeline = timeline => ({ type: CHANGE_TIMELINE, ...timeline });
export const clear = () => ({ type: CLEAR });
export const changeTotalTime = workingHours => ({ type: CHANGE_TOTAL_TIME, ...workingHours });

const initialState = {
    workDate: new Date().toISOString(),
    startDate: null,
    endDate: null,
    currentStatus: '',
    currentIndex: -1,
    totalTime: 60 * 60 * 1000,
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
                            width: calcDateWidth(item.startDate, action.lastDate, state.totalTime),
                            lastDate: action.lastDate
                        };
                    }
                    return item;
                })
            }
        case CHANGE_TOTAL_TIME:
            return {
                ...state,
                totalTime: action.totalTime,
                stateDate: action.startDate ? action.stateDate : state.startDate,
                endDate: action.endDate ? action.endDate : state.endDate,
                timeline: state.timeline.map(item => {
                    return {
                        ...item,
                        width: calcDateWidth(item.startDate, item.lastDate, action.totalTime)
                    }
                })
            }
        case CLEAR:
            return initialState;
        default:
            return state;
    }
}

function calcDateWidth(startDate, endDate, totalTime) {
    return ((new Date(endDate) - new Date(startDate)) / totalTime * 100).toFixed(2);
}