const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");
const ListingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
         next();
    }
};

// Index route
router.get("/", wrapAsync (ListingController.index));

// new route
router.get("/new", isLoggedIn, ListingController.renderNewForm)

// Create route - To perform create operations
router.post("/",upload.single("listing[image]"), isLoggedIn, validateListing, wrapAsync(ListingController.createListing));

// Show route - To perform read operations
router.get("/:id", wrapAsync(ListingController.showListing));

// edit route
router.get(
    "/:id/edit", 
    isLoggedIn, 
    wrapAsync (ListingController.renderEditForm));

// update route
router.put(
    "/:id", 
    isLoggedIn,
    upload.single("listing[image]"), 
    validateListing, 
    wrapAsync (ListingController.updateListing));

// delete route
router.delete(
    "/:id",
    isLoggedIn,
    wrapAsync (ListingController.destroyListing));

module.exports = router;