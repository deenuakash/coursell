import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

const Login = () => {
  const { setShow } = useContext(ModalContext);
  return (
    <div className="relative h-[80vh]">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <p className="font-bold text-2xl text-center">
          Login to view this page
        </p>
        <div className="text-center">
          <button
            className="mt-6 underline text-[#146fe6] text-center"
            onClick={() => setShow(true)}
          >
            Click here to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
