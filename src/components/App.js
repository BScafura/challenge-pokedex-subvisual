import { useState, useEffect } from "react";
import { Pokemon } from "./Pokemon";
import { Header } from "./Header";
import { Title } from "./Title";
import { DetailedPokemon } from "./DetailedPokemon";
import { Footer } from "./Footer";

function App() {
  // States
  const [allPokemon, setAllPokemon] = useState([]); // State to store all Pokémon for filtering
  const [loading, setLoading] = useState(false); // State to store
  const [filteredPokemon, setFilteredPokemon] = useState([]); // State to store filtered Pokémon based on search
  const [detailedPokemon, setDetailedPokemon] = useState(null); // State to store more detailed Pokemon information
  const [currentIndex, setCurrentIndex] = useState(0); // State to store the current index for filtering Pokemon
  const [currentPage, setCurrentPage] = useState(1); // State to store the current page for paginatio
  const [pokemonPerPage, setPokemonPerPage] = useState(30); // State to store the number of Pokémon per pages

  const lastPokemonIndex = currentPage * pokemonPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(
    firstPokemonIndex,
    lastPokemonIndex
  );

  // Functions

  // Fetch a large list of Pokémon (names and URLs only)
  async function getAllPokemon() {
    setLoading(true);
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=649"); // Fetch a batch of Pokémon
    const data = await res.json();
    setAllPokemon(data.results); // Store basic Pokémon info (name and URL)
    await getDetailedPokemon(data.results); // Fetch detailed info for all Pokémon
    setLoading(false);
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
  async function handleSubmit(event) {
    event.preventDefault();
    await setDetailedPokemon(null);
    const formData = new FormData(event.target); // Get form data
    const searchTerm = formData.get("pokemon").toLowerCase(); // Get the search term and make it lowercase for comparison

    if (searchTerm) {
      // Filter Pokémon whose name contains the search term
      const filteredList = allPokemon.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm)
      );
      if (filteredList.length > 0) {
        // If there are matching Pokémon, fetch their details
        await getDetailedPokemon(filteredList);
      } else {
        // If no matching Pokémon, show an alert
        alert("There is no such Pokémon in our database!");
      }
    } else {
      // If no search term (empty search), show all Pokémon
      await getDetailedPokemon(allPokemon);
    }
  }

  // Function to go to the next Pokémon
  const nextPokemon = async () => {
    if (currentIndex < filteredPokemon.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setDetailedPokemon(filteredPokemon[currentIndex + 1]);
    }
  };

  // Function to go to the previous Pokémon
  const previousPokemon = async () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setDetailedPokemon(filteredPokemon[currentIndex - 1]);
    }
  };

  // Function to handle change page event
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <>
          <Pokemon
            pokemon={currentPokemon}
            handleSubmit={handleSubmit}
            setDetailedPokemon={setDetailedPokemon}
            detailedPokemon={detailedPokemon} // Pass the setter function
            loading={loading}
          />
          <Pagination
            pokemonPerPage={pokemonPerPage}
            totalPokemon={filteredPokemon.length}
            paginate={paginate}
          ></Pagination>
        </>
      )}

      <Footer></Footer>
    </div>
  );
}

function Pagination({ pokemonPerPage, totalPokemon, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemon / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        className="pagination"
        style={{ justifyContent: "center", marginTop: 20 }}
      >
        {pageNumbers.map((number) => (
          <li key={number} className={"page-item"}>
            <a
              style={{ color: "black" }}
              href="!#"
              className="page-link"
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default App;
