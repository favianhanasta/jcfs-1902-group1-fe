const INITIAL_STATE = {
    iduser: null,
    idrole: "",
    idstatus: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    profile_image: ""
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("LOGIN_SUCCESS REDUCER", action.payload)
            return {
                ...state,
                iduser: action.payload.iduser,
                idrole: action.payload.idrole,
                idstatus: action.payload.idstatus,
                email: action.payload.email,
                username: action.payload.username,
                password: action.payload.password,
                phone: action.payload.phone,
                profile_image: action.payload.profile_image
            }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}