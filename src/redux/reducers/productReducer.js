const INITIAL_STATE = {
    categoryList : [],
    productList :[]
}

export const productReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case "GET_PRODUCT":
            console.log('produk', action.payload);
            return{
                ...state,productList:action.payload
            }
        case "GET_CATEGORY":
            console.log('category', action.payload);
            return{
                ...state,categoryList:action.payload
            }
        default:
            return state
    }
}