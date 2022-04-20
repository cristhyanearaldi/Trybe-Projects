import IClubId from '../interfaces/ClubId';
import Club from '../database/models/clubs';

const getAll = async () => {
  const clubs = await Club.findAll();
  return clubs;
};

const getById = async ({ id }: IClubId) => {
  const club = await Club.findByPk(id);
  return club;
};

export default {
  getAll,
  getById,
};
