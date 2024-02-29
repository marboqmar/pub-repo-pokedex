import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {PokemonParsedDetails, PokemonDetailsFromApi} from '../models';
import {detailsApiURL} from '../utils.tsx';

// Parser
const mapPokemonDetailsApiToPokemonParsedDetails = (dataFromApi: PokemonDetailsFromApi): PokemonParsedDetails => {
    const {sprites, height, weight, types} = dataFromApi;
    const pokemonTypes: [] = [];

    types.forEach(function(type) {
        pokemonTypes.push(type.type.name)
    })

    const pokemonTypesToString: string = pokemonTypes.toString().replace(',', ', ');

    return {
        images: {
            imageUrl: sprites.front_default,
            imageShinyUrl: sprites.front_shiny,
        },
        height,
        weight,
        types: pokemonTypesToString,
    }
};

// Call API, use parser and safe info to 'pokemon'
export const PokemonDetails = () => {
    const {pokemonId} = useParams();
    const [pokemonInfo, setPokemonInfo] = useState<PokemonParsedDetails>();

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await axios.get<PokemonDetailsFromApi>(`${detailsApiURL + pokemonId}`);
            setPokemonInfo(mapPokemonDetailsApiToPokemonParsedDetails(response.data));
        };

        fetchDetails();
    }, []);

    if (!pokemonInfo) {
        return <>Loading pokemon</>
    }

    return (
        <>
            <h1>{pokemonId}</h1>
            <img src={pokemonInfo.images.imageUrl}/>
            <img src={pokemonInfo.images.imageShinyUrl}/>
            <p>Height: {pokemonInfo.height} cm</p>
            <p>Weight: {pokemonInfo.weight / 10} kg</p>
            <p>Type: {pokemonInfo.types}</p>
        </>
    )
};