import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/userReducers/userSlice.js";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // const [error, setError] = useState(null);
  // const [loading, setloading] = useState(false);

  // const { loading, error } = useSelector((state) => state.user);      // both are same
  const { loading, error } = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // setloading(true);
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (data.success == false) {
        // setloading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }

      // setloading(false);
      // setError(null);
      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      // setloading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className=" border p-3 rounded-lg"
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <input
          className=" border p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
          autoComplete="off"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don't Have an account? </p>
        <Link to={"/sign-up"}>
          <span className=" text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className=" text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignIn;
