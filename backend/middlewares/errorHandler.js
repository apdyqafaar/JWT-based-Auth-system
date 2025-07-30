export const erroreHandler=(err, req, res,next)=>{
       const status=err.statusCode || 500;

    res.status(status).send({
        status,
        success:false,
        message:err.message ||'something went wrong!'
    })

}