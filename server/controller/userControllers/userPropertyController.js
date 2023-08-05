import propertyModel from '../../models/propertyModel.js';
import hostModel from '../../models/hostModel.js';
import Stripe from 'stripe';
import bookingModel from '../../models/bookingModel.js';
import userModel from '../../models/userModel.js';
import Razorpay from 'razorpay'
const stripe = Stripe("sk_test_51NbSNASISA5Tam1zrEocL4EIZxaWjowsNcYgPkOvoNviE5drZ5ak6zzfT1Wj5eJY1nxoeLVOMCdh2bWk7tS5uYz200XAUFwjGA")
export default {
  getListings: async (req, res) => {
    try {
      const { status } = req.query;
      const filter = status ? { status } : {}; // If status is provided, use it as a filter; otherwise, return all listings
  
      const listings = await propertyModel.find(filter);
      console.log(listings);
      res.json({ err: false, listings });
    } catch (err) {
      console.error('Error retrieving listings:', err);
      res.status(500).json({ err: true, message: 'Error retrieving listings' });
    }
  },  

  getListingById: async (req, res) => {
    try {
     console.log("grt property");
      const  propertyId  = req.params; // Get the propertyId from the request parameters
      console.log(req.params);
      console.log(propertyId.propertyId,"drd");
      const property = await propertyModel.findById({ _id: propertyId.propertyId }).lean();
  
      if (!property) { 
        return res.status(404).json({ error: 'Property not found' });
      }
  
      res.json(property);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },  
  getHostById: async (req, res) => {
    try {
      console.log("de", req.params);
      const { hostId } = req.params; // Get the hostId from the request parameters
      console.log(hostId, "HostId");
      const host = await hostModel.findById({ _id: hostId }).lean();
  
      if (!host) {
        return res.status(404).json({ error: 'Host not found' });
      }
  
      res.json(host);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  postCheckout: async (req, res) => {
    try {
      const { checkInDate, checkOutDate, listingId, guests, numberOfNights, userId, totalAmount } = req.body;
      const cancelUrl = `http://localhost:3000/reserve?listingId=${listingId}&nights=${numberOfNights}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${guests}`;
      const listing = await propertyModel.findById(listingId);
      const user = await userModel.findById(userId);
  
    
  
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
              unit_amount: listing.pricePerNight * 100,
            },
            quantity: 1, // Move quantity outside of price_data
          },
        ],
        mode: "payment",
        customer_email: user.email,
        success_url: 'http://localhost:3000/order-success', // Corrected success URL
        cancel_url:cancelUrl,   // Corrected cancel URL
      });
      
  console.log(session.url,"url");
      res.json({ URL:session.url}); // Sending the session ID back to the frontend
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the payment.' });
    }
  },
  getOrderSucess: async (req, res) => {

    try {
      // Extract any necessary information from the query parameters or request body
      const { userId, listingId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount } = req.query;
  
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
      console.log(bookingResponse);
      res.redirect('/order-success');
      // You can also perform any additional actions or send a response as needed
      res.json({ message: 'Booking saved successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the successful payment.' });
    }
  }
  
  
};
