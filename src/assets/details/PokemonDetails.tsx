import { useParams } from 'react-router-dom';

export const PokemonDetails = () => {
    const { pokemonId } = useParams();
    return <div>Pokemon info {pokemonId}</div>;
};