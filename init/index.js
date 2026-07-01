if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Establish a Connection
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;


main()
  .then (() => {
     console. log("connected to Database");
   })
  .catch((err) => {
     console. log(err);
   });


async function main() {
    await mongoose.connect(dbUrl);
}

//Intialize the database
const initDB = async () => {
    try {
        await Listing.deleteMany({});
        const result = await Listing.insertMany(initData.data);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

initDB();