export const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export const getImage = (number: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
};

export const detailsApiURL: string = 'https://pokeapi.co/api/v2/pokemon/';

export const getShinyImage = (number: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${number}.png`;
};