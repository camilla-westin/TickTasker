"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage("Error", response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h1>Create new user</h1>
        <label>Full Name</label>
        <input
          id="name"
          name="name"
          onChange={handleChange}
          required={true}
          value={formData.name}
          type="text"
        />

        <label>Email</label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          required={true}
          value={formData.email}
          type="text"
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          type="password"
        />
        <input type="submit" value="Create user" className="bg-blue-300" />
      </form>
      <p>{errorMessage}</p>
    </div>
  );
};

export default UserForm;
