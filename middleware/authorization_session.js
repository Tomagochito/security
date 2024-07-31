 /* Autorización */

 var authorizationSession = (req, res, next) => {
    if(process.env.ALL_GRANTED.includes(req.session.role)) {
        return next()
    } 
   else if(process.env.ONLY_USER.includes(req.sesion.role)){return res.redirect("/ticket")}
    else{
        return res.redirect("/")
      // return res.redirect("/ticket")
    }
    
}

module.exports = authorizationSession;