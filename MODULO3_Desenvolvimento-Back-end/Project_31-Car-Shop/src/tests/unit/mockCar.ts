const mockCar = {
  _id: "6255b8e8535d78344eb627dd",
  model: "abcde",
  year: 2022,
  color: "black",
  status: true,
  buyValue: 50000,
  doorsQty: 2,
  seatsQty: 2,
};


const mockCarUpdated = {
  _id: "6255b8e8535d78344eb627dd",
  model: "abcde",
  year: 2022,
  color: "black",
  status: false,
  buyValue: 50000,
  doorsQty: 2,
  seatsQty: 2,
};

// const mockListCars = [mockCar];
const mockCarsList = [
  {
    _id: "0055b8e8535d78344eb627dd",
    model: "abcde",
    year: 2020,
    color: "red",
    status: true,
    buyValue: 50000,
    doorsQty: 2,
    seatsQty: 2,
  },
  {
    _id: "1155b8e8535d78344eb627dd",
    model: "abcde",
    year: 2000,
    color: "gray",
    status: true,
    buyValue: 50000,
    doorsQty: 2,
    seatsQty: 2,
  },
]

export {
  mockCar,
  mockCarUpdated,
  mockCarsList,
}
