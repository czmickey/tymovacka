import React, { useState } from "react";

const getRandomIndex = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const App = () => {
  const [value, setValue] = useState("");
  const [teams, setTeams] = useState([]);

  const getPlayersFromList = list => list.split("\n");

  const generateTeams = playersList => {
    setTeams([]);
    const maybeEmptyPlayers = getPlayersFromList(playersList);
    const players = maybeEmptyPlayers.filter(name => name.trim() !== "");

    if (players.length < 2) {
      alert("Zadej více hráčů ;)");
    } else {
      const playersPerTeam = Math.floor(players.length / 2);
      const team = [];

      for (let i = 0; i < playersPerTeam; i++) {
        const randomIndex = getRandomIndex(players.length);
        team.push(players[randomIndex]);
        players.splice(randomIndex, 1);
      }

      setTeams([team, players]);
    }
  };

  if (value.trim() === "") {
    const urlParams = new URLSearchParams(window.location.search);
    const playersFromUrl = urlParams.get("players");

    if (playersFromUrl !== null && playersFromUrl !== "") {
      const playersList = playersFromUrl.replace(/,/g, "\n");
      setValue(playersList);

      if (getPlayersFromList(playersList).length > 1) {
        generateTeams(playersList);
      }
    }
  }

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    generateTeams(value);
  };

  return (
      <div className="App">
        <h1>Týmovačka</h1>
        {value !== "" && teams.length > 0 && (
            <>
              Celkem hráčů:{" "}
              <strong>
                {teams.reduce((acc, current) => acc + current.length, 0)}
              </strong>
              <ol>
                {teams.map((team, index) => {
                  const itemKey = index;
                  return <li key={itemKey}>{team.join(", ")}</li>;
                })}
              </ol>
            </>
        )}
        <form onSubmit={handleSubmit}>
          <textarea rows="10" cols="30" onChange={handleChange} value={value} />
          <br />
          <button type="submit">Losovat</button>
        </form>
      </div>
  );
}

export default App;
