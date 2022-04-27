db.produtos.deleteMany({ curtidas: { $lt: 50 } });
db.produtos.find(
  {},
  { nome: true, _id: false },
);