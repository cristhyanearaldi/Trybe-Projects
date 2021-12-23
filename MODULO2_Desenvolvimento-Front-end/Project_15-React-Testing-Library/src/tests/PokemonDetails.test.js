import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente PokemonDetails.js', () => {
  test('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);
    const pokemonDetails = screen.getByText(`${pokemons[0].name} Details`);
    expect(pokemonDetails).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();

    const headingText = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(headingText).toBeInTheDocument();

    const summaryText = screen.getByText(`${pokemons[0].summary}`);
    expect(summaryText).toBeInTheDocument();
  });

  test('Testa se existe uma seção com os mapas de localizações do pokémon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const headingText = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(headingText).toBeInTheDocument();

    const locationImage = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(locationImage).toHaveLength(pokemons[0].foundAt.length);

    locationImage.forEach((image) => {
      expect(image).toBeInTheDocument();
    });

    pokemons[0].foundAt.forEach((place, index) => {
      const placeName = screen.getByText(place.location);
      expect(placeName).toBeInTheDocument();
      expect(locationImage[index].src).toContain(place.map);
    });
  });

  test('Testa se, na página de detalhes, o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const isFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    expect(isFavorite).toBeInTheDocument();

    userEvent.click(isFavorite);
    const favoriteIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    userEvent.click(isFavorite);
    expect(favoriteIcon).not.toBeInTheDocument();

    const labelText = screen.getByLabelText('Pokémon favoritado?');
    expect(labelText).toBeInTheDocument();
  });
});
