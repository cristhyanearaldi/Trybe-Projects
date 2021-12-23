import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  test('Testa se a página contém um heading "h2" com o texto "About Pokédex"', () => {
    render(<About />);
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const aboutParagraphs = screen.getAllByText(/Pokémons/i);
    expect(aboutParagraphs).toHaveLength(2);
  });

  test('Testa se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const aboutImage = screen.getByRole('img');

    expect(aboutImage).toBeInTheDocument();
    expect(aboutImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // Source: "https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src"
  });
});
