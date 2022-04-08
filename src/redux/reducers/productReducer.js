const INITIAL_STATE = {
    categoryList : [],
    productList :[],
    satuanList : []
}

export const productReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case "GET_PRODUCT":
            console.log('prd',action.payload)
            return{
                ...state,productList:action.payload
            }
        case "GET_CATEGORY":
            return{
                ...state,categoryList:action.payload
            }
        case "GET_SATUAN":
            return{
                ...state,satuanList:action.payload
            }
        default:
            return state
    }
}