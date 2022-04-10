import axios from "axios";
import { API_URL } from "../../helper";

export const loginAction = (email, password) => {
    return async (dispatch) => {
        try {
            let respone = await axios.post(`${API_URL}/users/login`, {
                email, password
            })
            if (respone.data.success) {
                localStorage.setItem("data", respone.data.dataLogin.token)
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: respone.data.dataLogin
                })
                return { success: respone.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const keepAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.get(`${API_URL}/users/keep`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataLogin.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataLogin
                    })
                    return { success: res.data.success }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const verifyAction = () => {
    return async (dispatch) => {
        try {
            let token = window.location.pathname.split('/')[2]
            if (token) {
                let res = await axios.get(`${API_URL}/users/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataVerify.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataVerify
                    })
                    return { success: res.data.success }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const newPassword = (password) => {
    return async (dispatch) => {
        try {
            let token = window.location.pathname.split('/')[2]
            console.log("token", token)
            let res = await axios.post(`${API_URL}/users/newpassword`, { password }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.data.success) {
                console.log("res.data ", res.data)
                localStorage.setItem("data", res.data.dataReset.token)
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data.dataReset
                })
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAddress = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            let res = await axios.get(`${API_URL}/users/getaddress`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: "GET_ADDRESS",
                payload: res.data.address
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCart = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            let res = await axios.get(`${API_URL}/users/getcart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: "GET_CART",
                payload: res.data.cart
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const plusQtyCart = (idcart, idstock, idproduct) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("data");
            let res = await axios.patch(`${API_URL}/users/pluscart/${idcart}`, { idstock, idproduct }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.data.success) {
                dispatch(getCart())
                return { success: true, message: "plus 1 item cart success" }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const minusQtyCart = (idcart, idstock, idproduct) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("data");
            let res = await axios.patch(`${API_URL}/users/minuscart/${idcart}`, { idstock, idproduct }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.data.success) {
                dispatch(getCart())
                return { success: true, message: "minus 1 item cart success" }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}

