const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://dwelling:MMZeh8gRi7vQaNH5@dwelling.d0ysukh.mongodb.net/?retryWrites=true&w=majority";

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
const bookingDB = client.db("dwelling").collection("bookings");
const reviewsDB = client.db("dwelling").collection("reviews");
const roomsDB = client.db("dwelling").collection("rooms");
const propertyDB = client.db("dwelling").collection("properties");
const invoiceDB = client.db("dwelling").collection("invoice");
const paymentDB = client.db("dwelling").collection("payments");

module.exports = {
  connectDB,
  usersDB,
  bookingDB,
  reviewsDB,
  roomsDB,
  propertyDB,
  invoiceDB,
  paymentDB
};
