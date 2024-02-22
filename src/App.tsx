import './App.css'
import axios from 'axios';
import { Pokemon, PokemonFromApi } from './models';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export const getImage = (number: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
};

export const mapPokemonApiToPokemonView = (pokemon: PokemonFromApi[]): Pokemon[] => {
    return pokemon.map((pokemonItem: PokemonFromApi, index: number) => {
        return {
            name: pokemonItem.name,
            imageUrl: getImage(index + 1),
            id: index + 1,
        };
    });
};

export const App = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    console.log(pokemons)

    useEffect(() => {
        const fetchPokemons = async () => {
            const response = await axios.get(apiURL);
            setPokemons(mapPokemonApiToPokemonView(response.data.results));
        };

        fetchPokemons();
    }, []);

    return (
        <>
            <input className="search" type="text" placeholder="Escribe para buscar" />
            <div className="pokemons">
                {pokemons.map((pokemon: Pokemon) => (
                    <a key={pokemon.id} href={`/pokemon/${pokemon.name}`}>
                        <div className="pokemon">
                            <img src={pokemon.imageUrl} />
                            <p>{pokemon.name}</p>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};
