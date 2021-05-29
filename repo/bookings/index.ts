import dbUtils from "../../utils/db";
import { CreateBookingParams } from "../../types/booking";

const getBookingsByUserUuid = async (uuid: string): Promise<any> => {
  try {
    const db = await dbUtils.getMySQLConnection();
    const query = `
      SELECT * from booking where userUuid = ?
    `;

    const [results, _] = await db.connection.query(query, [uuid]);
    const values = Object.values(results);
    return values;
  } catch (e) {
    throw e;
  }
};

const createBooking = async (params: CreateBookingParams): Promise<any> => {
  try {
    const db = await dbUtils.getMySQLConnection();
    const query = `insert into booking (
          uuid
          showUuid,
          userUuid,
        ) VALUES(?, ?, ?)`;
    const [results, _] = await db.connection.query(query, [
      params.uuid,
      params.showUuid,
      params.userUuid,
    ]);
    return true;
  } catch (e) {
    throw e;
  }
};

const deleteBooking = async (
  userUuid: string,
  showUuid: string
): Promise<any> => {
  try {
    const db = await dbUtils.getMySQLConnection();
    const query = `delete from booking where userUuid = ? and showUuid = ?;`;
    const [results, _] = await db.connection.query(query, [userUuid, showUuid]);
    return true;
  } catch (e) {
    throw e;
  }
};

export default {
  getBookingsByUserUuid,
  createBooking,
};
