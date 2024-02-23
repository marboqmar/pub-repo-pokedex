import './App.css'
import axios from 'axios';
import {Pokemon, PokemonFromApi} from './models';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export const getImage = (number: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
};

// Parser
export const mapPokemonApiToPokemonView = (pokemon: PokemonFromApi[]): Pokemon[] => {
    return pokemon.map((pokemonItem: PokemonFromApi, index: number) => {
        return {
            name: pokemonItem.name,
            imageUrl: getImage(index + 1),
            id: index + 1,
            isFav: false,
        };
    });
};

// Call API, use parser and safe info to "pokemons", handle fav functionality
export const App = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [hasDiscoveredFav, setHasDiscoveredFav] = useState(false);

    useEffect(() => {
        const fetchPokemons = async () => {
            const response = await axios.get(apiURL);
            setPokemons(mapPokemonApiToPokemonView(response.data.results));
        };

        fetchPokemons();
    }, []);

    const handlePokemonClick = (pokemonId: number) => {
        setHasDiscoveredFav(true);

        const newPokemonsMap = pokemons.map((pokemonInfo: Pokemon) => {
            if (pokemonId === pokemonInfo.id) {
                const newPokemonInfo = { ...pokemonInfo };
                newPokemonInfo.isFav = !pokemonInfo.isFav;
                return newPokemonInfo;
            }

            return pokemonInfo;
        });

        setPokemons(newPokemonsMap);
    };

    return (
        <>
            <input className="search" type="text" placeholder="Escribe para buscar" />
            <div className="pokemons">
                {pokemons.map((pokemon: Pokemon) => (
                    <Link key={pokemon.id} to={`/pokemon/${pokemon.name}`}>
                        <div className="pokemon">
                            <img src={pokemon.imageUrl} />
                            <p>{pokemon.name}</p>
                            <i
                                className={pokemon.isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();

                                    handlePokemonClick(pokemon.id);
                                }}
                                style={{color: pokemon.isFav? 'red' : 'black'}}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};
