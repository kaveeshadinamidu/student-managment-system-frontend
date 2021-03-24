const LogInReducer = (state=0,action)=>{
    if (action.type==="STUDENT"){
        return 1;
    }else if(action.type === "STAFF"){
        return 2;
    }else if(action.type === "SUPER"){
        return 3;
    }else if(action.type === "LOGOUT" ){
        return 0;
    }else{
        return state;
    }
}

export default LogInReducer;