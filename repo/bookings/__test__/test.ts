import BookingRepo from "../";
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
    const bookingRepo = new BookingRepo();
    const createBookingParams = {
      uuid: "some-booking-uuid",
      userUuid: "some-user-uuid",
      showUuid: "some-show-uuid",
    };
    await bookingRepo.createBooking(createBookingParams);
    const booking = await bookingRepo.getBookingByUuid(
      createBookingParams.uuid
    );
    expect(booking!.uuid).toEqual(createBookingParams.uuid);
  });
  it("get multiple bookings by user", async () => {
    const bookingRepo = new BookingRepo();

    const userUuid = "some-user-uuid";
    for (let i = 0; i < 3; i++) {
      const createBookingParams = {
        uuid: "some-booking-uuid" + i,
        showUuid: "some-show-uuid" + i,
        userUuid: userUuid,
      };
      await bookingRepo.createBooking(createBookingParams);
    }

    const bookings = await bookingRepo.getBookingsByUserUUID(userUuid);
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      expect(booking!.userUuid).toEqual(userUuid);
    }
  });
});
// it("some-test", () => console.log("RAN"));
