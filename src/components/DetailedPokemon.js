import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSquareCaretLeft,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";

export function DetailedPokemon({
  detailedPokemon,
  handleSubmit,
  currentIndex,
  nextPokemon,
  previousPokemon,
  pokemon,
}) {
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  return (
    <div className="search-container">
      {" "}
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
            <p className="pokemon-label">{formatName(detailedPokemon.name)}</p>{" "}
            {/* Label for normal form */}
          </div>
          <div className="image-container">
            <img
              className="pokemon-detailed-img"
              src={detailedPokemon.sprites?.front_shiny}
              alt={detailedPokemon.name}
            />
            <p className="pokemon-label">
              Shiny {formatName(detailedPokemon.name)}
            </p>{" "}
          </div>
        </div>
        <div style={{ marginBottom: 10 }} className="pokemon-text">
          <h2 className="pokemon-detailed-name">
            {formatName(detailedPokemon.name)}
          </h2>
          <div className="pokemon-characteristics">
            <p>
              <strong>Height:</strong> {detailedPokemon.height} decimeters
            </p>
            <p>
              <strong>Weight:</strong> {detailedPokemon.weight} hectograms
            </p>
            <p>
              <strong>Abilities:</strong>{" "}
              {detailedPokemon.abilities.map((ability, index) => (
                <span key={index}>{ability.ability.name}</span>
              ))}
            </p>
          </div>
          <div className="stats-container">
            <p style={{ marginBottom: 0, fontWeight: "bold" }}>Basic Stats:</p>{" "}
            {detailedPokemon.stats.map((stat, index) => (
              <div className="stats-number">
                <p style={{ margin: 0 }} key={index}>
                  {stat.stat.name}
                  {": "}
                  {stat.base_stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="control-buttons">
        <button
          onClick={previousPokemon}
          disabled={currentIndex === 0}
          className="control-btn-previous"
        >
          <FontAwesomeIcon icon={faSquareCaretLeft}></FontAwesomeIcon>
        </button>
        <button
          onClick={nextPokemon}
          disabled={currentIndex === pokemon.length - 1}
          className="control-btn-next"
        >
          <FontAwesomeIcon icon={faSquareCaretRight}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
