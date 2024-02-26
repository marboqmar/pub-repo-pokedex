import './App.css'
import axios from 'axios';
import { Pokemon, PokemonFromApi } from './models';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiURL, getImage } from './assets/utils.tsx'

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

// Call API, use parser and safe info to 'pokemons', search functionality, fav functionality
export const App = () => {
    // Call API, use parser and safe info to 'pokemons'
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            const response: Pokemon[] = await axios.get(apiURL);
            setPokemonList(mapPokemonApiToPokemonView(response.data.results));
            setPokemons(mapPokemonApiToPokemonView(response.data.results));
        };

        fetchPokemons();
    }, []);

    // Search functionality
    const handleSearchBar = (event: Pokemon[]) => {
        const pokemonSearch: Pokemon[] = pokemonList.filter((pokemon: Pokemon) => {
            return pokemon.name.includes(event.target.value);
        })
        setPokemons(pokemonSearch)
    };

    // Fav functionality
    const handlePokemonClick = (pokemonId: number) => {
        const newPokemonsMap: Pokemon[] = pokemons.map((pokemonInfo: Pokemon) => {
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
            <input id={'searchBar'} type={'text'} onChange={handleSearchBar} placeholder={'Find your favourite pokemon!'} />
            <div className={'pokemons'}>
                {pokemons.map((pokemon: Pokemon) => (
                    <Link className={'link'} key={pokemon.id} to={`/pokemon/${pokemon.name}`}>
                        <div className={'pokemon'}>
                            <img src={pokemon.imageUrl} />
                            <p>{pokemon.name}</p>
                            <i
                                className={pokemon.isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
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
