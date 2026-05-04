const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Review = require("./models/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then (() => {
     console. log("connected to DB");
   })
  .catch((err) => {
     console. log(err);
   });


async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// to able to deconstruct or to parse the object
app.use(express.urlencoded ({extended : true}));
app.use(methodOverride("_method"));

// ejs-mate
app.engine("ejs", ejsMate);

// to serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("/",(req, res) => {
    res.send("HI, i am root.")
})

// Index route
app.get("/listings",async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings});
});

// new route
app.get("/listings/new", async (req, res) => {
    res.render("listings/new.ejs");
})

// Create route - To perform create operations
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

// Show route - To perform read operations
app.get("/listings/:id",async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing})
})

// edit route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})

// update route
app.put("/listings/:id",async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

// delete route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

//Reviews
//Post Route
app.post("/listings/:id/reviews", async (req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing ._id}`);
})
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new listing({
//          title: "My New Villa",
//          description: "By the beach",
//          price: 1200,
//          location: "Calangute, Goa",
//          country: "India",
// });
//     await sampleListing.save();
//     console. log ("sample was saved");
//     res.send("successful testing")
// });

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
})