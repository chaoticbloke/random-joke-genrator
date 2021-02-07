import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

function App() {
  const url = "https://official-joke-api.appspot.com/random_ten";
  const [data, setData] = useState([]);
  const [jokes, setJokes] = useState([]);
  const [count, setCount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside handle submit");
  };

  const fetchJokes = async (url) => {
    const response = await fetch(url);
    const finalResponse = await response.json();
    setData(finalResponse);
  };
  useEffect(() => {
    fetchJokes(url);
  }, []);
  const generatePara = (num) => {
    if (count < 0) num = 0;
    if (count > data.length) num = data.length;
    setJokes(data.slice(0, num));
  };
  return (
    <main>
      <section className="section-center">
        <h2>Random Joke Generator</h2>

        <form onSubmit={handleSubmit} className="lorem-form">
          <label htmlFor="number">How many?</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <button className="btn" onClick={() => generatePara(count)}>
            Generate
          </button>
        </form>

        <article className="article">
          {jokes.map((item) => {
            const { setup, punchline, id } = item;
            return (
              <div key={id}>
                <p>{setup}</p>
                <p>{punchline}</p>
                <hr />
              </div>
            );
          })}
        </article>
      </section>
    </main>
  );
}

export default App;
