const express = require('express')
const router = express.Router()

const stripeCheckout = async (req, res) => {
    // console.log("body", req.body)


    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        const { item } = req.body;
        console.log(item)

        const domainUrl = `${req.protocol}://${req.get('host')}`;



        const redirectURL =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : 'http://localhost:3000';

        const transformedItem = {
            price_data: {
                currency: 'usd',
                product_data: {
                    images: [item.image],
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [transformedItem],
            mode: 'payment',
            // optional start 
            invoice_creation: {
                enabled: true,
                invoice_data: {
                    description: `Invoice for ${item.name}`,
                    metadata: {
                        order: 'order-xyz',
                    },

                    custom_fields: [
                        {
                            name: 'Purchase Order',
                            value: 'PO-XYZ',
                        },
                    ],
                    rendering_options: {
                        amount_tax_display: 'include_inclusive_tax',
                    },
                    footer: 'Dwelling',
                },
            },
            // optional end

            success_url: `${domainUrl}/api/v2/paymentsuccess?session_id={CHECKOUT_SESSION_ID}&room_id=${item.room_id}`,
            cancel_url: redirectURL + '?status=cancel',
            metadata: {
                images: item.image,
            },
        });
        console.log('session id', session?.id)

        res.json({ id: session.id });





    }
    catch (err) {
        console.log("stripe error", err)
    }



}

module.exports = {
    stripeCheckout
}

