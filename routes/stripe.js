const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {

    // no longer supported in india...
    // stripe.charges.create(
    //     {
    //         source: req.body.tokenId,
    //         amount: req.body.amount,
    //         currency: "usd",
    //     },
    //     (stripeErr, stripeRes) => {
    //         if (stripeErr) {
    //             res.status(500).json(stripeErr);
    //         } else {
    //             res.status(200).json(stripeRes);
    //         }
    //     }
    // );

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000',
    });
    res.send(session)
});

module.exports = router;