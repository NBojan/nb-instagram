"use client"
import useAuthHook from "@/app/utils/useAuthHook";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useGlobalContext } from "@/app/context/context";

const LogForm = () => {
  const { error, loading } = useGlobalContext();
  const { loginFunc, registerFunc } = useAuthHook();
  const [login, setLogin] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "male",
  });

  const handleChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) return;
    else {
      if (login)
        return loginFunc({
          email: formValues.email.trim(),
          password: formValues.password.trim(),
        });
      else return registerFunc({
          email: formValues.email.trim(),
          password: formValues.password.trim(),
          firstName: formValues.firstName.trim(),
          lastName: formValues.lastName.trim(),
          gender: formValues.gender.trim(),
          username: formValues.username.trim(),
      });
    }
  };

  const dummyLogin = () => {
    return loginFunc({
      email: 'dummy@dummy.com',
      password: "Dummy123",
    });
  }

    useEffect(() => {
      const { firstName, lastName, username, email, password } = formValues;
      if(login){
        if(!email.trim() || !password.trim()) return setDisabled(true);
        else return setDisabled(false)
      }
      else {
        if(!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !password.trim()) return setDisabled(true);
        else return setDisabled(false)
      }
    }, [formValues])

    return (
      <form className="bg-white rounded shadow w-full max-w-[480px] px-4 py-6 mt-6" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">{login ? "Log in" : "Sign up"}</h3>
        
        {!login && (
          <>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mb-4">
              <input
                type="text"
                className="w-full text-sm sm:text-base px-3 py-2 bg-gray-100 rounded outline-none border border-gray-300"
                placeholder="First name"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="w-full text-sm sm:text-base px-3 py-2 bg-gray-100 rounded outline-none border border-gray-300"
                placeholder="Last name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mb-4">
              <input
                type="text"
                className="w-full text-sm sm:text-base px-3 py-2 bg-gray-100 rounded outline-none border border-gray-300"
                placeholder="Username"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                maxLength={26}
                required
              />
              <select
                className="w-full sm:w-[40%] text-sm sm:text-base px-3 py-2 bg-gray-100 rounded outline-none border border-gray-300"
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </>
        )}

        <input
          type="email"
          className="w-full text-sm sm:text-base px-3 py-2 bg-gray-100 rounded outline-none mb-4 border border-gray-300"
          placeholder="email@address.com"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="w-full text-sm sm:text-base px-3 py-2 bg-gray-100 rounded outline-none border border-gray-300"
          placeholder="Password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          required
        />

        <div className="mt-4 flex flex-col items-center justify-center">
          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

          <button
            type="submit"
            className="btn btn-m btn-prim disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
            disabled={disabled || loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>

          {login && <button type="button" className="btn btn-m btn-prim capitalize mt-2" onClick={dummyLogin}>use dummy account</button>}

          <p className="mt-4 text-sm text-center">
            <span>{login ? "Don't have an account? " : "Already have an account? "}</span>
            <span onClick={() => setLogin(!login)} className="text-red-500 cursor-pointer">{login ? "Sign Up" : "Log In"}</span>
            .
          </p>
        </div>
      </form>
    );
}
 
export default LogForm;