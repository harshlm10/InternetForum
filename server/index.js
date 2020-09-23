const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
const cors = require('cors')
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));
app.use(cookieparser());
app.use(express.json());
const fs = require("fs");
const options = {
    key: fs.readFileSync("../SSL/privatekey.pem"),
    cert: fs.readFileSync("../SSL/certificate.pem"),
};
const server = require('https').createServer(options, app)
const PORT = process.env.PORT || 5000;
const loginRoute = require('./routers/login')
const signupRoute = require('./routers/signup')
const homeRoute = require('./routers/home')
const logoutRoute = require('./routers/logout')
const createtopicRoute = require('./routers/home/createtopic')
const feedRoute = require('./routers/home/feed')
const Initialization = require("./Initialization/Intialization");
const Socket = require('./Chat/Socket')
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

Initialization()
Socket(server)

app.use(homeRoute)
app.use(loginRoute)
app.use(signupRoute)
app.use(logoutRoute)
app.use(createtopicRoute)
app.use(feedRoute)