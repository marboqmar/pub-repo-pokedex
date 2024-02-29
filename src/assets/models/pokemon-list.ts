export interface PokemonListItem {
    name: string;
    imageUrl: string;
    id: number;
    isFav: boolean;
}

export interface PokemonListItemFromApi {
    name: string;
}