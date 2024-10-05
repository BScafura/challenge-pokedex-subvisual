import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSquareCaretLeft,
  faSquareCaretRight,
  faRulerVertical,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";

export function DetailedPokemon({
  detailedPokemon,
  handleSubmit,
  currentIndex,
  nextPokemon,
  previousPokemon,
  pokemon,
  currentGlobalIndex,
  allPokemon,
  filteredPokemon, // Make sure to pass filteredPokemon as a prop
}) {
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="search-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="search-bar">
          <div className="search-box">
            <button type="submit" className="btn-search">
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Search for a pokemon..."
              id="pokemon"
              name="pokemon"
            />
          </div>
        </div>
      </form>
      <div className="card">
        <div className="pokemon-detailed-img-container">
          <div className="image-container">
            <img
              className="pokemon-detailed-img"
              src={detailedPokemon.sprites?.front_default}
              alt={detailedPokemon.name}
            />
            <p className="pokemon-label">{formatName(detailedPokemon.name)}</p>
          </div>
          <div className="image-container">
            <img
              className="pokemon-detailed-img"
              src={detailedPokemon.sprites?.front_shiny}
              alt={detailedPokemon.name}
            />
            <p className="pokemon-label">
              Shiny {formatName(detailedPokemon.name)}
            </p>
          </div>
        </div>
        <div
          style={{ marginBottom: 10, textAlignLast: "center" }}
          className="pokemon-text"
        >
          <h2 className="pokemon-detailed-name" style={{ marginBottom: 10 }}>
            {formatName(detailedPokemon.name)}
          </h2>
          <div
            className="pokemon-characteristics"
            style={{ display: "flex", gap: 10, justifyContent: "center" }}
          >
            <p>
              <FontAwesomeIcon icon={faRulerVertical}></FontAwesomeIcon>{" "}
              {detailedPokemon.height} dm
            </p>
            <p>
              <FontAwesomeIcon icon={faWeightHanging}></FontAwesomeIcon>{" "}
              {detailedPokemon.weight} hg
            </p>
          </div>
          <p>
            <strong style={{ fontSize: 20 }}>Abilities:</strong>{" "}
            {detailedPokemon.abilities.map((ability, index) => (
              <p className="pokemon-abilities" key={index}>
                {ability.ability.name}
              </p>
            ))}
          </p>
          <div className="stats-container">
            <p style={{ marginBottom: 0, fontWeight: "bold", fontSize: 20 }}>
              Basic Stats:
            </p>
            {detailedPokemon.stats.map((stat, index) => (
              <div className="stats-number" key={index}>
                <p style={{ margin: 0 }}>
                  <strong>{stat.stat.name}</strong> : {stat.base_stat}
                </p>
                <div className="progress-bar" dataStats={stat.stat.name}>
                  <progress value={stat.base_stat} max={"200"}></progress>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="control-buttons">
        <button onClick={previousPokemon} className="control-btn-previous">
          <FontAwesomeIcon icon={faSquareCaretLeft}></FontAwesomeIcon>
        </button>
        <button onClick={nextPokemon} className="control-btn-next">
          <FontAwesomeIcon icon={faSquareCaretRight}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
