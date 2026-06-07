import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterComplaintContext } from "@/context/RegisterComplaintContext";

const Auth = () => {
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);
  const [otpStep, setOtpStep] = useState("request"); // request | verify | reset
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [googleReady, setGoogleReady] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();
  const { login, loading, register, token, isLoggedIn, setIsLoggedIn } =
    useAppContext();

  const { isLoading, setIsLoading } = useRegisterComplaintContext();
  const location = useLocation();
  const backendurl = import.meta.env.VITE_API_BASE_URL;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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

  useEffect(() => {
    if (!googleClientId) return;
    if (window.google && window.google.accounts) {
      setGoogleReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [googleClientId]);

  useEffect(() => {
    if (!googleReady || !googleClientId) return;
    if (!window.google || !window.google.accounts) return;

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: async (response) => {
        try {
          console.log("Google response:", response);
          const { data } = await axios.post(backendurl + "api/auth/google", {
            idToken: response.credential,
          });
          console.log("data in google sign-in:", data);
          if (data?.token) {
            localStorage.setItem("CIVIRA_token", data.token);
            setIsLoggedIn(true);
            toast.success("Google sign-in successful");
            navigate("/");
          } else {
            toast.error("Google sign-in failed");
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          toast.error(error?.response?.data?.message || error.message);
        }
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-auth-button"),
      {
        theme: "outline",
        size: "large",
        width: 320,
        text: "continue_with",
        shape: "pill",
      },
    );
  }, [googleReady, googleClientId, backendurl, navigate, setIsLoggedIn]);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      await axios.post(backendurl + "api/auth/send-otp", { email });
      toast.success("OTP sent to your email");
      setOtpStep("verify");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    try {
      await axios.post(backendurl + "api/auth/verify-otp", { email, otp });
      toast.success("OTP verified");
      setOtpStep("reset");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post(backendurl + "api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successful");
      setForgotOpen(false);
      setOtpStep("request");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
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

          <div className="w-full flex flex-col items-center gap-3">
            <div className="flex items-center w-full gap-3 text-xs text-zinc-400">
              <span className="h-px bg-zinc-200 flex-1" />
              OR
              <span className="h-px bg-zinc-200 flex-1" />
            </div>
            {!googleClientId ? (
              <p className="text-xs text-zinc-500">
                Google Sign-In is not configured.
              </p>
            ) : (
              <div
                id="google-auth-button"
                className="w-full flex justify-center"
              />
            )}
          </div>

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
            <>
              {" "}
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
              <p
                className="underline cursor-pointer"
                onClick={() => {
                  setForgotOpen(true);
                  setOtpStep("request");
                }}
              >
                Forgot your password?{" "}
              </p>
            </>
          )}
        </div>
      </form>

      {forgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Reset Password
              </h3>
              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() => setForgotOpen(false)}
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              We will send an OTP to your email to reset your password.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                  disabled={otpStep !== "request"}
                />
              </div>

              {otpStep !== "request" && (
                <div>
                  <label className="text-sm">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border border-zinc-300 rounded w-full p-2 mt-1"
                  />
                </div>
              )}

              {otpStep === "reset" && (
                <>
                  <div>
                    <label className="text-sm">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPass ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border border-zinc-300 rounded w-full p-2 pr-10 mt-1"
                      />

                      {/* Eye button */}
                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500"
                        onClick={() => setShowNewPass(!showNewPass)}
                      >
                        {showNewPass ? "🙈" : "👁️"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-zinc-300 rounded w-full p-2 pr-10 mt-1"
                      />

                      {/* Eye button */}
                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                      >
                        {showConfirmPass ? "🙈" : "👁️"}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-5 flex gap-2">
              {otpStep === "request" && (
                <button
                  onClick={handleSendOtp}
                  className="bg-[#007EC5] text-white w-full py-2 text-base rounded-md"
                >
                  Send OTP
                </button>
              )}

              {otpStep === "verify" && (
                <button
                  onClick={handleVerifyOtp}
                  className="bg-[#007EC5] text-white w-full py-2 text-base rounded-md"
                >
                  Verify OTP
                </button>
              )}

              {otpStep === "reset" && (
                <button
                  onClick={handleResetPassword}
                  className="bg-[#007EC5] text-white w-full py-2 text-base rounded-md"
                >
                  Reset Password
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
