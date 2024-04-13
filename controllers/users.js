const User = require("../models/user");



module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signUp.ejs");
};


module.exports.signUp = async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser =  new User({email, username});
        const registerUser = await User.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("signUp");
    }  
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};


module.exports.login = async(req,res)=>{
    req.flash("success","Welcom to the wonderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
    });
    req.flash("success","Welcom to the wonderlust");
    res.redirect("/listings");
}