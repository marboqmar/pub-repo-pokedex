import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {PokemonParsedDetails, PokemonDetailsFromApi} from '../../models.ts';
import { getImage, detailsApiURL, getShinyImage } from '../utils.tsx';
import { capitalize } from 'lodash';

// Parser
const mapPokemonDetailsApiToPokemonDetails = (pokemon: PokemonDetailsFromApi[]): PokemonParsedDetails[] => {
    let pokemonTypes: [] = [];

    pokemon.types.forEach(function(type) {
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
            const response = await axios.get(`${detailsApiURL + pokemonId}`);
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