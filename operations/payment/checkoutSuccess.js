
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkoutSuccess = async (req, res) => {
    const { session_id } = req.query;
    try {
        const sessionData = await stripe.checkout.sessions.retrieve(session_id);
        console.log('sessionData', sessionData)

        const customerData = await stripe.customers.retrieve(sessionData.customer);

        await res.redirect('https://www.facebook.com/')
    }
    catch (err) {
        console.log('payment success error', err)
    }


}
module.exports = {
    checkoutSuccess
}