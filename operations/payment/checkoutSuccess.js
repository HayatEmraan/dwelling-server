const { paymentDB } = require('../../db/mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const checkoutSuccess = async (req, res) => {
    const { session_id, room_id } = req.query;
    try {
        const sessionData = await stripe.checkout.sessions.retrieve(session_id);
        console.log(sessionData)
        const { amount_total, customer, customer_details, created, currency, invoice, metadata, payment_intent, status } = sessionData || {}
        const paymentData = {
            room_id,
            amount_total: amount_total / 100,
            transaction_id: customer,
            payment_time: created,
            currency,
            email: customer_details?.email,
            invoice,
            image: metadata?.images,
            payment_intent,
            status
        }
        const payments = await paymentDB.insertOne(paymentData)
        await res.redirect('https://www.facebook.com/')
    }
    catch (err) {
        console.log('payment success error', err)
    }


}
module.exports = {
    checkoutSuccess
}