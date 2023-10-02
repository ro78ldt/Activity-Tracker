# Activity-Tracker

Activity tracker is a full stack application to track an user's fitness. It takes input from the user and allows the users to record and track their workouts and meals,
providing them with a comprehensive overview of their fitness progress. The user details are stored in Mongo DB data base in an encrypted format.

<h1>Tech stack</h1>
Client: HTML, CSS, JS
Server: Node JS, Express JS
Database: Mongo DB
I have used Handlebars templating for this application. It guarantees minimal template complexity and operates as a logicless templating engine, diligently maintaining a clear boundary between the presentation layer and the underlying code.
It seamlessly integrates with Express as the hbs module, conveniently accessible via npm.

<h1>Features of my application</h1>
1. Authentication of the user using JSON Web Tokens (JWT) which are created when an user signs up. It can be used for an authentication system and can also be used for information exchange. The token is mainly composed of header, payload, signature. These three parts are separated by dots(.).
2. Encryption of user password using Bcrypt JS. Bcrypt is a valuable tool to use to hash and store passwords. Its major benefits include: Slow runtime. Bcrypt is a slow-functioning algorithm that takes time to create password hashes and requires time to decrypt them, significantly slowing hacker attempts to break the bcrypt hash. Below is an evidence that we are storing the password of an user, in an encrypted manner, in the database.
3. Displaying the user data in the form of a chart, computation and display of net calories and average workout duration
