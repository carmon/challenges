## NodeJS: HTTP Server

As a NodeJS developer in your company, you have been assigned a
task to create an HTTP web server using only the HTTP core module.

The native core modules are very powerful in the Node ecosystem.
Using the HTTP module, you must create the web server, accept a
request for the GET /projects and POST /projects endpoint, perform
some validation, respond back with data, and also send back an error in
case the request URL to the server is not registered as a route.

Each project is a JSON entry with the following keys:
- id: The unique ID of the project.
- name: The name of the project.

Requirements for the web server:
1. The web server should be created using only the native HTTP
module .
2. The Server accepts requests only for GET /projects and POST
/projects endpoints.
3. Adding a new project: The server should add a new project by the
POST request at /projects.
    - The project JSON is sent in the request body.
    - The HTTP response code should be 201 after the project is
    created, with the JSON response having the entire list of
    projects.
    - If the ID sent in the request body already exists in the
    project's JSON array, return with status code 400 and the
    JSON body as {"message" : "BAD REQUEST"} .
    - Also, if the body of the request is not a valid JSON, return
    with the status code 400 and the JSON body as {"message"
    : "BAD REQUEST"} .
4. Returning all projects: The server responds with the JSON array
containing all the projects in a GET request at /projects. The HTTP
response code should be 200.
5. If the request to the web server contains a route other than GET
/projects or POST /projects, respond back with the HTTP status
code 404.
6. Make sure that the server is listening for requests on port 8000.
External tools will not be able to connect to any other port other
than 8000 if you are using the online IDE.

Note: A file, data-store.js, with an array of projects are present in the
root of the project. Import the data from this file, as shown below:

```
// index.js
var projects = require('./data-store');
// For POST request, add the new item to the
projects array.
// For GET requests, send the data from the
projects array.
// Write Your server logic here
```