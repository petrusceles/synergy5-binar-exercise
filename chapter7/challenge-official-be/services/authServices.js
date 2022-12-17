const bcrypt = require("bcrypt");
const authRepositories = require("../repositories/authRepositories");
const authValidator = require("../lib/validator");
const jwt = require("jsonwebtoken");
const { ROLES } = require("../lib/const");
const userRegisterService = async ({ name, email, password, roleId }) => {
  try {
    if (!name || !email || !password || !roleId) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "all fields (name, email, password, role) must not be empty",
        data: {
          registered_user: null,
        },
      };
    }

    if (roleId !== ROLES.MEMBER) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "only member role user can be registered this way",
        data: {
          registered_user: null,
        },
      };
    }

    const isValid = authValidator.userRegisterCheck({
      name,
      email,
      password,
      roleId,
    });
    if (isValid.length) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: isValid,
        data: {
          registered_user: null,
        },
      };
    }

    const encryptedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUND)
    );
    const isUserExist = await authRepositories.findUserByNameOrEmail({
      name,
      email,
    });
    if (isUserExist) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "user is already exist",
        data: {
          registered_user: null,
        },
      };
    }

    const createdUser = await authRepositories.createUser({
      name,
      email,
      password: encryptedPassword,
      roleId,
    });

    console.log(createdUser);

    return {
      status: "OK",
      statusCode: 201,
      message: "user registered",
      data: {
        registered_user: {
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.roleId,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: err,
      data: {
        registered_user: null,
      },
    };
  }
};

const userLoginService = async ({ email, password }) => {
  try {
    if (!email || !password) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "all fields (email, password) must not be empty",
        data: {
          logged_user: null,
        },
      };
    }

    const isValid = authValidator.userLoginCheck({ email, password });
    if (isValid.length) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "invalid email or password",
        data: {
          logged_user: null,
        },
      };
    }

    const userExist = await authRepositories.findUserByEmail({ email });

    if (!userExist) {
      return {
        status: "NOT_FOUND",
        statusCode: 404,
        message: "user not found",
        data: {
          logged_user: null,
        },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return {
        status: "BAD_REQUEST",
        statusCode: 401,
        message: "password incorrect",
        data: {
          logged_user: null,
        },
      };
    }

    const userPayload = {
      email,
      roleId: userExist.roleId,
      id: userExist.id,
    };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_VALIDITY_PERIOD,
    });

    return {
      status: "OK",
      statusCode: 200,
      message: "user logged in",
      data: {
        logged_user: {
          id: userExist.id,
          name: userExist.name,
          email: userExist.email,
          role: userExist.roleId,
        },
        token,
      },
    };
  } catch (err) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: err,
      data: {
        logged_user: null,
      },
    };
  }
};

const userProfileService = async ({ email }) => {
  try {
    const user = await authRepositories.findUserByEmail({ email });
    if (!user) {
      return {
        status: "NOT_FOUND",
        statusCode: 404,
        message: "user not found",
        data: {
          profile_user: null,
        },
      };
    }
    return {
      status: "OK",
      statusCode: 200,
      message: "user profile",
      data: {
        profile_user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    };
  } catch (err) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: err,
      data: {
        logged_user: null,
      },
    };
  }
};

const userAdminRegisterService = async ({ name, email, password, roleId }) => {
  try {
    if (!name || !email || !password || !roleId) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "all fields (name, email, password, roleId) must not be empty",
        data: {
          registered_user: null,
        },
      };
    }

    if (roleId !== ROLES.ADMIN) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "only admin role user can be registered this way",
        data: {
          registered_user: null,
        },
      };
    }

    const isValid = authValidator.userRegisterCheck({
      name,
      email,
      password,
      roleId,
    });

    if (isValid.length) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: isValid,
        data: {
          registered_user: null,
        },
      };
    }

    const encryptedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUND)
    );

    const { createdUser, isCreated } = await authRepositories.findOrCreateUser({
      name,
      email,
      password: encryptedPassword,
      roleId,
    });

    if (!isCreated) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "user is already exist",
        data: {
          registered_user: null,
        },
      };
    }

    return {
      status: "OK",
      statusCode: 201,
      message: "user registered",
      data: {
        registered_user: {
          name: createdUser.name,
          email: createdUser.email,
          roleId: createdUser.roleId,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: err,
      data: {
        registered_user: null,
      },
    };
  }
};

module.exports = {
  userRegisterService,
  userLoginService,
  userProfileService,
  userAdminRegisterService,
};
