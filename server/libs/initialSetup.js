import Role from "../models/Role.js";

const initialSetup = async () => {
  const roles = await Role.find();
  if (roles.length === 0) {
    const rolesCreated = await Role.create(
      {
        name: "user",
      },
      {
        name: "admin",
      }
    );

    console.log(rolesCreated)
  }
};

initialSetup();
