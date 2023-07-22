import React, { useEffect, useState } from "react";

function App() {
  const [seasons, setSeasons] = useState(null);
  const [inputtedSeason, setInputtedSeason] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasons = async () => {
      const response = await fetch("/api/seasons");
      const json = await response.json();

      if (response.ok) {
        setSeasons(json);
      }
    };

    fetchSeasons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const season = { season: inputtedSeason };

    const response = await fetch("/api/seasons", {
      method: "POST",
      body: JSON.stringify(season),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setInputtedSeason("");
      setError(null);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const response = await fetch("/api/seasons/" + id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="number" onChange={(e) => setInputtedSeason(e.target.value)} value={inputtedSeason} />
        <button>Add</button>
        {error && <div>{error}</div>}
      </form>
      {seasons &&
        seasons.map((season) => (
          <div key={season._id}>
            {season.season}
            <button onClick={() => handleDelete(season._id)}>X</button>
          </div>
        ))}
    </div>
  );
}

export default App;
