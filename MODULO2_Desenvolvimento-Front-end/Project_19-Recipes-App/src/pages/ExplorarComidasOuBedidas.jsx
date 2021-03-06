import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import { getRandomRecipe } from '../services/recipesAPI';

function ExplorarComidasOuBedidas() {
  const history = useHistory();

  const type = history.location.pathname.includes('comidas') ? 'Comidas' : 'Bebidas';

  const handleExplore = async () => {
    const keyType = type === 'Bebidas' ? 'Drink' : 'Meal';
    const randomRecipe = await getRandomRecipe(type);
    const id = randomRecipe[0][`id${keyType}`];
    history.push(`/${keyType === 'Drink' ? 'bebidas' : 'comidas'}/${id}`);
  };

  return (
    <>
      <header>
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        </Link>
        <h2 data-testid="page-title">{`Explorar ${type}`}</h2>
        <main>
          <button
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => (history.push(
              `/explorar/${type === 'Bebidas' ? 'bebidas' : 'comidas'}/ingredientes`,
            )) }
          >
            Por Ingredientes
          </button>
          { type === 'Comidas'
           && (
             <button
               type="button"
               data-testid="explore-by-area"
               onClick={ () => history.push('/explorar/comidas/area') }
             >
               Por Local de Origem
             </button>
           )}
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => handleExplore() }
          >
            Me Surpreenda!
          </button>
        </main>
      </header>
      <Footer />
    </>
  );
}

export default ExplorarComidasOuBedidas;
