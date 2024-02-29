import './App.css'
import axios from 'axios';
import { PokemonListItem, PokemonListItemFromApi } from './assets/models';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImage } from './assets/utils.tsx'

// Parser
export const mapPokemonApiToPokemonView = (pokemon: PokemonListItemFromApi): PokemonListItem => {
    return pokemon.map((pokemonItem: PokemonListItemFromApi, index: number) => {
        return {
            name: pokemonItem.name,
            imageUrl: getImage(index + 1),
            id: index + 1,
            isFav: false,
        };
    });
};

// Call API, use parser and safe info to 'pokemons', search functionality, generation display functionality, fav functionality
export const App = () => {
    // Call API, use parser and safe info to 'pokemons'
    const [pokemons, setPokemons] = useState<PokemonListItem>([]);
    const [pokemonList, setPokemonList] = useState<PokemonListItem>([]);

    const apiCall = async (pokemonNumber: number) => {
        const response: PokemonListItem[] = await axios.get<PokemonListItemFromApi>(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonNumber}`);
        setPokemonList(mapPokemonApiToPokemonView(response.data.results));
        setPokemons(mapPokemonApiToPokemonView(response.data.results));
    }

    useEffect(() => {
        const fetchPokemons = async () => {
            apiCall(151);
        };

        fetchPokemons();
    }, []);

    //Generation display functionality
    const handleOnChange = async (event) => {
        if (event.target.value == 1) {
            apiCall(151);
        } else if (event.target.value == 2) {
            apiCall(251);
        } else {
            apiCall(386);
        }
    }



    // Search functionality
    const handleSearchBar = (event: PokemonListItem[]) => {
        const pokemonSearch: PokemonListItem[] = pokemonList.filter((pokemon: PokemonListItem) => {
            return pokemon.name.includes(event.target.value);
        })
        setPokemons(pokemonSearch)
    };

    // Fav functionality
    const handlePokemonClick = (pokemonId: number) => {
        const newPokemonsMap: PokemonListItem[] = pokemons.map((pokemonInfo: PokemonListItem) => {
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
            <div>
                <p>How many generations do you want to see?</p>
                <select onChange={handleOnChange}>
                    <option value={1}>First generation</option>
                    <option value={2}>First and second generation</option>
                    <option value={3}>First, second and third generation</option>
                </select>
            </div>
            <div className={'pokemons'}>
                {pokemons.map((pokemon: PokemonListItem) => (
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
