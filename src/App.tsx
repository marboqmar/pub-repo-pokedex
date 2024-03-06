import './App.css'
import axios from 'axios';
import { PokemonListItem, PokemonListItemFromApi } from './assets/models';
import {useState, useEffect, ChangeEvent} from 'react';
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

// Call API, use parser and safe info to 'pokemons', fav functionality, generation display functionality, filter functionality,
export const App = () => {
    // Call API, use parser and safe info to 'pokemons'
    const [pokemons, setPokemons] = useState<PokemonListItem>([]);
    const [pokemonList, setPokemonList] = useState<PokemonListItem>([]);
    const [search, setSearch] = useState('');
    const [isFavButtonClicked, setIsFavButtonClicked] = useState(false);

    const apiCall = async (pokemonNumber: number) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonNumber}`);
        setPokemonList(mapPokemonApiToPokemonView(response.data.results));
        setPokemons(mapPokemonApiToPokemonView(response.data.results));
    }

    useEffect(() => {
        const fetchPokemons = async () => {
            apiCall(151);
        };

        fetchPokemons();
    }, []);

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

    const handleFavsClick = () => {
        setIsFavButtonClicked(!isFavButtonClicked)
    };

    //Generation display functionality
    const handleOnChange = async (event: ChangeEvent<HTMLSelectElement>) => {

        if (Number(event.target.value) === 1) {
            await apiCall(151);
        } else if (Number(event.target.value) === 2) {
            await apiCall(251);
        } else {
            await apiCall(386);
        }
    }

    // Filter functionality
    const handleSearchBar = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const filteredPokemon = !search && !isFavButtonClicked
        ? pokemons
        : pokemons.filter((pokemon) => {
            if (isFavButtonClicked && !pokemon.isFav) {
                return false;
            }

            if (!search) {
                return true;
            }

            const searchId = Number(search);

            if (Number.isNaN(searchId)) {
                return pokemon.name.includes(search);
            }

            return pokemon.id === searchId;
        });

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
            <button onClick={handleFavsClick}>Your favs!</button>
            <div className={'pokemons'}>
                {filteredPokemon.map((pokemon: PokemonListItem) => (
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
