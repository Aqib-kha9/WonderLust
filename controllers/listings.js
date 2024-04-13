const Listing = require("../models/listing");


module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new");
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listings = await Listing.findById(id)
        .populate({
            path:"reviews",
            populate:{
                path: "author"
            }
        })
        .populate("owner");
        
    if(!listings){
        req.flash("error", "Listing you requested is not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listings});
};

module.exports.createListing = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = await Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename}
    await newListing.save();
    req.flash("success", "New listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    let listings = await Listing.findById(id);
    if(!listings){
        req.flash("error","Listing you requested does not exits!");
        res.redirect("/listings");   
    }
    let originalImageUrl = listings.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_150,w_200");
    res.render("listings/edit.ejs",{listings,originalImageUrl});
};

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename}
        await listing.save();
    }
    req.flash("success", "Listing Edited!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyeListing = async (req,res)=>{
    let {id} = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    // console.log(deletedlisting);
    req.flash("success", "Listing was Deleted!");
    res.redirect("/listings");
};