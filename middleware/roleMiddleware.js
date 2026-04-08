


const verifyAdmin = (req,res,next)=>
{
     console.log(req.user.role);
    if(req.user.role !== 'admin')
    {
        return res.status(403).json({message:"Not authorised"})
    }

   
    
    next();
}


module.exports = verifyAdmin;