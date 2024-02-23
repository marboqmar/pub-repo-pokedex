import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {PokemonParsedDetails, PokemonDetailsFromApi} from '../../models.ts';
import {getImage} from '../../App.tsx';
import { capitalize } from 'lodash';

const apiURL: string = 'https://pokeapi.co/api/v2/pokemon/';

// Regular image is imported, shiny image is obtained here
export const getShinyImage = (number: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${number}.png`;
};

// Parser
const mapPokemonDetailsApiToPokemonDetails = (pokemon: PokemonDetailsFromApi[]): PokemonParsedDetails[] => {
    let pokemonTypes: [] = [];

    pokemon.types.forEach(function(type) {
        console.log(type.type.name)
        pokemonTypes.push(type.type.name)
    })

    let pokemonTypesToString: string = pokemonTypes.toString().replace(',', ', ');

    return {
        imageUrL: getImage(pokemon.id),
        imageShinyUrl: getShinyImage(pokemon.id),
        height: pokemon.height,
        weight: pokemon.weight,
        type: pokemonTypesToString,
    }
};

// Call API, use parser and safe info to 'pokemon'
export const PokemonDetails = () => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState<PokemonParsedDetails[]>([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await axios.get(`${apiURL + pokemonId}`);
            setPokemon(mapPokemonDetailsApiToPokemonDetails(response.data));
        };

        fetchPokemon();
    }, []);

    return (
        <>
            <h1>{capitalize(pokemonId)}</h1>
            <img src={pokemon.imageUrL}/>
            <img src={pokemon.imageShinyUrl}/>
            <p>Height: {pokemon.height} cm</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
            <p>Type: {pokemon.type}</p>
        </>
    )
};