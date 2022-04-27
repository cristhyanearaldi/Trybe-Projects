db.produtos.find(
  { "valoresNutricionais.0.quantidade": { $lt: 500 } },
  { nome: true, _id: false },
);