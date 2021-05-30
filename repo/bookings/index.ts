import { CreateBookingParams, BookingRecord } from "../../types/booking";
import DatabaseConnection from "../../utils/database";

class BookingRepo {
  public dbConnection: DatabaseConnection;

  constructor() {
    this.dbConnection = DatabaseConnection.getInstance();
  }

  createBooking = async (params: CreateBookingParams) => {
    try {
      const conn = await this.dbConnection.getDBConnection();
      const query = `
        insert into booking (
          uuid, showUuid,  userUuid
        ) values(?, ?, ?)
      `;
      await conn.query(query, [params.uuid, params.showUuid, params.userUuid]);
    } catch (e) {
      throw e;
    }
  };

  deleteBooking = async () => {};

  getBookingByUuid = async (uuid: string): Promise<BookingRecord> => {
    try {
      const conn = await this.dbConnection.getDBConnection();
      const query = `
      select * from booking where uuid = ?
      `;
      const [results, _] = await conn.query(query, [uuid]);
      const values: Array<BookingRecord> = Object.values(results);
      return values[0];
    } catch (e) {
      throw e;
    }
  };
}

export default BookingRepo;
