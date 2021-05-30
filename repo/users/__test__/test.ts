import UserRepo from "../";
import DBInstance from "../../../utils/database";

describe("user repo suite", () => {
  beforeAll(async () => {
    const db = DBInstance.getInstance();
    const conn = await db.getDBConnection();
  });
  afterAll(async () => {
    const db = DBInstance.getInstance();
    await db.closeDBConnection();
  });

  beforeEach(async () => {
    try {
      const db = DBInstance.getInstance();
      await db.clearAllDbRecords();
    } catch (e) {
      console.log(e);
      throw e;
    }
  });
  it("create a user from repo", async () => {
    //try {
    const userRepo = new UserRepo();
    const createUserParams = {
      uuid: "some-user-uuid",
      email: "email",
      mobile: "mobile",
      hashedPassword: "some-password",
    };
    const createdUser = await userRepo.createUser(createUserParams);
    var foundUser = await userRepo.getUserByEmail(createUserParams.email);
    expect(foundUser!.email).toEqual(createUserParams.email);
    foundUser = await userRepo.getUserByUuid(createUserParams.uuid);
    expect(foundUser!.uuid).toEqual(createUserParams.uuid);
  });
  // it("some-test", () => console.log("hi"));
});

// it("some-test", () => console.log("RAN"));
