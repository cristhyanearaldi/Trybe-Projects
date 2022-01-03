import React from 'react';
import './App.css';
import Header from './components/Header';
import NumericFilters from './components/NumericFilters';
import SortColumn from './components/SortColumn';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <NumericFilters />
      <SortColumn />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
