export const Studentlogged = ()=>{
    return {
        type:"STUDENT"
    };
};

export const Stafflogged = ()=>{
    return {
        type:"STAFF"
    };
};

export const SuperLogged = ()=>{
    return {
        type:"SUPER"
    };
};
export const LogOutUser = ()=>{
    return {
        type:"LOGOUT"
    };
};

export const SettingsChanged = ()=>{
    return{
        type:"SETTINGS"
    }
}

export const UserLoggedOut = ()=>{
    return {
        type :"USERLOGGEDOUT"
    };
}

export const UserLogged = (payload)=>{
    return {
        type:"USERLOGGED",
        payload:payload
    }
}



export const RequestBoxClicked = (props)=>{
    return {
        type:"REQUESTCLICKED",
        id:props.identifier,
        payload:props
    };
}




export const GotoHome = ()=>{
    return {
        type:"GOTOHOME",
        id:"0"
        
    };
}

export const Settings = ()=>{
    return{
        type:"SETTINGS",
        id:"S1"
    }
}

export const MidBoxClicked = (id)=>{
    return {
        type:"MIDBOXCLICKED",
        id:id
    }
}

export const RecentRequestClicked = (props)=>{
    return {
        type:"RECENTREQUESTCLICKED",
        payload : props,
        id:"R1"
    }
}
 
