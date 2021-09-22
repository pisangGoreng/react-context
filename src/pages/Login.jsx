import React, { useState, useContext } from "react"

import { AuthContext } from "../App"

const Login = () => {
  // const { dispatch, state } = useContext(AuthContext)
  const [data, setData] = useState({
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    setData({ ...data, isSubmitting: true })

    event.preventDefault()

    fetch("http://localhost:8080/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.jwt))
        // dispatch({
        //   type: "LOGIN",
        //   payload: "lalal",
        // })
      })
      .catch((error) => setData({ ...data, errorMessage: error }))
      .finally(() => {
        setData({ ...data, isSubmitting: false })
      })
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Login Form</h1>

          <label htmlFor="email">
            <input
              type="text"
              value={data.username}
              onChange={handleInputChange}
              name="username"
              id="username"
            />
          </label>

          <label htmlFor="password">
            <input
              type="text"
              value={data.password}
              onChange={handleInputChange}
              name="password"
              id="password"
            />
          </label>

          <button>{data.isSubmitting ? "LOADING....." : "LOGIN"}</button>
        </form>
      </div>
    </div>
  )
}

export default Login
