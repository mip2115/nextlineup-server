import UserRepo from "../../../schemas/user/repo";
import UserController from "../";

// it("testing out functionality", async () => {
//   const fakeUser = {
//     email: "fakeuser@test.com",
//     mobile: "0001111111",
//   };
//   UserRepo["getUserByUid"] = jest.fn(() => fakeUser);
//   const user = await UserController.getUserByUid("some-uid");
//   expect(user).toBeTruthy();
// });

// it("create user success", async () => {
//   const fakeUser = {
//     email: "fakeuser@test.com",
//     mobile: "0001111111",
//   };
//   UserRepo["createUser"] = jest.fn(() => fakeUser);
//   const createUserParams = {
//     email: "email@email.com",
//     password: "password",
//     passwordConfirm: "password",
//   };
//   const user = await UserController.createUser(createUserParams);
//   expect(user).toBeTruthy();
// });

// it("create user fail", async () => {
//   const fakeUser = {
//     email: "fakeuser@test.com",
//     mobile: "0001111111",
//   };

//   let createUserParams = {
//     email: "email@email.com",
//     password: "password",
//     passwordConfirm: "passwordd",
//   };

//   await expect(() =>
//     UserController.createUser(createUserParams)
//   ).rejects.toThrow("passwords not the same");

//   createUserParams = {
//     password: "password",
//   };
//   await expect(() =>
//     UserController.createUser(createUserParams)
//   ).rejects.toThrow("email is required");
// });

it("create", () => {});
