const User = (state=[],action)=>{
    if(action.type === "USERLOGGED"){
        return action.payload;
    }else if(action.type === "USERLOGGEDOUT"){
        return []
    }
    return state;
}

export default User;