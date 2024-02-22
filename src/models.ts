export interface Pokemon {
    name: string;
    imageUrl: string;
    id: number;
    isFav: boolean;
}

export interface PokemonParsedDetails {
    name: string;
}

export interface PokemonFromApi {
    name: string;
    url: string;
}

export interface PokemonDetailsFromApi {
    name: string;
    url: string;
    id: number;
}