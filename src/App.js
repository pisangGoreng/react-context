import React, { createContext, useReducer } from "react"
import "./App.css"

import Login from "./pages/Login"

export const AuthContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action)
      localStorage.setItem("token", JSON.stringify(action.payload.token))
      break

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    token: null,
  })

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Login />
      </div>
    </AuthContext.Provider>
  )
}

export default App
