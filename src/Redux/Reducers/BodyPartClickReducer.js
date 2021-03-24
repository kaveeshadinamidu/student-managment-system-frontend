const BodyPartClickReducer = (state={id:"0"},action)=>{
    if(action.type==="REQUESTCLICKED"){
        return action
    }else if(action.type==="RECENTREQUESTCLICKED"){
        return action
    }else if(action.type==="MIDBOXCLICKED"){
        return action;
    }else if(action.type==="GOTOHOME"){
        return action;
    }else if(action.type==="SETTINGS"){
        return action
    }else if(action.type === "HOMERESET" ){
        return [];
    }else{
        return state;
    }
}

export default BodyPartClickReducer;