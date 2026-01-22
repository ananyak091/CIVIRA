import React, { useContext, useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { login, loading, register, token, isLoggedIn, setIsLoggedIn } =
    useAppContext();

  const location = useLocation();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "signup") {
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters");
          return;
        }

        const formData = {
          name: name,
          email: email,
          password: password,
        };

        await register(formData);
        toast.success("Registered successfully 🎉");
        setName("");
        setEmail("");
        setPassword("");
        setState("login");
      } else {
        const formData = {
          email: email,
          password: password,
        };

        await login(formData);
        toast.success("Login successful 🚀");
        setEmail("");
        setPassword("");
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token]);
  return (
    <div>
      {location.state?.message && (
        <div className="mb-4 rounded-md bg-red-100 text-red-700 px-4 py-2 flex flex-col items-center justify-center">
          {location.state.message}
        </div>
      )}
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col m-auto gap-4 min-w-[340px] sm:min-w-96 items-start p-8 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {state === "signup" ? "Create Account" : "Login"}
          </p>
          <p>Please {state === "signup" ? "sign up" : "log in"} to Continue</p>
          {state === "signup" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                type="text"
                name=""
                id=""
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>
          )}
          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              name=""
              id=""
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border rounded w-full p-2 mt-1 ${
                password && password.length < 6
                  ? "border-red-500"
                  : "border-zinc-300"
              }`}
            />

            {password && password.length < 6 && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#007EC5] text-white w-full py-2 text-base rounded-md"
          >
            {state === "signup" ? "Create Account" : "Login"}
          </button>
          {state === "signup" ? (
            <p>
              Already have an account?{" "}
              <span
                className=" underline cursor-pointer "
                onClick={() => setState("login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an new account?{" "}
              <span
                className=" underline cursor-pointer"
                onClick={() => setState("signup")}
              >
                {" "}
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
