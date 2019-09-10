**Try it out**
Hosted on Heroku at: https://aqueous-spire-38692.herokuapp.com/

**Overview**
This app uses the open-source Movie Database API to allow a user to search and learn about thousands of popular television shows. The homepage of the app displays 20 of the most popular shows of all time, along with a search bar that can be used to browse for additional show data.

**Local Setup**
To run the application locally, you can clone this repository, run `npm install` to install dependencies, then run `npm start` to start a local server on localhost:3000. Navigate to localhost:3000 in any browser to view the application in a local setup. 

**Server**
I selected Express.js to power the back end of the application since it is well suited to handle each of its functional needs, including:  

- Serving static files 
- Handling client-side HTTP requests 
- Directing reqests to an external API and converting responses to JSON
- Sending JSON data from the API to the client
- Setting up a local server for development and testing
- Server port management for local and production environments

**Testing**
A Jasmine test suite for all server endpoints is in `./spec/static_spec.js`. `npm test` will run tests. 