const loginSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      errorMessage: {
        type: 'The username field must be of type string',
      },
    },
    password: {
      type: 'string',
      errorMessage: {
        type: 'The password field must be type string',
      },
    },
  },
  required: ['username', 'password'],
  errorMessage: {
    required: {
      username: 'The username field is required',
      password: 'The password field is required',
    },
  },
};

const createUserSchema = {
  type: 'object',
  properties: {
    firstname: {
      type: 'string',
      errorMessage: {
        type: 'The firstname must be string',
        isNotEmpty: 'The firstname cannot be empty',
      },
      isNotEmpty: true,
    },
    lastname: {
      type: 'string',
      errorMessage: {
        type: 'The lastname must be string',
        isNotEmpty: 'The lastname cannot be empty',
      },
      isNotEmpty: true,
    },
    username: {
      type: 'string',
      errorMessage: {
        type: 'The username must be string',
        isNotEmpty: 'The username cannot be empty',
      },
      isNotEmpty: true,
    },
    id_role: {
      type: 'integer',
      minimum: 1,
      maximum: 2,
      errorMessage: {
        type: 'The id_role must be integer',
        maximum: 'The id_role cannot be greater than 2',
        minimum: 'The id_role cannot be lower than 1',
      },
    },
    password: {
      type: 'string',
      errorMessage: {
        type: 'The password must be string',
        isNotEmpty: 'The password cannot be empty',
      },
      isNotEmpty: true,
    },
  },
  required: ['firstname', 'lastname', 'username', 'id_role', 'password'],
  errorMessage: {
    required: {
      firstname: 'The firstname is required',
      lastname: 'The lastname is required',
      username: 'The username is required',
      id_role: 'The id_role is required',
      password: 'The password is required',
    },
  },
};

export { loginSchema, createUserSchema };
