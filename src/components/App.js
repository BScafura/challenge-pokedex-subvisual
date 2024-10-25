import { useState, useEffect, useRef } from "react";
import { Pokemon } from "./Pokemon";
import { Header } from "./Header";
import { Title } from "./Title";
import { DetailedPokemon } from "./DetailedPokemon";
import { Footer } from "./Footer";
import { Pagination } from "./Pagination";

function App() {
  // States
  const [allPokemon, setAllPokemon] = useState([]); // State to store all Pokémon for filtering
  const [loading, setLoading] = useState(false); // State to store
  const [filteredPokemon, setFilteredPokemon] = useState([]); // State to store filtered Pokémon based on search
  const [detailedPokemon, setDetailedPokemon] = useState(null); // State to store more detailed Pokemon information
  const [currentIndex, setCurrentIndex] = useState(0); // State to store the current index for filtering Pokemon
  const [currentPage, setCurrentPage] = useState(1); // State to store the current page for pagination
  const [currentGlobalIndex, setCurrentGlobalIndex] = useState(0);
  const [pokemonPerPage, setPokemonPerPage] = useState(30); // State to store the number of Pokémon per pages
  const [music, setMusic] = useState(true); // Music state

  const audioRef = useRef(null); // Use ref to persist the audio object

  const lastPokemonIndex = currentPage * pokemonPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(
    firstPokemonIndex,
    lastPokemonIndex
  );

  // Functions
  // Function to play or pause music
  function playMusic() {
    if (music) {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause the audio
      }
    }
  }

  function controlMusic() {
    setMusic((prevMusic) => {
      const newMusicState = !prevMusic;
      if (newMusicState) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
      return newMusicState;
    });
  }

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
    event.preventDefault(); // Prevent the default form submission behavior
    await setDetailedPokemon(null); // Reset detailed Pokémon information
    const formData = new FormData(event.target); // Get form data
    const searchTerm = formData.get("pokemon").toLowerCase(); // Get the search term and make it lowercase for comparison

    if (searchTerm) {
      // Filter Pokémon whose name contains the search term
      const filteredList = allPokemon.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm)
      );

      if (filteredList.length > 0) {
        // If there are matching Pokémon, fetch their details
        await getDetailedPokemon(filteredList); // Fetch detailed data for filtered Pokémon

        // Set the current index and global index based on the first matching Pokémon
        const firstMatch = filteredList[0]; // Get the first matching Pokémon
        const globalIndex = allPokemon.findIndex(
          (poke) => poke.name === firstMatch.name
        ); // Find its index in the global dataset
        setCurrentGlobalIndex(globalIndex); // Set the global index to the first match
        setCurrentIndex(0); // Reset the current index for filtered Pokémon
      } else {
        // If no matching Pokémon, show an alert
        alert("There is no such Pokémon in our database!");
      }
    } else {
      // Reset indices for an empty search (show all Pokémon)
      setCurrentIndex(0); // Reset filtered index
      setCurrentGlobalIndex(0); // Reset global index
      await getDetailedPokemon(allPokemon); // Fetch detailed data for all Pokémon
    }
  }

  // Function to go to the next Pokémon
  const nextPokemon = async () => {
    if (currentGlobalIndex < allPokemon.length - 1) {
      const nextGlobalIndex = currentGlobalIndex + 1; // Move to the next Pokémon in the global list
      setCurrentGlobalIndex(nextGlobalIndex); // Update the global index
      const nextPokemonDetails = await fetchPokemonDetails(
        allPokemon[nextGlobalIndex].url
      ); // Fetch the next Pokémon
      setDetailedPokemon(nextPokemonDetails); // Update the detailed Pokémon
    }
  };

  const previousPokemon = async () => {
    if (currentGlobalIndex > 0) {
      const prevGlobalIndex = currentGlobalIndex - 1; // Move to the previous Pokémon in the global list
      setCurrentGlobalIndex(prevGlobalIndex); // Update the global index
      setCurrentIndex((prevIndex) => prevIndex - 1); // Update current index for filtered Pokémon
      const prevPokemonDetails = await fetchPokemonDetails(
        allPokemon[prevGlobalIndex].url
      ); // Fetch the previous Pokémon
      setDetailedPokemon(prevPokemonDetails); // Update the detailed Pokémon
    }
  };

  // Function to fetch Pokémon details by URL
  const fetchPokemonDetails = async (url) => {
    const res = await fetch(url);
    return await res.json();
  };

  // Function to handle change page event
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    audioRef.current = new Audio(process.env.PUBLIC_URL + "/music.mp3"); // Initialize the audio object only once
    audioRef.current.loop = true; // Set to loop the music

    // Start playing music immediately if the initial state is true
    if (music) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio on mount:", error);
      });
    }

    getAllPokemon(); // Fetch the list of all Pokémon when the component mounts

    // Clean up the audio when the component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Effect to handle changes in the music state
  useEffect(() => {
    playMusic(); // Play or pause music when the 'music' state changes
  }, [music]);

  return (
    <div className="App">
      <Header controlMusic={controlMusic} music={music}></Header>
      <Title></Title>
      {detailedPokemon ? ( // Conditionally render DetailedPokemon or the search interface
        <DetailedPokemon
          detailedPokemon={detailedPokemon}
          pokemon={filteredPokemon}
          handleSubmit={handleSubmit}
          nextPokemon={nextPokemon}
          previousPokemon={previousPokemon}
          currentIndex={currentIndex}
          currentGlobalIndex={currentGlobalIndex}
          allPokemon={allPokemon}
          filteredPokemon={filteredPokemon} // Pass the filtered list
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

export default App;
