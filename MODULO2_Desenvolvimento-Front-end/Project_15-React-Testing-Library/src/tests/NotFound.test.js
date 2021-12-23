import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound.js', () => {
  test('Testa se página contém um "h2" com o texto "Page requested not found 😭"', () => {
    render(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Testa se página mostra a imagem', () => {
    render(<NotFound />);
    const notFoundImage = screen.getByAltText(/page requested was not found/i);
    // Source: "https://testing-library.com/docs/queries/byalttext/"

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    // Source: "https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src"
  });
});
