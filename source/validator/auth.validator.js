import bcrypt from '../utils/bcrypt.js';
import validateObjectProperties from '../services/validator.service.js';
import typeConfigs from '../config/types.config.js';

const loginValidator = ({ username, password }) => {
  validateObjectProperties({ username, password }, typeConfigs.required);

  validateObjectProperties({ username, password }, typeConfigs.string);

  validateObjectProperties({ password }, typeConfigs.passwordPattern);

  return {
    getUsername: () => username,
    getPassword: () => password,
  };
};

const registerMerchantAccountValidator = ({
  fullname,
  username,
  phoneNumber,
  email,
  password,
  confirmPassword,
}) => {
  validateObjectProperties(
    {
      fullname,
      username,
      phoneNumber,
      email,
      password,
      confirmPassword,
    },
    typeConfigs.required,
  );

  validateObjectProperties(
    {
      fullname,
      username,
      phoneNumber,
      email,
      password,
      confirmPassword,
    },
    typeConfigs.string,
  );

  validateObjectProperties({ email }, typeConfigs.email);

  validateObjectProperties(
    { phoneNumber },
    typeConfigs.indonesianPhoneNumberPattern,
  );

  validateObjectProperties(
    {
      password,
      confirmPassword,
    },
    typeConfigs.passwordPattern,
  );

  validateObjectProperties(
    {
      password: {
        value: password,
        expectedValue: confirmPassword,
      },
    },
    typeConfigs.matchesExpectedValue,
  );

  return {
    getFullname: () => fullname,
    getPhoneNumber: () => phoneNumber,
    getUsername: () => username,
    getEmail: () => email,
    getPassword: async () => await bcrypt.hashing(password),
  };
};

const checkIsPasswordMatchValidator = ({ password, confirmPassword }) => {
  validateObjectProperties({ password, confirmPassword }, typeConfigs.required);

  validateObjectProperties(
    { password, confirmPassword },
    typeConfigs.passwordPattern,
  );

  validateObjectProperties(
    {
      password: {
        value: password,
        expectedValue: confirmPassword,
      },
    },
    typeConfigs.matchesExpectedValue,
  );

  return {
    getPassword: () => bcrypt.hashing(password),
  };
};

const forgetPasswordValidator = ({ email }) => {
  validateObjectProperties(
    {
      email,
    },
    typeConfigs.required,
  );

  validateObjectProperties(
    {
      email,
    },
    typeConfigs.string,
  );

  validateObjectProperties(
    {
      email,
    },
    typeConfigs.email,
  );

  return {
    getEmail: () => email,
  };
};

const resetPasswordValidator = ({
  resetPasswordToken,
  newPassword,
  confirmPassword,
}) => {
  validateObjectProperties(
    {
      resetPasswordToken,
      newPassword,
      confirmPassword,
    },
    typeConfigs.required,
  );

  validateObjectProperties(
    {
      resetPasswordToken,
      newPassword,
      confirmPassword,
    },
    typeConfigs.string,
  );

  validateObjectProperties(
    {
      newPassword,
      confirmPassword,
    },
    typeConfigs.passwordPattern,
  );

  validateObjectProperties(
    {
      password: {
        value: newPassword,
        expectedValue: confirmPassword,
      },
    },
    typeConfigs.matchesExpectedValue,
  );

  return {
    getResetPasswordToken: () => resetPasswordToken,
    getPassword: async () => await bcrypt.hashing(newPassword),
  };
};

const tokenValidator = ({ token }) => {
  validateObjectProperties(
    {
      token,
    },
    typeConfigs.required,
  );

  validateObjectProperties(
    {
      token,
    },
    typeConfigs.string,
  );

  return {
    getToken: () => token,
  };
};

export default {
  loginValidator,
  forgetPasswordValidator,
  registerMerchantAccountValidator,
  resetPasswordValidator,
  tokenValidator,
  checkIsPasswordMatchValidator,
};
