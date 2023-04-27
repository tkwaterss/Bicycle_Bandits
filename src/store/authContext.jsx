import { useState, useEffect, useCallback, createContext } from "react";

//initialize variable for timer
let logoutTimer;

//create context with initial state values
const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
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
  const storedId = localStorage.getItem('userId');

  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem('userId');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedId,
  };
};


export const AuthContextProvider = (props) => {
  //get local data by calling previously declared function
  const localData = getLocalData();

  //initiallize variables and set if localData exists
  let initialToken;
  let initialId;
  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
  }

  //initialize state for token and ID
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);
  console.log(userId)

//logout function to be called in a component (clears all record of token and userId)
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.clear();

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, []);

  //login function to be called in a component to login
  const login = (token, exp, userId) => {
    setToken(token);
    setUserId(userId);

    localStorage.setItem("token", token);
    localStorage.setItem("exp", exp);
    localStorage.setItem('userId', userId);

    const remainingTime = calculateRemainingTime(exp);

    //will automatically log out if remainingTime runs out
    logoutTimer = setTimeout(logout, remainingTime);
  };

  //update timer if local data changes or logout function changes
  useEffect(() => {
    if (localData) {
      logoutTimer = setTimeout(logout, localData.duration)
      setToken(localData.token)
      setUserId(localData.userId)
    }
  }, [localData, logout])

  //create object to hold context for use in components
  const contextValue = {
    token,
    login,
    logout,
    userId,
  };

  
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
