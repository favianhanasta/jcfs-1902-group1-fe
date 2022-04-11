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