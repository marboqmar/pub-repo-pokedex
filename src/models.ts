export interface Pokemon {
    name: string;
    imageUrl: string;
    id: number;
    isFav: boolean;
}

export interface PokemonFromApi {
    name: string;
    url: string;
}

export interface PokemonDetailsFromApi {
    height: number;
    weight: number;
    type: object;
}

export interface PokemonParsedDetails {
    imageUrl: string;
    imageShinyUrl: string;
    height: number;
    weight: number;
    type: [];
}