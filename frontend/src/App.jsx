import React, { useState } from "react";

import './App.css'
import { UseOrganiseFics } from "./hooks/UseOrganiseFics";

import { Wrapped } from "./components/Wrapped";


function App() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null)

  const handleUserChange = (event) => {
    setUser(event.target.value);  // Update the user state with the input value
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);  // Update the password state with the input value
  };

  const handleGetFics = () => {
    const input = [user, password]
    setOutput("Loading Ao3 Fic Data. This will take a while.")
    setUser('')
    setPassword('')

    fetch("http://127.0.0.1:5000/run-python", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: input }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the backend");
        }
        return response.json(); // Parse JSON response
      })
      .then(data => {
        setOutput("Presenting Wrapped"); // Use the parsed data
        setProfileData(UseOrganiseFics(data))
      })
      .catch(err => {
        setOutput('')
        setError("An unexpected error occurred. Please ensure you have entered the correct username and password");
        console.error(err); // Log the error for debugging
      });
  };



  return (
    <div>
      <input type="text" value={user} onChange={handleUserChange} placeholder="username"/>
      <br />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="password"/>
      <br />
      <button onClick={handleGetFics}>Get Fics</button>
      {output && <pre>{JSON.stringify(output, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profileData && <Wrapped profileData={profileData} ficList={ficList}/>}
        
    </div>
  );
}

export default App;