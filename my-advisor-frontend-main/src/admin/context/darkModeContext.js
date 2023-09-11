import { createContext, useReducer } from 'react';
import DarkModeReducer from "./darkModeReducer";

const INITITIAL_STATE = {
    darkMode: true
};

export const DarkModeContext = createContext(INITITIAL_STATE)

export const DarkModeContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(DarkModeReducer, INITITIAL_STATE);

    return(
        <DarkModeContext.Provider value={ {darkMode: state.darkMode, dispatch }}>
            {children}
        </DarkModeContext.Provider>
    )

};