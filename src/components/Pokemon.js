import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export function Pokemon({
  pokemon,
  handleSubmit,
  setDetailedPokemon,
  loading,
}) {
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
        <p>Now Loading...</p>
      </div>
    );
  }

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
      <div className="pokemon-container">
        <ul className="pokemon-list">
          {pokemon.map((poke, index) => (
            <li
              onClick={() => setDetailedPokemon(poke)}
              className="card"
              key={index}
            >
              <div className="pokemon-info">
                <div className="pokemon-text">
                  <p className="pokemon-info-number-name">
                    <span style={{ fontWeight: "bold" }}>#{poke.id}</span>{" "}
                    {formatName(poke.name)}
                  </p>
                  {poke.types && poke.types.length > 0 && (
                    <div className="pokemon-types">
                      {poke.types.map((typeObj, typeIndex) => (
                        <p
                          key={typeIndex}
                          className={`pokemon-type ${typeObj.type.name}`}
                        >
                          {typeObj.type.name} {/* Accessing the type name */}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                {poke.sprites?.front_default && (
                  <img
                    className="pokemon-img"
                    src={poke.sprites.front_default}
                    alt={poke.name}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
