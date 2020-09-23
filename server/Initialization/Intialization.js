let client

const RedisConnection = dotenv => {
    dotenv.config()
    const redis = require('redis');
    const redisHost = process.env.REDIS_HOST;
    const redisPort = process.env.REDIS_PORT;
    const redisAuth = process.env.REDIS_PASSWORD;

    client = redis.createClient({
        port: redisPort,
        host: redisHost
    });

    client.auth(redisAuth, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            console.log(response)
        }
    });

    client.on('connect', (error) => {
        console.log('Redis Connected!!')

    })
}

const MongooseConnection = () => {
    const mongoose = require('mongoose')
    const dotenv = require("dotenv");
    dotenv.config();
    const uri = process.env.ATLAS_URI
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    const connection = mongoose.connection
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', () => {
        console.log("Connected to Mongo!!")
        RedisConnection(dotenv)
    })
}
const Initialization = () => {
    MongooseConnection()

}



module.exports = Initialization , client