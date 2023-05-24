import { useState, useEffect, useCallback, createContext } from "react";

//initialize variable for timer
let logoutTimer;

//create context with initial state values
const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
  employee: null,
});

//declare function to calculate remaining time of authorization based on the set expiration
const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

//declare function to retrieve data stored in localStorage or delete if time is out
const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storedId = localStorage.getItem("userId");
  let storedEmp = localStorage.getItem("employee");
  if (storedEmp === null) {
    storedEmp = false;
  } else {
    storedEmp = JSON.parse(storedEmp);
  }

  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 1000 * 60 * 30) {
    // localStorage.removeItem("token");
    // localStorage.removeItem("exp");
    // localStorage.removeItem('userId');
    localStorage.clear();
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedId,
    employee: storedEmp,
  };
};

export const AuthContextProvider = (props) => {
  //get local data by calling previously declared function
  const localData = getLocalData();

  //initiallize variables and set if localData exists
  let initialToken;
  let initialId;
  let initialEmp;
  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
    initialEmp = localData.employee;
  }

  //initialize state for token and ID
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);
  const [employee, setEmployee] = useState(initialEmp);

  //logout function to be called in a component (clears all record of token and userId)
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setEmployee(null);

    localStorage.clear();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  //login function to be called in a component to login
  const login = (token, exp, userId, employee) => {
    setToken(token);
    setUserId(userId);
    setEmployee(employee);

    localStorage.setItem("token", token);
    localStorage.setItem("exp", exp);
    localStorage.setItem("userId", userId);
    localStorage.setItem("employee", employee);

    const remainingTime = calculateRemainingTime(exp);

    //will automatically log out if remainingTime runs out
    logoutTimer = setTimeout(logout, remainingTime);
  };

  const changeAccount = () => {
    setEmployee(!employee)
    localStorage.setItem("employee", !employee);
  }

  //update timer if local data changes or logout function changes
  useEffect(() => {
    if (localData) {
      logoutTimer = setTimeout(logout, localData.duration);
      setToken(localData.token);
      setUserId(localData.userId);
      setEmployee(localData.employee);
    }
  }, [localData, logout]);

  //create object to hold context for use in components
  const contextValue = {
    token,
    login,
    logout,
    userId,
    employee,
    changeAccount,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
