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

const example = {};

export { loginSchema, example };
