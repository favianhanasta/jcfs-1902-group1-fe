const INITIAL_STATE = {
    transactionList : []
}

export const transactionReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case "GET_TRANSACTION":
            console.log('transac',action.payload)
            return{
                ...state,transactionList:action.payload
            }
        default:
            return state
    }
}