const express = require ('express')
const router = express.Router()
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/checkin', (req,res) => {
    let lati = req.lati;
    let longi = req.longi;

    console.log(req.query.lati)
    console.log(req.query.longi)
})

module.exports = router