import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  test('Testa se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(`${pokemons[0].name}`);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(`${pokemons[0].type}`);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${pokemons[0]
        .averageWeight.value} ${pokemons[0]
        .averageWeight.measurementUnit}`,
    );
    const pokemonImage = screen.getByRole('img', {
      name: /sprite/i,
    });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toContain(`${pokemons[0].image}`);
    expect(pokemonImage).toHaveAccessibleName(`${pokemons[0].name} sprite`);
    // Source: "https://github.com/testing-library/jest-dom#tohaveaccessiblename"
  });

  test('Testa se o card do Pokémon contém um link para exibir detalhes', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    // Source: "https://github.com/testing-library/jest-dom#tohaveattribute"
  });

  test('Testa se ao clicar no link é feito o redirecionamento'
  + 'para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pageDetails = screen.getByText(/more details/i);

    userEvent.click(pageDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const pageDetails = screen.getByText(/more details/i);
    userEvent.click(pageDetails);
    const isFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(isFavorite);
    const starIcon = screen.getByRole('img', {
      name: /marked as favorite/i,
    });

    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain('/star-icon.svg');
    expect(starIcon).toHaveAccessibleName(`${pokemons[0].name} is marked as favorite`);
  });
});
