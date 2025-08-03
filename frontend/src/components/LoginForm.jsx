import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending login data:', form);
    console.log('Email:', form.email);
    console.log('Password length:', form.password.length);
    try {
      const res = await axios.post("http://localhost:8000/api/users/login/", form);
      console.log("Login Success:", res.data);
      if(res.data.success && res.data.tokens){
        localStorage.setItem('access_token', res.data.tokens.access)
        localStorage.setItem('refresh_token', res.data.tokens.refresh)
      }
      navigate('/')
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex h-[700px] w-full">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          className="md:w-96 w-80 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please sign in to continue
          </p>

          {/* Google Button Placeholder */}
          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="Google Logo"
            />
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90" />
            <p className="text-sm text-gray-500/90">or sign in with email</p>
            <div className="w-full h-px bg-gray-300/90" />
          </div>

          {/* Email Input */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent w-full h-full text-sm placeholder-gray-500/80 outline-none"
              placeholder="Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent w-full h-full text-sm placeholder-gray-500/80 outline-none"
              placeholder="Password"
              required
            />
          </div>

          <div className="w-full flex justify-between mt-6 text-gray-500/80 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              Remember me
            </label>
            <a href="#" className="underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Login
          </button>

          <p className="text-sm text-gray-500/90 mt-4">
            Don’t have an account?{" "}
            <a className="text-indigo-400 hover:underline" href="#">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
