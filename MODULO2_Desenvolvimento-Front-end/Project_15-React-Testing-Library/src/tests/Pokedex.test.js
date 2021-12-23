import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

const NUMBER_OF_BTNS = 9;

describe('Testa o componente Pokedex.js', () => {
  test('Testa se página contém um "h2" com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const pokedexText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokedexText).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonBtn).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const numberOfPokemons = screen.getAllByTestId('pokemon-name');
    expect(numberOfPokemons).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const totalBtns = screen.getAllByRole('button');
    expect(totalBtns).toHaveLength(NUMBER_OF_BTNS);

    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    filterBtn.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(btnAll).toBeInTheDocument();

    const btnElectric = screen.getByRole('button', {
      name: /electric/i,
    });
    expect(btnElectric).toBeInTheDocument();

    userEvent.click(btnElectric);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
