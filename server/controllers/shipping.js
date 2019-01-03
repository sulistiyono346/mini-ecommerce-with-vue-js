
const axios = require('axios')
module.exports = {
    get_province: (req, res) => {
        axios({
            method: 'GET',
            url: 'https://api.rajaongkir.com/starter/province',
            headers: {
                key: process.env.KEY_ID
            }
        })
            .then((result) => {
                res.status(200).json(result.data.rajaongkir.results)
            }).catch((err) => {
                res.status(500).json(err)
            });
    },
    get_city: (req, res) => {
        axios({
            method: 'GET',
            url: `https://api.rajaongkir.com/starter/city?province=${req.params.id}`,
            headers: {
                key: process.env.KEY_ID
            }
        })
            .then((result) => {
                res.status(200).json(result.data.rajaongkir.results)
            }).catch((err) => {
                res.status(500).json(err)
            });
    },
    get_service: (req, res) => {

        let courier = req.body.courier
        let data_courier = courier.toLowerCase()

        axios({
            method: 'POST',
            url: `https://api.rajaongkir.com/starter/cost`,
            headers: {
                key: process.env.KEY_ID
            },
            data: {
                origin: '153',
                destination: req.body.destination,
                weight: 1000,
                courier: data_courier
            }
        })
            .then((result) => {
                res.status(200).json(result.data.rajaongkir.results[0].costs)
            }).catch((err) => {
                res.status(500).json(err)
            });

    },

}