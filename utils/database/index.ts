import mysql from "mysql2/promise";
// handle case of connection not connected to DB.
class Database {
  private static instance: Database;
  private connection!: mysql.Connection;

  private constructor() {
    //this.connection = await this.connectToMySQL();
  }

  public static getInstance = (): Database => {
    try {
      if (!Database.instance) {
        Database.instance = new Database();
      }
      return Database.instance;
    } catch (e) {
      throw e;
    }
  };

  clearAllDbRecords = async () => {
    try {
      const c = await this.getDBConnection();
      var query = `
        delete from
        user;
      `;
      await c.query(query);
      const query2 = `
        delete from
        virtual_show;
      `;
      await c.query(query2);
      //const query3 = `
      //   delete from
      //   booking;
      // `;
      // await c.query(query3);
    } catch (e) {
      throw e;
    }
  };
  closeDBConnection = async () => {
    try {
      const c = this.connection as mysql.Connection;
      await c.end();
    } catch (e) {
      console.log("ERROR IS: ", e);
      throw e;
    }
  };

  getDBConnection = async (): Promise<mysql.Connection> => {
    try {
      if (this.connection === undefined || this.connection === null) {
        await this.connectToMySQL();
      }
      return this.connection as mysql.Connection;
    } catch (e) {
      console.log("ERROR IS: ", e);
      throw e;
    }
  };

  connectToMySQL = async () => {
    try {
      // create the connection to database
      this.connection = await mysql.createConnection({
        host: "localhost",
        user: "user",
        database: "nextlineup",
        password: "user",
      });
    } catch (e) {
      throw e;
    }
  };
}

export default Database;
