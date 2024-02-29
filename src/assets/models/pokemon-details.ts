export interface PokemonParsedDetails {
    images: {
        imageUrl: string;
        imageShinyUrl: string;
    }
    height: number;
    weight: number;
    types: string;
}

export interface PokemonDetailsTypesFromApi {
    slot: number,
    type: {
        url: string,
        name: string,
    }
}

export interface PokemonDetailsFromApi {
    id: number;
    height: number;
    weight: number;
    types: {
        slot: number,
        type: PokemonDetailsTypesFromApi[],
    }
    sprites: {
        front_default: string;
        front_shiny: string;
    }
}

