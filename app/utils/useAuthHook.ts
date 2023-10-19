"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/context";
import { loginUrl, registerUrl } from "./helpingHand";

const useAuthHook = () => {
    const router = useRouter();
    const { setAuthState } = useGlobalContext();

    const loginFunc = async (requiredValues: {
      email: string;
      password: string;
    }) => {
      setAuthState({ user: null, loading: true, error: null, appLoading: false });

      const response = await axios
        .post(loginUrl, requiredValues)
        .catch((err) =>
          setAuthState({ user: null, loading: false, error: err.response.data.errMsg, appLoading: false })
        );

      if (response && response.data) {
        setAuthState({user: response.data, loading: false, error: null, appLoading: false});
        router.push("/");
        return;
      }
    };

    const registerFunc = async (requiredValues: {
        email: string;
        password: string;
        firstName: string; 
        lastName: string; 
        username: string; 
        gender: string;
      }) => {
        setAuthState({ user: null, loading: true, error: null, appLoading: false });

      const response = await axios
        .post(registerUrl, requiredValues)
        .catch((err) =>
          setAuthState({ user: null, loading: false, error: err.response.data.errMsg, appLoading: false })
        );

      if (response && response.data) {
        setAuthState({user: response.data, loading: false, error: null, appLoading: false});
        router.push("/");
        return;
      }
    }

    return { loginFunc, registerFunc }
}
 
export default useAuthHook;