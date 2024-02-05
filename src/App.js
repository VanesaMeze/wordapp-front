import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [word, setWord] = useState("");
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/rankings", {
        word,
      });
      setScore(response.data.score);
      setError(null);
    } catch (error) {
      setScore(null);
      setError("Invalid word or server error.");
    }
  };

  return (
    <div className="App">
      <h1>Word Game</h1>
      <form
        onSubmit={handleSubmit}
        className="container"
        style={{ width: "500px", alignItems: "center" }}
      >
        <label>
          <div className="form-floating">
            <input
              className="form-control"
              type="text"
              size="50"
              value={word}
              placeholder="Enter a word"
              onChange={handleWordChange}
            />
            <label htmlFor="floatingInput" style={{ color: "slateGrey" }}>
              Enter your word
            </label>
          </div>
          <> </>
          <br></br>
          <button
            className="button btn-outline-secondary d-inline-flex align-items-center"
            type="submit"
          >
            Submit
          </button>
        </label>
      </form>
      <br></br>
      {score !== null && (
        <div>
          <p>Score: {score}</p>
        </div>
      )}
      {error && (
        <p style={{ color: "red", fontWeight: "200", fontSize: "20px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default App;
