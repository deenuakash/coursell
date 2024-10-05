import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [fullName, setFullName] = useState({ value: "", disable: false });
  const [email, setEmail] = useState({ value: "", disable: false });
  const [phone, setPhone] = useState({ value: "", disable: false });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const uri = import.meta.env.VITE_SERVER_ENDPOINT;

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get(`${uri}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return res.data;
    },
  });

  const { mutate: saveProfileMutation } = useMutation({
    mutationFn: async () => {
      const res = await axios.put(
        `${uri}/api/user/updateProfile`,
        { email: email.value, fullName: fullName.value, phone: phone.value },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      refetch();
      toast.success("Profile Saved!", {
        position: "bottom-right",
        autoClose: 5000,
      });
    },
    onError: (err) => {
      toast.error(err.response.data.error[0].message, {
        position: "bottom-right",
        autoClose: 5000,
      });
    },
  });

  const { mutate: changePasswordMutation } = useMutation({
    mutationFn: async () => {
      const res = await axios.put(
        `${uri}/api/user/changePassword`,
        {
          password,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Password Updated!", {
        position: "bottom-right",
        autoClose: 5000,
      });
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err) => {
      const error = err.response.data;
      toast.error(error.message ? error.message : error.error[0].message, {
        position: "bottom-right",
        autoClose: 5000,
      });
    },
  });

  const handleSaveProfile = () => {
    saveProfileMutation();
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords are not matching", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } else {
      changePasswordMutation();
    }
  };

  useEffect(() => {
    if (data?.user) {
      setEmail({ value: data.user.email, disable: !!data.user.email });
      setFullName({ value: data.user.fullName, disable: !!data.user.fullName });
      setPhone({ value: data.user.phone, disable: !!data.user.phone });
    }
  }, [data]);

  return (
    <>
      <div className="w-full lg:w-[70%] 2xl:w-[50%]">
        <div className="border-b mb-6">
          <button
            className={`py-2 pl-1 pr-4 text-center leading-[1.8] ${
              activeTab === "general"
                ? "text-[#146fe6] border-b-4 border-[#146fe6] font-bold"
                : "border-b-0"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`py-2 pl-1 pr-4 text-center leading-[1.8] ${
              activeTab === "security"
                ? "text-[#146fe6] border-b-4 border-[#146fe6] font-bold"
                : "border-b-0"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            {activeTab === "general" && (
              <div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 font-medium leading-[1.8]"
                  >
                    Full Name
                    <span className="text-red-400 font-semibold"> *</span>
                  </label>
                  <input
                    id="fullName"
                    className={`py-2 px-3 border rounded-3xl w-full bg-[#f6f7f9] leading-[1.8] border-[#dee2e6] focus:border-[#86b7fe] focus:outline-0 ${
                      fullName.disable
                        ? "text-[#b2b2b2] bg-[#e9ecef] cursor-not-allowed"
                        : ""
                    }`}
                    type="text"
                    placeholder="Enter Full Name"
                    value={fullName.value}
                    disabled={fullName.disable}
                    onChange={(e) =>
                      setFullName((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium leading-[1.8]"
                  >
                    Email Address
                    <span className="text-red-400 font-semibold"> *</span>
                  </label>
                  <input
                    id="email"
                    className={`py-2 px-3 border rounded-3xl w-full bg-[#f6f7f9] leading-[1.8] border-[#dee2e6] focus:border-[#86b7fe] focus:outline-0 ${
                      email.disable
                        ? "text-[#b2b2b2] bg-[#e9ecef] cursor-not-allowed"
                        : ""
                    }`}
                    type="text"
                    placeholder="Enter Email Address"
                    value={email.value}
                    onChange={(e) =>
                      setEmail((prev) => ({ ...prev, value: e.target.value }))
                    }
                    disabled={email.disable}
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 font-medium leading-[1.8]"
                  >
                    Phone number
                    <span className="text-red-400 font-semibold"> *</span>
                  </label>
                  <input
                    id="phone"
                    className={`py-2 px-3 border rounded-3xl w-full bg-[#f6f7f9] leading-[1.8] border-[#dee2e6] focus:border-[#86b7fe] focus:outline-0 ${
                      phone.disable
                        ? "text-[#b2b2b2] bg-[#e9ecef] cursor-not-allowed"
                        : ""
                    }`}
                    type="text"
                    placeholder="Enter Phone number"
                    value={phone.value}
                    onChange={(e) =>
                      setPhone((prev) => ({ ...prev, value: e.target.value }))
                    }
                    disabled={phone.disable}
                  />
                </div>
                <div className="mt-12 text-white text-center font-medium">
                  <button
                    className={`px-12 py-2 bg-[#146fe6] rounded-3xl leading-[1.8] ${
                      fullName.disable && email.disable && phone.disable
                        ? "bg-[#146fe68f]"
                        : ""
                    }`}
                    disabled={
                      fullName.disable && email.disable && phone.disable
                    }
                    onClick={handleSaveProfile}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            )}
            {activeTab === "security" && (
              <div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="password"
                    className="block mb-2 font-medium leading-[1.8]"
                  >
                    Current Password
                    <span className="text-red-400 font-semibold"> *</span>
                  </label>
                  <input
                    id="password"
                    className="py-2 px-3 border rounded-3xl w-full bg-[#f6f7f9] leading-[1.8] border-[#dee2e6] focus:border-[#86b7fe] focus:outline-0"
                    type="password"
                    placeholder="Enter your current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 font-medium leading-[1.8]"
                  >
                    New Password
                    <span className="text-red-400 font-semibold"> *</span>
                  </label>
                  <input
                    id="newPassword"
                    className="py-2 px-3 border rounded-3xl w-full bg-[#f6f7f9] leading-[1.8] border-[#dee2e6] focus:border-[#86b7fe] focus:outline-0"
                    type="password"
                    placeholder="Enter new Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 font-medium leading-[1.8]"
                  >
                    Confirm new Password
                    <span className="text-red-400 font-semibold"> *</span>
                  </label>
                  <input
                    id="confirmPassword"
                    className="py-2 px-3 border rounded-3xl w-full bg-[#f6f7f9] leading-[1.8] border-[#dee2e6] focus:border-[#86b7fe] focus:outline-0"
                    type="password"
                    placeholder="Confirm your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mt-12 text-white text-center font-medium">
                  <button
                    className="px-12 py-2 bg-[#146fe6] rounded-3xl leading-[1.8]"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;
