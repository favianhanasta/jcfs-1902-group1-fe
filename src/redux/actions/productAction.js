import axios from 'axios';
import { API_URL } from '../../helper';


export const getProduct = (search=null)=>{
    return async(dispatch)=>{
        try{
            let res;
            if(search){
                if(search.nama){
                    if(search.category>0){
                        res = await axios.get(`${API_URL}/product?idcategory=${search.category}&nama=${search.nama}`);    
                    }
                    else{
                        res = await axios.get(`${API_URL}/product?nama=${search.nama}`);
                    }
                }else if(search.category>0){
                    if(search.nama){
                        res = await axios.get(`${API_URL}/product?idcategory=${search.category}&nama=${search.nama}`);  
                    }else{
                        res = await axios.get(`${API_URL}/product?idcategory=${search.category}`);
                    }
                }
            }else{
                res = await axios.get(`${API_URL}/product`);
            }
            console.log("search",search)
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