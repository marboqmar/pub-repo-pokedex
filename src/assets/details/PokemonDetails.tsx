import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import {PokemonParsedDetails, PokemonDetailsFromApi} from "../../models.ts";
import {getImage} from "../../App.tsx";

const apiURL: string = "https://pokeapi.co/api/v2/pokemon/";

// Parser
const mapPokemonDetailsApiToPokemonDetails = (pokemon: PokemonDetailsFromApi[]): PokemonParsedDetails[] => {
    return pokemon.map((pokemonItem: PokemonDetailsFromApi) => {
        console.log(pokemonItem.name)
        return {
            name: pokemonItem.name
        };
    });
};

// Call API, use parser and safe info to "pokemon"
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

    return <div>Pokemon info {pokemonId}</div>;
};