const cloudinary = require('cloudinary').v2 

exports.uploadImageToCloudinary =  async(file, folder, height, quality) =>{
    const options = {folder};
    //height and quality options se haam image compress kar sakte hai
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = 'auto' //auto determine the type of resource

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//Jalgoan Se Hu behanchode...