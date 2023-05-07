const authMdw = (req, res, next)=>{
    console.log("Revisando la session: ", req.session);
    if (req.session?.user) {
        return next();
    }
    return res.redirect("/login");
}

export const authorization = (role) =>{
    return async(req,res,next)=>{
        if(!req.user) return res.status(401).send({error:"Unauthorized"});
        if(req.user.user.rol!=role) return res.status(403).send({error:"No permissions"});
        next();
    }
}

export default authMdw;