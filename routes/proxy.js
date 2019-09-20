const express = require ('express')
const router = express.Router()
const bodyParser = require('body-parser')
const request = require('request-promise')


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/locator', (req,res) => {
    let latitude = req.query.lati;
    let longitude = req.query.longi;
    let radius = req.query.radi;

    let options = {
        method: 'GET',
        uri: `https://api.hsbc.com/x-open-banking/v2.2/branches/geo-location/lat/${latitude}/long/${longitude}?radius=${radius}`,
        json: true
      }

    console.log("Locator request made with params : ",[latitude,longitude,radius])
    console.log(console.log(options.uri))
    
    request(options).then(function (response) {
        res.json(response)
        console.log(response["data"][0]["Brand"][0]["Branch"][0]["Name"])
    })
    .catch(function (err) {
        console.log(err)
    })
})

module.exports = router