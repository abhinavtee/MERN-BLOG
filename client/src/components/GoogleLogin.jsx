import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helpers/firebase";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { RouteIndex } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { setUser } from "@/redux/user/user.slice";
import { useDispatch } from "react-redux";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const googleRespone = await signInWithPopup(auth, provider);
    const user = googleRespone.user;
    const bodyData = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    };
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      showToast("success", data.message);
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <Button variant="outline" className="width-full" onClick={handleLogin}>
      <FcGoogle />
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;
