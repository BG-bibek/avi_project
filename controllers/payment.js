const Resource = require('../models/resource');
const cloudinary = require("../helper/cloudinary");
const axios = require('axios');
module.exports.index = async (req, res) => {
    const {query} = req;
    const refId = req.query.refId;
    const amt = req.query.amt;
    const oid = req.query.oid;
    console.log(refId, amt);
    console.log('111111111111111111111111111111111111111111111111111111111111111111111111111111111');

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
    

        // if(response === 'su')

    // const resources = await Resource.find({});
    // res.render('resources/index', { resources })
}



