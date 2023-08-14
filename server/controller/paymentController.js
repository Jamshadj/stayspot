import Razorpay from 'razorpay'
import crypto from 'crypto'
import Stripe from 'stripe';
import bookingModel from '../models/bookingModel.js';
import userModel from '../models/userModel.js';
import propertyModel from '../models/propertyModel.js';
import hostModel from '../models/hostModel.js';

const stripe = Stripe("sk_test_51NbSNASISA5Tam1zrEocL4EIZxaWjowsNcYgPkOvoNviE5drZ5ak6zzfT1Wj5eJY1nxoeLVOMCdh2bWk7tS5uYz200XAUFwjGA")
let instance = new Razorpay({
  key_id: "rzp_test_3qgmRXzHbaIU3G",
  key_secret: "dkYqSUoji4OpW4vSoOPraomb",
});

export default {
postCheckout: async (req, res) => {
    try {
      const { checkInDate, hostId, checkOutDate, listingId, guests, numberOfNights, userId, totalAmount } = req.body;
      const cancelUrl = `http://localhost:3000/reserve?listingId=${listingId}&nights=${numberOfNights}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${guests}`;
      const listing = await propertyModel.findById(listingId);
      const user = await userModel.findById(userId);
      await hostModel.findByIdAndUpdate(listing.hostId, { $inc: { balance: +totalAmount } });
      const bookingResponse = await bookingModel.create({
        userId, hostId,listingId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount
      });
      console.log(bookingResponse,"dew");
    
  
      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          { 
            price_data: {
              currency: "inr",
              product_data: {
                name: listing.title,
                images: [
                  listing.images[0]      
                ],
              },
              unit_amount: totalAmount * 100,
            },
            quantity: 1, // Move quantity outside of price_data
          },
        ],
        mode: "payment",
        customer_email: user.email,
        success_url: `http://localhost:3000/order-success?bookingId=${bookingResponse._id}`, // Corrected success URL
        cancel_url:cancelUrl,   // Corrected cancel URL
      });
      
  console.log(session.url,"url");
      res.json({ URL:session.url}); // Sending the session ID back to the frontend
    } catch (error) {
      console.error("errom",error);
      res.status(500).json({ error: 'An error occurred while creating the payment.' });
    }
  },
  getOrderSucess: async (req, res) => {
    console.log("dss");
    try {
      // Extract any necessary information from the query parameters or request body
      const { userId,hostId, listingId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount } = req.query;
      console.log(req.query);
      console.log("req.body",req.body.userId);
      // Create a new booking using the extracted information
      const newBooking = new bookingModel({
        userId,
        checkInDate,
        checkOutDate,
        listingId,
        guests,
        numberOfNights,
        totalAmount
      });
  
      // Save the new booking to the database
      const bookingResponse = await newBooking.save();
      console.log("boking de",bookingResponse);
      res.redirect(`/order-success?bookingId=${bookingResponse._id}`);
      // You can also perform any additional actions or send a response as needed
      res.json({ message: 'Booking saved successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the successful payment.' });
    }
  },
  paymentOrder:async (req,res)=>{
    console.log("payment");
    try {
      const {amount}=req.body;
      console.log(amount);
      var options = {
          amount: amount * 100,  // amount in the smallest currency unit
          currency: "INR",
      };
      instance.orders.create(options, function (err, order) {
          if (err) {
              console.log(err)
              res.json({ err: true, message: "server error" })
          } else {
              res.json({ err: false, order })
          }
      });

    } catch (error) {
       
    }
  },
  paymentVerify:async (req,res)=>{
    try {
      console.log("payment verify");
  
      // Extract necessary information from the request body
      const { userId, listingId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount } = req.body.details;
      const { response } = req.body;
      console.log(req.body.details,"der");
      const body = response.razorpay_order_id + "|" + response.razorpay_payment_id;
      const listing = await propertyModel.findById(listingId);
      // Calculate the signature
      const expectedSignature = crypto
        .createHmac('sha256', "dkYqSUoji4OpW4vSoOPraomb") // Replace with your actual Razorpay Secret Key
        .update(body)
        .digest('hex');
  
      if (expectedSignature === response.razorpay_signature) {
        console.log("Signature matched");
        try {
          console.log(req.body.userId,"userId");
          await hostModel.findByIdAndUpdate(listing.hostId, { $inc: { wallet: +totalAmount } });
          const bookingResponse = await bookingModel.create({
            userId, listingId,hostId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount
          });
          console.log(bookingResponse, "res");
          return res.json({ 
            err: false,
            bookingResponse
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            err: true,
            message: "Error while saving booking"
          });
        }
      } else {
        console.log("Signature mismatch");
        return res.json({
          err: true,
          message: "Payment verification failed"
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        err: true,
        message: "An unexpected error occurred"
      });
    }
  }


}