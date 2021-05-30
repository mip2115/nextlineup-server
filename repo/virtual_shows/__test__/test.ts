import VirtualShowRepo from "../";
import DBInstance from "../../../utils/database";

describe("show repo suite", () => {
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
  it("create a show from repo", async () => {
    const showRepo = new VirtualShowRepo();
    const createShowParams = {
      uuid: "some-show-uuid",
      startTime: new Date(),
      endTime: new Date(),
      linkToMedia: "some-link",
      maxPerformers: 6,
    };
    await showRepo.createShow(createShowParams);
    const show = await showRepo.getShowByUuid(createShowParams.uuid);
    expect(show!.uuid).toEqual(createShowParams.uuid);
  });
  it("get shows by user uuid", async () => {
    const showRepo = new VirtualShowRepo();

    for (let i = 0; i < 3; i++) {
      const createShowParams = {
        uuid: "some-show-uuid" + i,
        startTime: new Date(),
        endTime: new Date(),
        linkToMedia: "some-link",
        maxPerformers: 6,
      };
      await showRepo.createShow(createShowParams);
    }

    const show = await showRepo.getShowByUuid(createShowParams.uuid);
    expect(show!.uuid).toEqual(createShowParams.uuid);
  });
});
// it("some-test", () => console.log("RAN"));
