const InternalReducer = (state=0,action)=>{
    if (action.type==="SETTINGS"){
        return "SET1";
    }else{
        return state;
    }
}

export default InternalReducer;