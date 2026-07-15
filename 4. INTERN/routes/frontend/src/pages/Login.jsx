import React, { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    console.log(name);
    console.log(role);
    // alert("Alert you syco ");
    // confirm("Are you sure  ");
    // let x = prompt("Enter number:");
    // console.log(x);

    localStorage.setItem("role", role);
  };

  return (
    <div className="mt-10">
      <h1>Login Page</h1>
      <form>
        <div>
          <label>Name </label>
          <input
            type="text"
            placeholder="Enter your name "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Role </label>
          <input
            type="text"
            placeholder="Enter your role "
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="border border-amber-500 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
