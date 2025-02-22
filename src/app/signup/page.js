"use client";
import { useState } from 'react';
const page = () =>{
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selected option: ${selectedOption}`);
  };
  return(
    <div className="flex w-screen h-screen bg-green-300 justify-center items-center">
      <form className="text-black h-[20rem] w-[20rem] bg-white">
        <label>Email</label>
        <input type="string" id="email" name="email" placeholder="Enter your email"/><br/><br/>
        <label>Password</label>
        <input type="string" id="password" name="password" placeholder="Enter your Password"/><br/><br/>
        <label>First Name</label>
        <input type="string" id="firstname" name="firstname" placeholder="Enter your First Name"/><br/><br/>
        <label>Last Name</label>
        <input type="string" id="lastname" name="lastname" placeholder="Enter your lastname"/><br/><br/>
        <select onChange={(e) => setSelectedOption(e.target.value)} required>
        <option value="">Select an option</option>
        <option value="Normal">Normal</option>
        <option value="Waste">Cleaning Community</option>
      </select>
      </form>
    </div>
  )
}
export default page;
