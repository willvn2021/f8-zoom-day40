const initState = {
    taskLists: [],
};

function reducer(state = initState, action) {
    console.log(state, action);
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                taskLists: [...state.taskLists, action.payload],
            };

        case "SET_TASKS":
            return {
                ...state,
                taskLists: action.payload,
            };

        case "UPDATE_TASK":
            return {
                ...state,
                taskLists: state.taskLists.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };

        case "DELETE_TASK":
            return {
                ...state,
                taskLists: state.taskLists.filter(
                    (task) => task.id !== action.payload
                ),
            };

        default:
            return state;
    }
}

export default reducer;
