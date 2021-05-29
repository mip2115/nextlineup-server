import dbUtils from "../../utils/db";

const createShow = async (params: CreateShowParams): Promise<any> => {
  try {
    const db = await dbUtils.getMySQLConnection();
    const query = `delete from bookings where userUuid = ? and showUuid = ?;`;
    const [results, _] = await db.connection.query(query, [userUuid, showUuid]);
    return true;
  } catch (e) {
    throw e;
  }
};

const deleteShow = async (params: CreateShowParams): Promise<any> => {
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
  createShow,
  deleteShow,
};

const getShowsByUserUUID = async (uuid: string): Promise<any> => {
  try {
    const db = await dbUtils.getMySQLConnection();
    const query = `
      select *
      from show s
      inner join booking b
      on b.show_uuid = s.uuid and b.user_uuid = ?
       `;
    const [results, _] = await db.connection.query(query, [uuid]);
    const values = Object.values(results);
    return values;
  } catch (e) {
    throw e;
  }
};
