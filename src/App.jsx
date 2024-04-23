import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(0);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  //ref hooke
  const passswordRef = useRef(null);
  const passswordGenerrator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    passswordRef.current?.select();
  // passswordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passswordGenerrator();
  }, [length, numberAllowed, charAllowed, passswordGenerrator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounder=lg px-4 my-8 text-orange-500 bg-gray-900 " style={{marginTop:"220px",padding:'30px',borderRadius:'24px'}}>
      <h1 className="text-white text-center my-3" style={{backgroundColor:"white" , color:"red", fontSize:"25px", borderRadius:"30px", marginBottom:"50px"}}>passsword Generator </h1>
      <input
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder="Password"
        readOnly
        ref={passswordRef}
      />
      <button
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shink-0" style={{marginBottom:"20px"}}
        onClick={copyPasswordtoClipboard}
      >
        Copy
      </button>
      <div className="flex tex-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label>Length{length}</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberinput"
            onChange={() => {
              setnumberAllowed((prev) => !prev);
            }}
          />
          <label>Number</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characters"
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
