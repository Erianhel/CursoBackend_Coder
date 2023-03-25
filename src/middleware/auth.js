const authMdw = (req, res, next)=>{
    console.log("Revisando la session: ", req.session);
    if (req.session?.user) {
        return next();
    }
    return res.redirect("/login");
}

export default authMdw;