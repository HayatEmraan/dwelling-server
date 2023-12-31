require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dwelling.d0ysukh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

const usersDB = client.db("dwelling").collection("users");
const reviewsDB = client.db("dwelling").collection("reviews");
const roomsDB = client.db("dwelling").collection("rooms");
const propertyDB = client.db("dwelling").collection("properties");
const invoiceDB = client.db("dwelling").collection("invoice");
const paymentDB = client.db("dwelling").collection("payments");
const hostDB = client.db("dwelling").collection("host");
const pendingPaymentDB = client.db("dwelling").collection("pendingPayment");

module.exports = {
  connectDB,
  usersDB,
  reviewsDB,
  roomsDB,
  propertyDB,
  invoiceDB,
  paymentDB,
  hostDB,
  pendingPaymentDB,
};
