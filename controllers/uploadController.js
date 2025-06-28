import cloudinary from "../utils/cloudinary.js";


export const uploadFile=(req, res, next)=>{
     
    if(!req.file) {
        return res.status(401).json("no file was uploaded !")
    }

    const stream= cloudinary.uploader.upload_stream(
        {folder:'ccn_folder', resource_type:"auto"},
        (error, result)=>{
            if(error) return next(error)

            return res.status(201).send({
                success:true, 
                fileUrl:result.secure_url
            })
        }
    )

    stream.end(req.file.buffer)
}