import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { PokemonDetails } from './assets/details/PokemonDetails.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/pokemon/:pokemonId',
        element: <PokemonDetails />
    },

]);