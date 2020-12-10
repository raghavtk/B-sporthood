import React, {useState, createContext} from 'react';

export const UserNameIdContext = createContext();

export const UserNameIdProvider = (props)=>{
    const [nameid, setNameid] = useState('');
    return(
        <UserNameIdContext.Provider value={[nameid, setNameid]}>
            {props.children}
        </UserNameIdContext.Provider>
    );

}