export const validdate=(schema)=>(req, res, next)=>{
     
    const result =schema.safeParse(req.body)

    if(!result.success){
        const formated=result.error.format()
        console.log(formated)


        return res.status(400).json({
            success:false,
            message:'validation failed',
            errors: Object.keys(formated).map(field=>({
                field,
                message:formated[field]?._errors?.[0] || 'invalid input'
            }))
        })
    }

    next()
}