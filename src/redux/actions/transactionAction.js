import axios from "axios"
import { API_URL } from "../../helper";


export const getTransactionAdmin = (search=null)=>{
    return async(dispatch)=>{
        try{
            let res ;
            if(search){
                if(search.username){
                    if(search.idstatus){
                        res = await axios.get(API_URL+`/transaction/getadmin?username=${search.username}&idstatus=${search.idstatus}`);
                    }else{
                        res = await axios.get(API_URL+`/transaction/getadmin?username=${search.username}`);
                    }
                }else if(search.idstatus){
                    if(search.username){
                        res = await axios.get(API_URL+`/transaction/getadmin?username=${search.username}&idstatus=${search.idstatus}`);
                    }else{
                        res = await axios.get(API_URL+`/transaction/getadmin?idstatus=${search.idstatus}`);
                    }
                }else if(search.invoice){
                    res = await axios.get(API_URL+`/transaction/getadmin?invoice=${search.invoice}`);
                }
            }else{
                res = await axios.get(API_URL+`/transaction/getadmin`);
            }
            dispatch({
                type: 'GET_TRANSACTION',
                payload : res.data.dataTransaksiAdmin
            })
        }
        catch(error){
            console.log('error get transaction admin', error)
        }
    }
}

export const getTransactionByResep = ()=>{
    return async (dispatch)=> {
        try{
            let token = localStorage.getItem('data');
            let res=await axios.get(API_URL + `/transaction/getorderbyresep`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type : 'GET_ORDERBYRESEP',
                payload : res.data.dataGetOrder
            })
        }
        catch(error){
            console.log('getTransactionResep error',error);
        }
    }
}