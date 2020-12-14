# AirSWaP

## Overview

AirSWaP allows people from different parts of the world to swap apartments/houses with each other for a certain amount of time. The motivation for the application comes from the fact that people want to travel to different parts of the world for various periods of time but don’t want to spend money on Airbnb or hotel costs. An ideal user of the app would be a person who wants a break in routine from their normal lives for a short while. This is mostly meant for people who are either able to work remotely, looking to take a vacation, or are not employed.
 
The pandemic showed us that with a surge of remote jobs, people want a break from their normal routine at a cost that won’t break their bank. This app can help fill this void. Airbnb users can short-term and long-term rent apartments and houses all around the world, however, they have to pay for the rental.

## Getting Started / Installing

In order to get started, there are a few things you need to do.
1) Make sure you have NodeJS installed. If not, please follow the instructions [here](https://nodejs.org/en/download/package-manager/).
2) Make sure you have NPM installed if it didn't come pre-installed with NodeJS. Please follow the instructions [here](https://www.npmjs.com/get-npm).
3) Clone this project via `https://github.com/PredatorFeesh/airswap_frontend.git`
4) Get into the directory via `cd airswap_frontend`
5) Install required files via `npm install`

* It is important to note, this will not work without the backend as well *.
In order to install the backend, please follow the directions [in the backend directory](https://github.com/PredatorFeesh/airswap_backend).

And those are all the steps that are needed in order to run the program.

When your backend is up and frontend is installed, you can run the frontend via `npm start`

## Requirements

This project runs on NodeJS. Please view the Installation section in order to get the frontend running.

All of the requirements should be installed when running `npm install`. If they are note, the full list of requirements can be found in [package.json](https://github.com/PredatorFeesh/airswap_frontend/blob/master/package.json).

## Data Model

Note that the full data model will be listed in the [backend project README](https://github.com/PredatorFeesh/airswap_backend). Here, we will highlight the routes, an their respective parameters and outputs.

Here are the requests, along with a sample return.

```
GET: /users
Returns a list of all users registered for the app.
Params:

Return: {
{
   "Users": [
       {
           "Email": "user_one@email.com",
           "First Name": "Anna",
           "Image": "default.jpg",
           "Last Name": "Smith",
           "Listing": {
               "Address": "Test address",
               "City": "London",
               "Date": "Thu, 10 Dec 2020 00:00:00 GMT",
               "Description": "Listing description",
               "Image": "annaListingImage",
               "ListingID": 1,
               "is_listed": true
           },
           "Phone Number": null,
           "UserDescription": null,
           "UserID": 1
       },
       {
           "Email": "testing_registering_second_user_with_listing",
           "First Name": "John",
           "Image": "johnsUpdatedListingImage",
           "Last Name": "May",
           "Listing": {
               "Address": "Test John address",
               "City": "New York",
               "Date": "Thu, 10 Dec 2020 00:00:00 GMT",
               "Description": "This is John's apartment in NYC.",
               "Image": "johnListingImage",
               "ListingID": 2,
               "is_listed": true
           },
           "Phone Number": "1234567890",
           "UserDescription": "This is John's apartment in NYC.",
           "UserID": 2
       }
   ]
}
 
GET: /cities
Returns a list of all the cities available in the app. 
Params:


Return: {
   "Cities": [
       {
           "Name": "London"
       },
       {
           "Name": "New York"
       },
       {
           "Name": "Helsinki"
       },
       {
           "Name": "Moscow"
       }
   ]
}


GET: /get_profile
Returns the profile of the logged-in user and all information about that user and their listing.
Params:

Return: {
   "Email": "user_one@email.com",
   "First Name": "John",
   "Image": "image.jpg",
   "Last Name": "Green",
   "Listing": {
       "Address": "User address",
       "City": "New York",
       "Date": "Thu, 10 Dec 2020 00:00:00 GMT",
       "Description": "This is user's apartment in NYC.",
       "Image": "johnListingImage.jpg",
       "ListingID": 2,
       "is_listed": true
   },
   "Phone Number": null,
   "UserDescription": null,
   "UserID": 2
}


GET: /get_profile/<user_id>
Returns the profile of the user whose id was provided and all information about that user and their listing.
Params: {}

Return: {
   "Email": "user_one@email.com",
   "First Name": "Anna",
   "Image": "default.jpg",
   "Last Name": "Smith",
   "Listing": {
       "Address": "Anna’s address",
       "City": "London",
       "Date": "Thu, 10 Dec 2020 00:00:00 GMT",
       "Description": "Anna’s listing description",
       "Image": "annaListingImage.jpg",
       "ListingID": 1,
       "is_listed": true
   },
   "Phone Number": null,
   "UserDescription": null,
   "UserID": 1
}

PUT: /update_profile
Takes a list of logged-in user’s parameters and updates the user profile. 
Params: 
{
   "password": "updated_password",
   "name": "John May",
   "image": "johnsUpdatedListingImage",
   "description": "This is John's apartment in NYC.",
   "phone_number": "1234567890"
}
Return:
{
   "Email": "testing_registering_second_user_with_listing",
   "First Name": "John",
   "Image": "johnsUpdatedListingImage",
   "Last Name": "May",
   "Listing": {
       "Address": "Test John address",
       "City": "New York",
       "Date": "Thu, 10 Dec 2020 00:00:00 GMT",
       "Description": "This is John's apartment in NYC.",
       "Image": "johnListingImage",
       "ListingID": 2,
       "is_listed": true
   },
   "Phone Number": "1234567890",
   "UserDescription": "This is John's apartment in NYC.",
   "UserID": 2
}


POST: /add_listing
** DEPRECATED. WILL BE DONE IN REGISTER
Add the initial listing for the user (Now done in Register).

PUT: /update_listing
Updates logged-in user’s listing information (not user’s personal information). 
Params: 
{
   "address": "Updating Listing's Address",
   "location": "Moscow",
   "image": "udpatedImage",
   "description": "This is Monica's apartment in Moscow"
}
Return:
{
   "Address": "Updating Listing's Address",
   "City": "Moscow",
   "Date": "Thu, 10 Dec 2020 00:00:00 GMT",
   "Description": "This is Monica's apartment in Moscow",
   "Image": "udpatedImage",
   "ListingID": 3,
   "is_listed": true
}


GET: /get_listing
Gets listing of the logged-in user. Each user has only one listing. 
Params: {}

Return:

GET: /get_listing/<user_id>
Gets listing of the user whose ID is provided.
Params: {}

Return: {
   "Address": "John’s address",
   "City": "New York",
   "Date": "Thu, 10 Dec 2020 00:00:00 GMT",
   "Description": "This is John's apartment in NYC.",
   "Image": "johnListingImage",
   "ListingID": 2,
   "is_listed": true
}


POST: /request/<requested_user_id>
Add the requested user to the logged-in user’s list of sent requests. Returns info about the requested user.
Params:

Return:
{
   "Email": "usndgn@siugdnsoingd.dosng",
   "First Name": "J",
   "Image": "default.jpg",
   "Last Name": "A",
   "Listing": {
       "Address": "iosndgion",
       "City": "oinion",
       "Date": "Sat, 12 Dec 2020 00:00:00 GMT",
       "Description": "ioion",
       "Image": "ion",
       "ListingID": 6,
       "Owner": {},
       "is_listed": true
   },
   "Phone Number": null,
   "UserDescription": null,
   "UserID": 6
}


GET: /sent_requests
Returns a list of all the users who the logged-in user sent a request to
Params:

Return:
{
   "Requested": [
       {
           "Email": "anna@email.com",
           "First Name": "Anna",
           "Image": "default.jpg",
           "Last Name": "Johnson",
           "Listing": {
               "Address": "Anna's address",
               "City": "Boston",
               "Date": "Sat, 12 Dec 2020 00:00:00 GMT",
               "Description": "Anna's apartment in Boston",
               "Image": "annaImage",
               "ListingID": 8,
               "Owner": {},
               "is_listed": true
           },
           "Phone Number": null,
           "UserDescription": null,
           "UserID": 8
       },
       {
           "Email": "test@gmail.com",
           "First Name": "test",
           "Image": "default.jpg",
           "Last Name": "test",
           "Listing": {
               "Address": "testaddr",
               "City": "New York",
               "Date": "Sat, 12 Dec 2020 00:00:00 GMT",
               "Description": "testdesc asdasdas dasd",
               "Image": "testimg",
               "ListingID": 7,
               "Owner": {},
               "is_listed": true
           },
           "Phone Number": "123123",
           "UserDescription": "afasgasgfas",
           "UserID": 7
       }
   ]
}

GET: /received_requests
Returns a list of all the users that sent a request to the logged-in user 
Params:

Return:
{
   "Requested by": [
       {
           "Email": "emily@email.com",
           "First Name": "Emily",
           "Image": "default.jpg",
           "Last Name": "Henry",
           "Listing": {
               "Address": "Emily's address",
               "City": "London",
               "Date": "Sat, 12 Dec 2020 00:00:00 GMT",
               "Description": "Emily's apartment in London",
               "Image": "emilyListingImage",
               "ListingID": 9,
               "Owner": {},
               "is_listed": false
           },
           "Phone Number": null,
           "UserDescription": null,
           "UserID": 9
       },
       {
           "Email": "kate@email.com",
           "First Name": "Kate",
           "Image": "default.jpg",
           "Last Name": "Blue",
           "Listing": {
               "Address": "Kate's address",
               "City": "Boston",
               "Date": "Sat, 12 Dec 2020 00:00:00 GMT",
               "Description": "Kate's apartment in Boston",
               "Image": "katesistingImage",
               "ListingID": 10,
               "Owner": {},
               "is_listed": true
           },
           "Phone Number": null,
           "UserDescription": null,
           "UserID": 10
       }
   ]
}

DELETE: /remove_request/<requested_user_id>
Removes the requested user from the logged-in user’s list of sent requests. Returns info about the requested user.

Params:

Return:
{
   "Email": "usndgn@siugdnsoingd.dosng",
   "First Name": "J",
   "Image": "default.jpg",
   "Last Name": "A",
   "Listing": {
       "Address": "iosndgion",
       "City": "oinion",
       "Date": "Sat, 12 Dec 2020 00:00:00 GMT",
       "Description": "ioion",
       "Image": "ion",
       "ListingID": 6,
       "Owner": {},
       "is_listed": true
   },
   "Phone Number": null,
   "UserDescription": null,
   "UserID": 6
}

POST: /follow/<city_name>
Adds the provided city to the list of cities that the logged-in user follows.
Params:

Return: 
{
   "City": "Moscow"
}


DELETE: /unfollow/<city_name>
Removes provided city from logged-in user’s list of followed cities. 
Params:

Return: {
   "City unfollowed": "London"
}


GET: /listings
Returns a list of listings available in all the cities that the logged-in user follows.
Params:

Return:{
   "Listings": [
       {
           "Address": "Listing's Address",
           "City": "Moscow",
           "Date": "Thu, 10 Dec 2020 00:00:00 GMT",
           "Description": "This is Monica's apartment in Moscow",
           "Image": "listingImage",
           "ListingID": 3,
           "is_listed": true
       }
   ]
}

GET: /followed_cities
Returns a list of cities that the logged-in user follows.
Params:


Return:
{
   "Cities": [
       {
           "Name": "Helsinki"
       },
       {
           "Name": "Moscow"
       }
   ]
}
GET: /listings/<selected_city>
Returns all the listings currently available in the selected city
Params:

Return:
{
   "Listings": [
       {
           "Address": "Test address",
           "City": "London",
           "Date": "Thu, 10 Dec 2020 00:00:00 GMT",
           "Description": "Listing description",
           "Image": "annaListingImage",
           "ListingID": 1,
           "Owner": {
               "Email": "user_one@email.com",
               "First Name": "Anna",
               "Image": "default.jpg",
               "Last Name": "Smith",
               "Listing": {},
               "Phone Number": null,
               "UserDescription": null,
               "UserID": 1
           },
           "is_listed": true
       }
   ]
}

PUT: /open_listing
Makes the listing available by changing is_listed parameter to True
Params:

Return:
{
   "Address": "Emily's address",
   "City": "London",
   "Date": "Sat, 12 Dec 2020 00:00:00 GMT",
   "Description": "Emily's apartment in London",
   "Image": "emilyListingImage",
   "ListingID": 9,
   "Owner": {
       "Email": "emily@email.com",
       "First Name": "Emily",
       "Image": "default.jpg",
       "Last Name": "Henry",
       "Listing": {},
       "Phone Number": null,
       "UserDescription": null,
       "UserID": 9
   },
   "is_listed": true
}

PUT: /close_listing
Makes the listing unavailable by changing is_listed parameter to False
Params: 

Return:
{
   "Address": "Emily's address",
   "City": "London",
   "Date": "Sat, 12 Dec 2020 00:00:00 GMT",
   "Description": "Emily's apartment in London",
   "Image": "emilyListingImage",
   "ListingID": 9,
   "Owner": {
       "Email": "emily@email.com",
       "First Name": "Emily",
       "Image": "default.jpg",
       "Last Name": "Henry",
       "Listing": {},
       "Phone Number": null,
       "UserDescription": null,
       "UserID": 9
   },
   "is_listed": false
}

```

## SiteMap

@TODO

## User Stories

Swappers are users of our App. These are the people who would be swapping apartments or houses.

As a swapper, I want to be able to:

*Auth based actions*
- Register an account
- Login to my account
- Log out of my account
- Update my profile
- Update my listing
- Open my listing
- Close my listing

*Swap based actions*
- Follow a city
- Unfollow a city
- View listings of a given city
- View listings in cities that I liked
- Visit the profile and listing of any listing I see
- Request to swap with someone else
- Remove request to swap with someone else
- View all the requests I sent
- View all the requests I received

## References Used
- How does JWT Work https://jwt.io/introduction/
- JWT In Node https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/
- React frontpage https://reactjs.org/
- Session storage and local storage https://www.robinwieruch.de/local-storage-react
- Local State https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/

## Authors
- Pavlo Aleksyeyev, Pavlo.Aleksyeyev@gmail.com, https://github.com/PaulAlek
- Natalia Harrow, nataliaharrow@gmail.com, https://github.com/nataliaharrow 
- Jason Azayev, azayevjason@gmail.com, https://github.com/PredatorFeesh 
