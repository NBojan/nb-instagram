"use client"

import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AppLoading, LogPage } from "../components";
import { tokenLoginUrl } from "../utils/helpingHand";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const ContextProvider = ({children}) => {
    const router = useRouter();
    const [authState, setAuthState] = useState({user: null, loading: false, error: null, appLoading: true});

    const [sidebar, setSidebar] = useState({openSide: false, uploadProfilePic: false});
    const closeSidebar = () => setSidebar({openSide: false, uploadProfilePic: sidebar.uploadProfilePic});
    const toggleProfilePic = () => setSidebar({openSide: true, uploadProfilePic: !sidebar.uploadProfilePic});

    const signOut = () => {
        deleteCookie("jwt");
        setAuthState({user: null, loading: false, error: null, appLoading: false})
    }

    const tokenLogin = async () => {
        setAuthState({user: null, loading: false, error: null, appLoading: true});

        const jwt = getCookie("jwt");

        if(!jwt) {
            router.push("/registration");
            return setAuthState({user: null, loading: false, error: null, appLoading: false});
        }
        else {
            const response = await axios(tokenLoginUrl, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .catch(err => setAuthState({user: null, loading: false, error: err.response.data.errMsg, appLoading: false}))

            if(response && response.data) return setAuthState({user: response.data, loading: false, error: null, appLoading: false})
        }
    }

    useEffect(() => {
        tokenLogin();
    }, []);

    
    if(authState.appLoading) return <AppLoading />
    if(!authState.user) return <AppContext.Provider value={{...authState, setAuthState}}><LogPage /></AppContext.Provider>
    return (
        <AppContext.Provider value={{...authState, setAuthState, ...sidebar, setSidebar, closeSidebar, toggleProfilePic, signOut}}>{children}</AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}