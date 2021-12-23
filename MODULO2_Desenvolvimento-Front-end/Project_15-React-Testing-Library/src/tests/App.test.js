import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';

import App from '../App';

describe('Testa o componente App.js', () => {
  test('Testa se a aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const pageHome = screen.getByText(/Home/i);
    expect(pageHome).toBeInTheDocument();

    const pageAbout = screen.getByText(/About/i);
    expect(pageAbout).toBeInTheDocument();

    const pageFavorite = screen.getByText(/Favorite Pokémons/i);
    expect(pageFavorite).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para'
  + ' a página inicial, na URL "/" ao clicar em "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const pageHome = screen.getByText(/Home/i);

    userEvent.click(pageHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se a aplicação é redirecionada para'
  + ' a página sobre, na URL "/about" ao clicar em "About"', () => {
    const { history } = renderWithRouter(<App />);
    const pageAbout = screen.getByText(/About/i);

    userEvent.click(pageAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se a aplicação é redirecionada para a página'
  + ' "Not Found" ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
