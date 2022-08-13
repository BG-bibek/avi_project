const Resource = require('../models/resource');
const cloudinary = require("../helper/cloudinary");

module.exports.index = async (req, res) => {
    const resources = await Resource.find({});
    res.render('resources/index', { resources })
}

module.exports.renderNewForm = (req, res) => {
    res.render('resources/new');
}

module.exports.createResource = async (req, res, next) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        let thumbnail = result.secure_url.split('.');
        thumbnail.pop();
        thumbnail.push('jpg');
        const resourcePayload = {
         ...req.body.resource,
         avatar: result.secure_url,
        cloudinary_id: result.public_id,
        thumbnail : thumbnail.join('.')
        }
        const resource = new Resource(resourcePayload);
        resource.author = req.user._id;
        await resource.save();
        req.flash('success', 'Successfully made a new resource!');
        res.redirect(`/resources/${resource._id}`)
    }catch(err){console.log(err)}
}

module.exports.showResource = async (req, res,) => {
    const resource = await Resource.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!resource) {
        req.flash('error', 'Cannot find that resource!');
        return res.redirect('/resources');
    }
    res.render('resources/show', { resource });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const resource = await Resource.findById(id)
    if (!resource) {
        req.flash('error', 'Cannot find that resource!');
        return res.redirect('/resources');
    }
    res.render('resources/edit', { resource });
}

module.exports.updateResource = async (req, res) => {
    try{
        let resource = await Resource.findById(req.params.id);
        await cloudinary.uploader.destroy(resource.cloudinary_id);
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const data = {
            ...req.body.resource,
            avatar: result?.secure_url || resource.avatar,
            cloudinary_id: result?.public_id || resource.cloudinary_id,
        };
        resource = await Resource.findByIdAndUpdate(req.params.id, data, { new: true });
        req.flash('success', 'Successfully updated resource!');
        res.redirect(`/resources/${resource._id}`)
    }catch(err){
        console.log(err);
        throw new Error(err.message);
    }
   
}

module.exports.deleteResource = async (req, res) => {
    try {
        let resource = await Resource.findById(req.params.id);
        await cloudinary.uploader.destroy(resource.cloudinary_id);
        await resource.remove();
        req.flash('success', 'Successfully deleted resource')
        res.redirect('/resources');
    } catch (err) {
        console.log(err);
    }    
}