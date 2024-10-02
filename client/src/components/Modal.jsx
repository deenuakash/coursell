// src/components/Modal.jsx
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../contexts/ModalContext"; // Import ModalContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { emailOrPhoneSchema, passwordSchema } from "../utils/validationSchema";
import { AuthContext } from "../contexts/AuthContext";

const Modal = () => {
  const { setShow } = useContext(ModalContext); // Get 'setShow' to close the modal
  const { login } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [OTP, setOTP] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    if (step === 3 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (timer === 0) {
      setShowResend(true);
    }
  }, [timer, step]);

  const uri = import.meta.env.VITE_SERVER_ENDPOINT;

  const { mutate: checkUserMutation } = useMutation({
    mutationFn: async (input) => {
      const res = await axios.post(`${uri}/api/user/checkUser`, {
        input,
      });
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.status) setStep(2);
      else {
        handleOTPLogin(input);
        otpStep();
      }
    },
    onError: (err) => {
      setError(err);
    },
  });

  const { mutate: signinMutation } = useMutation({
    mutationFn: async ({ input, password }) => {
      const res = await axios.post(`${uri}/api/user/signin`, {
        email: input,
        password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      login(data.token);
      setShow(false);
    },
    onError: (err) => {
      setError(err.response.data.message);
    },
  });

  const { mutate: sendOTPMutation } = useMutation({
    mutationFn: async (email) => {
      const res = await axios.post(`${uri}/api/user/sendOTP`, {
        email,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setOTP("");
      otpStep();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: verifyOTPMutation } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${uri}/api/user/verifyOTP`, {
        email: input,
        otp: OTP,
      });
      return res.data;
    },

    onSuccess: (data) => {
      login(data.token);
      setShow(false);
    },
    onError: (err) => {
      setError(err.response.data.message);
    },
  });

  const { mutate: resetPasswordMutation } = useMutation({
    mutationFn: async () => {
      const res = await axios.put(`${uri}/api/user/resetPassword`, {
        email: input,
        password,
      });
    },
    onSuccess: (data) => {
      setShow(false);
      setResetPassword(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const otpStep = () => {
    setStep(3);
    setShowResend(false);
    setTimer(30);
  };

  const handleNext = () => {
    setError("");
    try {
      emailOrPhoneSchema.parse(input);
      checkUserMutation(input);
    } catch (err) {
      setError(err.errors[0].message);
    }
  };

  const handleLogin = () => {
    setError("");
    signinMutation({ input, password });
  };

  const handleOTPLogin = () => {
    sendOTPMutation(input);
  };

  const verifyOTP = () => {
    if (resetPassword) setStep(6);
    else {
      verifyOTPMutation();
    }
  };

  const resendOTP = () => {
    setShowResend(false);
    setTimer(30);
    sendOTPMutation(input);
  };

  const sendOTPForReset = () => {
    setResetPassword(true);
    handleOTPLogin(input);
    otpStep();
  };

  const handleResetPassword = () => {
    setError("");
    const parsedPassword = passwordSchema.safeParse(password);
    const parsedConfirmPassword = passwordSchema.safeParse(confirmPassword);
    if (!parsedPassword.success || !parsedConfirmPassword.success) {
      setError(parsedPassword.error.errors[0].message);
    }
    if (password === confirmPassword) {
      resetPasswordMutation();
    } else {
      setError("Password do not match");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-3xl relative w-[500px]">
        {step === 1 && (
          <div>
            <div className="flex items-center justify-center mb-6">
              <h4 className="flex-grow text-center text-xl font-bold leading-[1.8]">
                Enter email/phone number
              </h4>
              <button className="text-[#146fe6]" onClick={() => setShow(false)}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="inline-block mb-2 font-medium">
                Phone number/Email ID
              </label>
              <input
                id="email"
                className={`block w-full rounded-full px-3 py-2 bg-[#f6f7f9] border border-[#dee2e6]  leading-[1.8] focus:outline-0 ${
                  error
                    ? "border-[red] focus:bottom-[red]"
                    : "border-[#dee2e6] focus:border-[#86b7fe]"
                }`}
                type="text"
                placeholder="Enter your phone number or email id"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>
            <div className="text-center">
              <button
                className="bg-[#146fe6] px-6 py-2 rounded-full text-white hover:bg-[#1058b7] leading-[1.8]"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="flex items-center justify-center mb-6">
              <button className="text-[gray]" onClick={() => setStep(1)}>
                <FontAwesomeIcon icon={faCircleLeft} />
              </button>
              <h4 className="flex-grow text-center text-xl font-bold leading-[1.8]">
                Login to your account
              </h4>
              <button className="text-[#146fe6]" onClick={() => setShow(false)}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
            <div className="text-center">
              <button
                className="bg-[#146fe6] px-12 py-1.5 rounded-full text-white hover:bg-[#1058b7] w-full mb-2 leading-[1.8] border-2 border-[#146fe6]"
                onClick={() => setStep(4)}
              >
                Login with Password
              </button>
              <button
                className="bg-[#146fe6] px-12 py-1.5 rounded-full text-white hover:bg-[#1058b7] w-full leading-[1.8] border-2 border-[#146fe6]"
                onClick={handleOTPLogin}
              >
                Login with OTP
              </button>
              <button
                className="px-6 py-1.5 rounded-full w-full leading-[1.8] text-[#2f80ed] underline text-[12.8px] mt-1"
                onClick={() => setStep(5)}
              >
                Forgot Password
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="flex items-center justify-center mb-6">
              <button className="text-[gray]" onClick={() => setStep(1)}>
                <FontAwesomeIcon icon={faCircleLeft} />
              </button>
              <h4 className="flex-grow text-center text-xl font-bold leading-[1.8]">
                Verify OTP
              </h4>
              <button className="text-[#146fe6]" onClick={() => setShow(false)}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="otp" className="inline-block mb-2 font-medium">
                Enter OTP
              </label>
              <input
                id="otp"
                className="block w-full rounded-full px-3 py-2 bg-[#f6f7f9] border border-[#dee2e6]  leading-[1.8] focus:outline-0 focus:border-[#86b7fe]"
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOTP(e.target.value)}
                value={OTP}
              />
            </div>
            <div className="flex w-full h-full mb-4 p-4 relative bg-[#d1e7dd] text-[#0a3622] rounded-3xl border border-[#a3cfbb] leading-[1.8]">
              We’ve sent an OTP to your phone/email
            </div>
            <div className="text-center py-2 px-12">
              <button
                className="bg-[#146fe6] px-6 py-2 mb-2 rounded-full text-white hover:bg-[#1058b7] leading-[1.8] w-full"
                onClick={verifyOTP}
              >
                Submit
              </button>
              {!showResend && (
                <div className="text-[#6d7278] text-sm">{`Request new OTP in ${timer} seconds`}</div>
              )}
              {showResend && (
                <button
                  className="bg-[#146fe6] px-6 py-2 rounded-full text-white hover:bg-[#1058b7] leading-[1.8] w-full"
                  onClick={resendOTP}
                >
                  Resend
                </button>
              )}
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <div className="flex items-center justify-center mb-6">
              <button className="text-[gray]" onClick={() => setStep(2)}>
                <FontAwesomeIcon icon={faCircleLeft} />
              </button>
              <h4 className="flex-grow text-center text-xl font-bold leading-[1.8]">
                Login to your account
              </h4>
              <button className="text-[#146fe6]" onClick={() => setShow(false)}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="inline-block mb-2 font-medium"
              >
                Password
              </label>
              <input
                id="password"
                className="block w-full rounded-full px-3 py-2 bg-[#f6f7f9] border border-[#dee2e6]  leading-[1.8] focus:outline-0 focus:border-[#86b7fe]"
                type="password"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div>
                <button
                  className="px-6 py-1.5 rounded-full w-full leading-[1.8] text-[#2f80ed] underline text-[12.8px] mt-1 text-right"
                  onClick={() => setStep(5)}
                >
                  Forgot Password
                </button>
              </div>
            </div>
            <div className="text-center">
              <button
                className="bg-[#146fe6] px-6 py-2 rounded-full text-white hover:bg-[#1058b7] leading-[1.8]"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div>
            <div className="flex items-center justify-center mb-6">
              <button className="text-[gray]" onClick={() => setStep(2)}>
                <FontAwesomeIcon icon={faCircleLeft} />
              </button>
              <h4 className="flex-grow text-center text-xl font-bold leading-[1.8]">
                Recover your Password
              </h4>
              <button className="text-[#146fe6]" onClick={() => setShow(false)}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="input" className="inline-block mb-2 font-medium">
                Phone number/Email Id
              </label>
              <input
                id="input"
                className="block w-full rounded-full px-3 py-2 bg-[#f6f7f9] border border-[#dee2e6]  leading-[1.8] focus:outline-0 focus:border-[#86b7fe]"
                type="text"
                placeholder="Enter your Email"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>
            <div className="text-center">
              <button
                className="bg-[#146fe6] px-6 py-2 rounded-full text-white hover:bg-[#1058b7] leading-[1.8]"
                onClick={sendOTPForReset}
              >
                Reset Password
              </button>
            </div>
          </div>
        )}
        {step === 6 && (
          <div>
            <div className="flex items-center justify-center mb-6">
              <h4 className="flex-grow text-center text-xl font-bold leading-[1.8]">
                Set a new Password
              </h4>
              <button className="text-[#146fe6]" onClick={() => setShow(false)}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="inline-block mb-2 font-medium"
              >
                Password
              </label>
              <input
                id="password"
                className="block w-full rounded-full px-3 py-2 bg-[#f6f7f9] border border-[#dee2e6]  leading-[1.8] focus:outline-0 focus:border-[#86b7fe]"
                type="password"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="inline-block mb-2 font-medium"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                className="block w-full rounded-full px-3 py-2 bg-[#f6f7f9] border border-[#dee2e6]  leading-[1.8] focus:outline-0 focus:border-[#86b7fe]"
                type="password"
                placeholder="Enter your Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <div className="text-center">
              <button
                className="bg-[#146fe6] px-6 py-2 rounded-full text-white hover:bg-[#1058b7] leading-[1.8]"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </div>
        )}
        {error && (
          <div className="flex w-full h-full my-6 py-4 pr-12 pl-4 relative bg-[#f8d7da] text-[#58151c] rounded-3xl border border-[#f1aeb5] leading-[1.8]">
            {error}
            <button
              className="absolute top-0 right-0 px-5 py-4 text-black opacity-50"
              onClick={() => setError("")}
            >
              <FontAwesomeIcon className="text-2xl font-light" icon={faXmark} />
            </button>
          </div>
        )}
        <div className="text-[12.8px] text-center mt-4 text-gray-400">
          By signing up, you agree to our{" "}
          <Link className="text-[#2f80ed] underline">Terms & Conditions</Link> &{" "}
          <Link className="text-[#2f80ed] underline">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
