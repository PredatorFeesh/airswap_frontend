import axios from "axios";
import ls from 'local-storage'
import { useParams } from "react-router-dom";

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
    return true;
  }
  return false;
};

// Ping the test endpoint to test login
export const test = () => {};

/** **** Functions to be used outside utils below **** **/

export const isLoggedIn = () => {
  // TODO: This can fail, if we try to use the access token that expired. Currently this only captures new sessions correctly.
  // Possible solution: Intercept. If we see a fail, loggedIn has to be false. Maybe heartbeat?
  const timeDeltaMinutes = 15;
  const timeNow = new Date();
  const timeThen = new Date(ls.get('lastUpdated')) || new Date(0);

  const diffMS = timeNow - timeThen;
  
  const minutes = Math.round(((diffMS % 86400000) % 3600000) / 60000);;
  console.log("minutes since active: ", minutes)

  return !!ls.get('accessToken') && minutes < timeDeltaMinutes;
};

/*
  Wrap functions that need validation to be run. Otherwise, redirect user
  to the login page.
  
  This also adds the auth header for us if we are logged in, and refreshes our token.
*/
export const loginRequiredWrapper = (fn) => {
  return async (...args) => {
    if (isLoggedIn()) {
      setAuthToken(ls.get('accessToken'));
      return fn(...args);
    } else {
      // If not logged in, redirect user to login and return empty func
      if (!!ls.get('refreshToken')) {
        // Ask for new refresh token
        const refreshStatus = await refreshLogin();
        if (refreshStatus) {
          return fn(...args);
        } else {
          ls.set('accessToken', '');
          ls.set('refreshToken', '');
        }
      }
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
export const register = async (email, password, name, address, location, image, description) => {
  console.log("Starting loggin in");
  if (
    !!email &&
    email.length != 0 &&
    !!password &&
    password.length != 0 &&
    !!name &&
    name.length != 0
  ) {
    // If these fields are passed in
    if (name.split(" ").length == 2) {
      // We need to ensure name is in the right format
      // Now we are ready to make a request
      const response = await instance.post("/register", {
        email,
        password,
        name,
        address, location, image, description
      });

      // Now we want to process that we didn't get an err_msg or bad status code
      if (response.status != 200 || !!response.data["err_msg"]) {
        return false; // fail
      } else {
        // Otherwise we succeeded
        console.log("Got response");
        const accessToken = response.data["access_token"];
        const refreshToken = response.data["refresh_token"];
        console.log(accessToken);
        ls.set('accessToken', accessToken);
        ls.set('lastUpdated', new Date());
        ls.set('refreshToken', refreshToken);  
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
  Login required
  @param id - If undefined, get current user's profile. Else ID
  @return {
      Address, City, Date, Description, Image, ListingID, is_listed, Owner: {
        Description, Email, First name, Image, Last name, Phone Number, UserID
      }
    }
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
});

/*
  Login required
  Get all sent requests
*/
export const sentRequests = loginRequiredWrapper(async () => {
  setAuthToken(ls.get('accessToken'));
  
  const response = await instance.get("/sent_requests");

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  See requests to swap
  @return - TODO 
*/
export const receivedRequests = loginRequiredWrapper(async () => {
  const response = await instance.get("/received_requests");

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login required
  Updates the profile (Not the Listing) of the user.
  @TODO ITP: Remove Password dependency here, huge security risk.
  @param password - the password
  @param name - name in format "<First> <Last>"
  @param image - link to image
  @param phone_number - the given phoneNumber as string
  @param description - the description
  @return {
      Address, City, Date, Description, Image, ListingID, is_listed, Owner: {
        Description, Email, First name, Image, Last name, Phone Number, UserID
      }
    }
*/
export const updateProfile = loginRequiredWrapper(async (name, image, phone_number, description) => {  
  const response = await instance.put("/update_profile", {
    name, image, phone_number, description
  });

  if (response && response.status != 200 || !!response.data["err_msg"] && name.split(" ").length != 2) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  @param address - of the house/apartment
  @param location - of the house/apartment
  @param image - of the house/apartment
  @param description - of the house/apartment
  @return {
      Address, City, Date, Description, Image, ListingID, is_listed, Owner: {
        Description, Email, First name, Image, Last name, Phone Number, UserID
      }
    }
*/
export const updateListing = loginRequiredWrapper(async (address, location, image, description) => {
  const response = await instance.put("/update_listing", {
    address, location, image, description
  });

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  Get the listing for ID
  @param userID - get the listing of the user ID
  @return {
      Address, City, Date, Description, Image, ListingID, is_listed, Owner: {
        Description, Email, First name, Image, Last name, Phone Number, UserID
      }
    }
*/
export const getListing = loginRequiredWrapper(async (userID) => {
  if (userID == undefined) return false;
  const response = await instance.get("/get_listing/"+userID);

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});


/*
  Login Required
  Request with another user to swap
  @param id - the ID to request
  @return "Successfully requested" if successful
*/
export const request = loginRequiredWrapper(async (id) => {
  if (id == undefined) return false;
  const response = await instance.post("/request/"+id);

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  Remove request for another user
  @param id - the id for the person to remove request from
  @return "Request removed" if success
*/
export const removeRequest = loginRequiredWrapper(async (id) => {
  if (id == undefined) return false;
  const response = await instance.delete("/remove_request/"+id);

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});


/*
  Login Required
  Follow a city
  @return:
  {City: Name} if success
  {Already Following: Name} if already following
*/
export const follow = loginRequiredWrapper(async (cityName) => {
  if (cityName == undefined) return false;
  const response = await instance.post("/follow/"+cityName);

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  Unfollow a city
  @return
  {City unfollowed: Name} if success
  {City not followed: Name} if not followed
*/
export const unfollow = loginRequiredWrapper(async (cityName) => {
  if (cityName == undefined) return false;
  const response = await instance.delete("/unfollow/"+cityName);

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  See listings in followed cities.
  @param cityName - if undefined, get user's listing. Else, get all listings in cityName
*/
export const listings = loginRequiredWrapper(async (cityName=undefined) => {
  let response;
  
  if (cityName == undefined) {
    response = await instance.get("/listings");;
  } else {
    response = await instance.get("/listings/"+cityName);
  }

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  Open the listing for listingID.
  @param listingID - the ID of the listing to mark as open. PROVIDE THAT OF CURRENT USER'S LISTING.
  POTENTIAL @TODO: Remove ID field on backend and here. Potential security risk.
*/
export const openListing = loginRequiredWrapper(async () => {
  const response = await instance.put("/open_listing");

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  Close the listing for listingID.
  @param listingID - the ID of the listing to close. PROVIDE THAT OF CURRENT USER'S LISTING.
  POTENTIAL @TODO: Remove ID field on backend and here. Potential security risk.
*/
export const closeListing = loginRequiredWrapper(async () => {
  const response = await instance.put("/close_listing");

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  Get the cities we are currently following.
*/
export const followedCities = loginRequiredWrapper(async () => {
  const response = await instance.get("/followed_cities");

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});

/*
  Login Required
  Get the cities we are currently following.
  @return - List of cities. City: {Name}
*/
export const cities = loginRequiredWrapper(async () => {
  const response = await instance.get("/cities");

  if (response && response.status != 200 || !!response.data["err_msg"]) {
    return false;
  } else {
    // Successful
    return response.data
  }
});


/********** END ROUTES **********/
