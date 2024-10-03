import { useState, useEffect } from "react";
import { Pokemon } from "./Pokemon";
import { Header } from "./Header";
import { Title } from "./Title";
import { DetailedPokemon } from "./DetailedPokemon";
import { Footer } from "./Footer";

function App() {
  const [allPokemon, setAllPokemon] = useState([]); // State to store all Pokémon for filtering
  const [filteredPokemon, setFilteredPokemon] = useState([]); // State to store filtered Pokémon based on search
  const [detailedPokemon, setDetailedPokemon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch a large list of Pokémon (names and URLs only)
  async function getAllPokemon() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=649"); // Fetch a batch of Pokémon
    const data = await res.json();
    setAllPokemon(data.results); // Store basic Pokémon info (name and URL)
    await getDetailedPokemon(data.results); // Fetch detailed info for all Pokémon
  }

  // Fetch detailed Pokémon data (ID, sprites, etc.) for filtered results
  async function getDetailedPokemon(pokemonList) {
    const detailedPokemonPromises = pokemonList.map(async (poke) => {
      const res = await fetch(poke.url); // Fetch each Pokémon's detailed data using its URL
      return res.json(); // Return detailed Pokémon data
    });

    const detailedPokemon = await Promise.all(detailedPokemonPromises); // Wait for all requests to complete
    setFilteredPokemon(detailedPokemon); // Set detailed Pokémon data
  }

  // Handle form submission and filtering
  function handleSubmit(event) {
    event.preventDefault();
    setDetailedPokemon(null);
    const formData = new FormData(event.target); // Get form data
    const searchTerm = formData.get("pokemon").toLowerCase(); // Get the search term and make it lowercase for comparison

    if (searchTerm) {
      // Filter Pokémon whose name contains the search term
      const filteredList = allPokemon.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm)
      );
      if (filteredList.length > 0) {
        // If there are matching Pokémon, fetch their details
        getDetailedPokemon(filteredList);
      } else {
        // If no matching Pokémon, show an alert
        alert("There is no such Pokémon in our database!");
      }
    } else {
      // If no search term (empty search), show all Pokémon
      getDetailedPokemon(allPokemon);
    }
  }

  // Function to go to the next Pokémon
  const nextPokemon = () => {
    if (currentIndex < filteredPokemon.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setDetailedPokemon(filteredPokemon[currentIndex + 1]);
    }
  };

  // Function to go to the previous Pokémon
  const previousPokemon = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setDetailedPokemon(filteredPokemon[currentIndex - 1]);
    }
  };

  useEffect(() => {
    getAllPokemon(); // Fetch the list of all Pokémon when the component mounts
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Title></Title>
      {detailedPokemon ? ( // Conditionally render DetailedPokemon or the search interface
        <DetailedPokemon
          detailedPokemon={detailedPokemon}
          pokemon={filteredPokemon}
          handleSubmit={handleSubmit}
          nextPokemon={nextPokemon}
          previousPokemon={previousPokemon}
          currentIndex={currentIndex}
        />
      ) : (
        <Pokemon
          pokemon={filteredPokemon}
          handleSubmit={handleSubmit}
          setDetailedPokemon={setDetailedPokemon}
          detailedPokemon={detailedPokemon} // Pass the setter function
        />
      )}
      <Footer></Footer>
    </div>
  );
}

export default App;
