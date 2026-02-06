import React, { useState } from "react";

const App = () => {
  const [username, setUsername] = useState("Guest");
  const ages = [
    { index: "newAge", value: 20 },
    { index: "youngAge", value: 17 },
  ];
  const sumOfAges = ages.reduce((sum, age) => sum + age.value, 0);
  const averageAge = sumOfAges / ages.length

  const submit = (e) =>{ e.preventDefault()
    alert(`Hello ${username}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setValue(""); 
    }
  };



  const handleChange = (e) => {
    setUsername(e.target.value)
    e.preventDefault()
  }

  return (
    <>
      <div className="text-5xl">
        <p>Hello {username}</p>
        </div>
      <form onSubmit={submit} className="flex flex-col gap-2 mt-3">
        <label>Type Name Here</label>
        <input
          className="border-2 rounded-md p-2"
          type="text"
          value={username}
          placeholder="Type Name Here"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </form>

      <p>
        {ages.map((age) => (
          <div key={age.index}>{age.value}</div>
        ))}
      </p>
      <p>
        {ages.map((age) => (
          <div key={age.index}>
            {age.value >= 18 ? "You are an adult" : "You are a minor"}
          </div>
        ))}
      </p>
      <p>The sum of all ages is: {sumOfAges}</p>
      <ul>
        <li>The average age is: {averageAge}</li>
      </ul>
    </>
  );
};

export default App;
