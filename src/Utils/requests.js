import axios from "axios";
import ls from 'local-storage'

// TODO, check ENV for enviroment and switch appropriately
const url = "http://localhost";
const port = "5001"; // This is the port of our backend

const baseURL = url + ":" + port;

const instance = axios.create({
  baseURL,
  crossdomain: true,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

// TODO Capture failed attempt to access to say we can't log in (interceptor)

/*
  EXPORTED BUT ONLY MEANT TO BE USED BY OTHER UTILS.
  Call this function with the appropriate token before making a request.
  If calling the refresh endpoint, pass the refresh token into here.
  If calling any other protected endpoint, set the access token.
  @param token - This can be either the refresh token or the access token
*/
export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = "Bearer "+token;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

/*
  This is used in order to refresh our access token.
  Uses the stored refresh token and called the refresh endpoint
  @return boolean - success code
*/
export const refreshLogin = async () => {
  const refreshToken = ls.get('refreshToken');
  setAuthToken(refreshToken);
  const response = await instance.post("/refresh");

  if (response.status == 200) {
    const accessToken = response.data["access_token"];
    ls.set('accessToken', accessToken);
    ls.set('lastUpdated', new Date());
    setAuthToken(accessToken);
  }
};

// Ping the test endpoint to test login
export const test = () => {};

/** **** Functions to be used outside utils below **** **/

export const isLoggedIn = () => {
  // TODO: This can fail, if we try to use the access token that expired. Currently this only captures new sessions correctly.
  // Possible solution: Intercept. If we see a fail, loggedIn has to be false. Maybe heartbeat?
  const timeDeltaMinutes = 15;
  
  const diffInMilliSeconds = (new Date() - ls.get('lastUpdated') || new Date(0));
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  console.log(minutes)

  return !!ls.get('accessToken') && minutes < timeDeltaMinutes;
};

/*
  Wrap functions that need validation to be run. Otherwise, redirect user
  to the login page.
*/
export const loginRequiredWrapper = (fn) => {
  return (...args) => {
    if (isLoggedIn()) {
      return fn(...args);
    } else {
      // If not logged in, redirect user to login and return empty func
      window.location.href = "/login";
      return () => {};
    }
  }
}

/*
  Call this to attempt to register the user.
  @param email string - the email of the user
  @param password string - the password of the user
  @param name string - the name of the user. Must have a space to seperate first and last name.
  @return boolean - WHETHER THE PROCESS SUCCEEDED.
*/
// TODO: Do we want this to return a more detailed error?
export const register = async (email, password, name) => {
  if (
    !!email &&
    email.length != 0 &&
    !!password &&
    password.length != 0 &&
    !!name &&
    name.length != 0
  ) {
    // If these fields are passed in
    if (name.split(" ").length != 2) {
      // We need to ensure name is in the right format
      // Now we are ready to make a request
      const response = await instance.post("/register", {
        email,
        password,
        name,
      });

      // Now we want to process that we didn't get an err_msg or bad status code
      if (response.status != 200 || !!response.data["err_msg"]) {
        return false; // fail
      } else {
        // Otherwise we succeeded
        const accessToken = response.data["access_token"];
        const refreshToken = response.data["refresh_token"];
        ls.set('accessToken', accessToken);
        ls.set('lastUpdated', new Date());
        ls.set('refreshToken', refreshToken);  
        console.log("Access token: ", accessToken);
        console.log("Refresh token: ", refreshToken);
        setAuthToken(accessToken);
        return true;
      }
    } else {
      return false;
    }
  } else {
    // Otherwise we failed
    return false;
  }
};

/*
  Call this to attempt to log in the user.
  @param email - the email of user.
  @param password - the pass of the user.
  @return boolean - WHETHER THE PROCESSES SUCCEEDED.
*/
// TODO: Do we want this to return a more detailed error?
export const login = async (email, password) => {
  console.log("starting login: ", email, "@", password);
  if (!!email && email.length != 0 && !!password && password.length != 0) {
    // Confirm fields exist and not empty
    const response = await instance.post("/login", {
      email,
      password,
    });

    console.log(response);

    // If unsuccessful code or err message defined or response bad
    if (response.status != 200 || !!response.data["err_msg"]) {
      return false;
    } else {
      // Successful
      const accessToken = response.data["access_token"];
      const refreshToken = response.data["refresh_token"];
      ls.set('accessToken', accessToken);
      ls.set('lastUpdated', new Date());
      ls.set('refreshToken', refreshToken);
      setAuthToken(accessToken);
      console.log("Access token: ", accessToken);
      console.log("Refresh token: ", refreshToken);
      return true;
    }
  } else {
    return false;
  }
};

/*
  In order to log out, just kill the token
*/
export const logout = () => {
  ls.set('accessToken', '');
  ls.set('refreshToken', '');
  setAuthToken("");
}


/********** END AUTH **********/

/********** START ROUTES **********/


/*
  @param id - If undefined, get current user's profile. Else ID
*/
export const getProfile = loginRequiredWrapper(async (id = undefined) => {
  setAuthToken(ls.get('accessToken'));
  
  let response;
  if (id == undefined) {
    response = await instance.get("/get_profile");
  } else {
    response = await instance.get("/get_profile/"+id);
  }

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
})

/*
  @param password - the password
  @param name - name in format "<First> <Last>"
  @param image - link to image
  @param phoneNumer - the given phoneNumber as string
  @param description - the description
*/
export const updateProfile = loginRequiredWrapper(async (password, name, image, phoneNumber, description) => {
  setAuthToken(ls.get('accessToken'));
  
  const response = await instance.put("/update_profile", {
    password, name, image, phoneNumber, description
  });

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
})


/********** END ROUTES **********/
