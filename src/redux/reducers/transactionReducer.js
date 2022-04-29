const INITIAL_STATE = {
    transactionList: [],
    byResep: []
}

export const transactionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_TRANSACTION":
            return {
                ...state, transactionList: action.payload
            }
        case "GET_ORDERBYRESEP":
            console.log('transac', action.payload)
            return {
                ...state, byResep: action.payload
            }
        default:
            return state
    }
}