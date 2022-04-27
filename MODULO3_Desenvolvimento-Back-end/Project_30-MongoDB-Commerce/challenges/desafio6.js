db.produtos.find(
  { curtidas: { $gt: 10, $lt: 100 } },
  { nome: true, curtidas: true, _id: false },
);