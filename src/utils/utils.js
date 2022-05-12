import { store } from '../store';
import { logOutAction } from '../pages/login/actions/login-action';

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getGetOrdinal = (n) => {
  let s = ["th", "st", "nd", "rd"];
  let v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const validatePassword = (password) => {
  let isDirtyPassword = false;
  const errors = {
    upperCase: true,
    number: true,
    specialCharacter: true,
    minLength: true,
  };

  if (!password) {
    return { validationState: errors, isValidPassword: true };
  }

  if (password.length < 20) {
    errors["minLength"] = false;
    isDirtyPassword = true;
  }
  // if (password.search(/[A-Z]/) < 0) {
  //   errors["upperCase"] = false;
  //   isDirtyPassword = true;
  // }
  // if (password.search(/[0-9]/) < 0) {
  //   errors["number"] = false;
  //   isDirtyPassword = true;
  // }
  // if (password.search(/[!@#$%^&*]/) < 0) {
  //   errors["specialCharacter"] = false;
  //   isDirtyPassword = true;
  // }

  if (!isDirtyPassword) {
    return {
      validationState: {
        // upperCase: true,
        // number: true,
        // specialCharacter: true,
        minLength: true,
      },
      isValidPassword: true,
    };
  } else {
    return { validationState: errors, isValidPassword: false };
  }
};
const logoutFn = (userData) => {
  store.dispatch(logOutAction(userData));
};


let time;
const setIdleTime = (timeOutTime, userData) => {
  resetTimer();
  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(() => logoutFn(userData), timeOutTime);
  }
};

export { capitalizeFirstLetter, getGetOrdinal, validatePassword ,setIdleTime};
