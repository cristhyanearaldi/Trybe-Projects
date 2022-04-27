db.produtos.find(
  { $nor: 
    [
      { nome: "Big Mac" },
      { nome: "McChicken" },
    ],
  },
  { nome: true, curtidas: true, vendidos: true, _id: false },
);