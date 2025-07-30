export const notFound=(req, res, next)=>{

    const error=new Error('this rout not found')
    next(error)
}