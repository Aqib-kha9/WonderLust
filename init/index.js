const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");


const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main().then(()=>{
    console.log("connecting to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner:"6601e3f9e60b2a9a04d43b58"}))
    await Listing.insertMany(initData.data);

    console.log("data was saved")
};

initDB();