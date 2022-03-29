import axios from 'axios';
import { API_URL } from '../../helper';


export const getProduct = ()=>{
    return async(dispatch)=>{
        try{
            let res = await axios.get(`${API_URL}/product`);
            dispatch({
                type: 'GET_PRODUCT',
                payload : res.data.dataProduct
            })
        }
        catch(error){
            console.log('error get product', error);
        }
    }
}

export const getCategory = () =>{
    return async(dispatch)=>{
        try{
            let res = await axios.get(`${API_URL}/product/category`);
            dispatch({
                type:'GET_CATEGORY',
                payload : res.data.category
            })
        }
        catch(error){
            console.log(error);
        }
    }
}