const User = require('../models/user');
const axios = require('axios');
module.exports.index = async (req, res) => {
    const {query} = req;
    const refId = req.query.refId;
    const amt = req.query.amt;
    const oid = req.query.oid;

    // <input value="<%= resource.price%>" name="amt" type="hidden">
    // <input value="EPAYTEST" name="scd" type="hidden">
    // <input value="<%= resource._id %>" name="pid" type="hidden">
    // <input value="00048A1" name="rid" type="hidden"></input>


    const url = "https://uat.esewa.com.np/epay/transrec";
    const response = await axios({
            url,
            method: 'GET',
            params: {
                amt : amt,
                scd : 'EPAYTEST',
                pid : oid,
                rid : refId
            }
        })
        console.log('response',response.data);
    
        const result = response.data.replace(/<[^>]+>/g, '');
        console.log(result.trim());
        if(result.trim() === 'Success'){
            let userData = await User.findById(req.params.id);
            userData.bought_resource.push(oid);
            userData.save();
            console.log(userData);
            req.flash('success', 'Successfully Bought the resource!');
            res.redirect(`/resources`);
        }


        // if(response === 'su')

    // const resources = await Resource.find({});
    // res.render('resources/index', { resources })
}



