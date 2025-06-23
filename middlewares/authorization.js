
export const authorize=(...roles)=>{
   return (req, res, next)=>{
      if(!roles.includes(req.user.role)) return res.status(401).json(`access denied ! for this role ${roles}`)


        next()
   }
}