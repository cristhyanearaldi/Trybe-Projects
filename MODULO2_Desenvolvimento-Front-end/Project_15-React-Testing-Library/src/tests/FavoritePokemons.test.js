import React from 'react';
import { screen, render } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testa o componente FavoritePokemons.js', () => {
  test('Testa se a mensagem "No favorite pokemon found" é exibida'
  + ' na tela, quando não houver favoritos', () => {
    render(<FavoritePokemons />);

    const withoutFavorites = screen.getByText('No favorite pokemon found');
    expect(withoutFavorites).toBeInTheDocument();
  });

  test('Testa se são exibidos todos os cards de pokémons favoritados', async () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toBeInTheDocument();

    const pokemonType = screen.getAllByTestId('pokemon-type');
    expect(pokemonType[0]).toBeInTheDocument();
  });
});
