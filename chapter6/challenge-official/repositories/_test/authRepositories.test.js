const authRepositories = require("../authRepositories");
const truncate = require("../../helpers/truncate");
const destroy = require("../../helpers/destroy");
const bcrypt = require("bcrypt");
describe("find or create user", () => {
  it("should create new user", async () => {
    const userPassword = await bcrypt.hash("password", 10);

    const userToCreate = {
      name: "Bambang",
      email: "bambang@gmail.com",
      password: userPassword,
      role_id: 2,
    };

    const retrievedData = await authRepositories.findOrCreateUser(userToCreate);

    console.log(retrievedData.createdUser);

    expect(retrievedData.createdUser.name).toEqual(userToCreate.name);
    expect(retrievedData.createdUser.email).toEqual(userToCreate.email);
    expect(retrievedData.createdUser.password).toEqual(userToCreate.password);
    expect(retrievedData.createdUser.role_id).toEqual(userToCreate.role_id);

    await destroy.user(retrievedData.createdUser.id);
  });
});

describe("read user by email or name", () => {
  it("should return user that has same email or name as requested", async () => {
    const userPassword = await bcrypt.hash("password", 10);

    const userToCreate = {
      name: "Bambang",
      email: "bambang@gmail.com",
      password: userPassword,
      role_id: 2,
    };

    const createdUser = await authRepositories.createUser(userToCreate);

    const retrievedUser = await authRepositories.findUserByNameOrEmail({
      name: userToCreate.name,
      email: null,
    });

    expect(retrievedUser.name).toEqual(userToCreate.name);
    expect(retrievedUser.email).toEqual(userToCreate.email);
    expect(retrievedUser.password).toEqual(userToCreate.password);
    expect(retrievedUser.role_id).toEqual(userToCreate.role_id);

    await destroy.user(createdUser.id);
  });
});

describe("create user", () => {
  it("should create user", async () => {
    const userPassword = await bcrypt.hash("password", 10);

    const userToCreate = {
      name: "Bambang",
      email: "bambang@gmail.com",
      password: userPassword,
      role_id: 2,
    };

    const createdUser = await authRepositories.createUser(userToCreate);

    expect(createdUser.name).toEqual(userToCreate.name);
    expect(createdUser.email).toEqual(userToCreate.email);
    expect(createdUser.password).toEqual(userToCreate.password);
    expect(createdUser.role_id).toEqual(userToCreate.role_id);

    await destroy.user(createdUser.id);
  });
});

describe("read user by email only", () => {
  it("should return user that has the same email as requested", async () => {
    const userPassword = await bcrypt.hash("password", 10);

    const userToCreate = {
      name: "Bambang",
      email: "bambang@gmail.com",
      password: userPassword,
      role_id: 2,
    };

    const createdUser = await authRepositories.createUser(userToCreate);

    const retrievedUser = await authRepositories.findUserByEmail({
      email: "bambang@gmail.com",
    });

    expect(retrievedUser.name).toEqual(userToCreate.name);
    expect(retrievedUser.email).toEqual(userToCreate.email);
    expect(retrievedUser.password).toEqual(userToCreate.password);
    expect(retrievedUser.role_id).toEqual(userToCreate.role_id);

    await destroy.user(createdUser.id);
  });
});
