import {
  CreateVirtualShowParams,
  VirtualShowRecord,
} from "../../types/virtual_show";
import DatabaseConnection from "../../utils/database";

class VirtualShowRepo {
  public dbConnection: DatabaseConnection;

  constructor() {
    this.dbConnection = DatabaseConnection.getInstance();
  }

  createShow = async (params: CreateVirtualShowParams) => {
    try {
      const conn = await this.dbConnection.getDBConnection();
      const query = `
        insert into virtual_show (
          uuid, startTime, endTime,  maxPerformers, linkToMedia
        ) VALUES(?, ?, ?, ?, ?)
      `;
      await conn.query(query, [
        params.uuid,
        params.startTime,
        params.endTime,
        params.maxPerformers,
        params.linkToMedia,
      ]);
    } catch (e) {
      throw e;
    }
  };

  deleteShow = async () => {};

  getShowByUuid = async (uuid: string): Promise<VirtualShowRecord> => {
    try {
      const conn = await this.dbConnection.getDBConnection();
      const query = `
      select * from virtual_show where uuid = ?
      `;
      const [results, _] = await conn.query(query, [uuid]);
      const values: Array<VirtualShowRecord> = Object.values(results);
      return values[0];
    } catch (e) {
      throw e;
    }
  };
  getShowsByUserUUID = async () => {};
}

export default VirtualShowRepo;
