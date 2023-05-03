var stripe = require('stripe')("serverSidePublishableKey")
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        console.debug("BODY", req.body)
        const customer = await stripe.customers.create({
            email: "email@gmail.com",
            name: "Martin Voda",
            phone: "420420420",
        })
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: 6900,
                currency: "czk",
                customer: customer.id,
                payment_method_types: ["card"],
            },
            {stripeAccount: "stripeAccountId"}
        )
        const ephemeralKey = await stripe.ephemeralKeys.create({customer: customer.id}, {apiVersion: "2022-11-15"})
        res.send({paymentIntent: paymentIntent.client_secret, ephemeralKey: ephemeralKey.secret, customer: customer.id})
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error?.toString())
    }
});

module.exports = router;
