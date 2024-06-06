import Razorpay from 'razorpay';
import crypto from 'crypto';
import Stripe from 'stripe';
import bookingModel from '../models/BookingModel.js';
import userModel from '../models/UserModel.js';
import propertyModel from '../models/PropertyModel.js';
import hostModel from '../models/HostModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET_KEY,
});

export default {
// Perform the checkout process

postCheckout: async (req, res) => {
  try {
    const {
      listingId,
      numberOfNights,
      checkInDate,
      checkOutDate,
      guests,
      userId,
      totalAmount,
    } = req.body;
    // Validate input data here

    const listing = await propertyModel.findById(listingId);
    const user = await userModel.findById(userId);

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: listing.title,
              images: [listing.images[0]],
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: user.email,
      success_url: `http://13.211.197.32/order-success?bookingDetails=${encodeURIComponent(JSON.stringify(req.body))}`,
      cancel_url: `https://spotstay.netlify.app/reserve?listingId=${listingId}&nights=${numberOfNights}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${guests}`,
    });
    // Send a response with the session URL
    res.json({ URL: session.url });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while creating the payment.' });
  }
},

// Handle successful payment
getOrderSuccess: async (req, res) => {
  try {
    // Retrieve the booking details from the query parameter
    const bookingDetails = JSON.parse(req.query.bookingDetails);

    const listing = await propertyModel.findById(bookingDetails.listingId);

    // Update the host's balance
    await hostModel.findByIdAndUpdate(listing.hostId, { $inc: { balance: +bookingDetails.totalAmount } });

    // Store booking details in the database
    const newBooking = new bookingModel({
      userId: bookingDetails.userId,
      checkInDate: bookingDetails.checkInDate,
      checkOutDate: bookingDetails.checkOutDate,
      listingId: bookingDetails.listingId,
      guests: bookingDetails.guests,
      hostId: bookingDetails.hostId,
      numberOfNights: bookingDetails.numberOfNights,
      totalAmount: bookingDetails.totalAmount,
    });

    const bookingResponse = await newBooking.save();

    res.redirect(`https://spotstay.netlify.app/order-success?bookingId=${bookingResponse._id}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the successful payment.' });
  }
},


//razor pay controller
paymentOrder: async (req, res) => {
  try {
    const { amount } = req.body;
    const amountInSmallestUnit = amount * 100; // Convert amount to the smallest currency unit

    const options = {
      amount: amountInSmallestUnit,
      currency: "INR",
    };

    // Create a payment order
    instance.orders.create(options, function (err, order) {
      if (err) {
        console.error("Error:", err);
        res.status(500).json({ err: true, message: "Server error" });
      } else {
        res.json({ err: false, order });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ err: true, message: "An unexpected error occurred" });
  }
},


paymentVerify: async (req, res) => {
  try {
    const { userId, listingId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount } = req.body.details;
    const { response } = req.body;

    const body = `${response.razorpay_order_id}|${response.razorpay_payment_id}`;
    
    const listing = await propertyModel.findById(listingId);
    
    // Calculate the signature
    const hmac = crypto.createHmac('sha256', process.env.RAZOR_PAY_SECRET_KEY);
    hmac.update(body);
    const expectedSignature = hmac.digest('hex');

    if (expectedSignature === response.razorpay_signature) {
      // Payment signature matches, proceed with booking
      try {
        await hostModel.findByIdAndUpdate(listing.hostId, { $inc: { wallet: +totalAmount } });
        const bookingResponse = await bookingModel.create({
          userId,
          listingId,
          hostId: listing.hostId,
          checkInDate,
          checkOutDate,
          guests,
          numberOfNights,
          totalAmount,
        });

        return res.json({
          err: false,
          bookingResponse,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          err: true,
          message: "Error while saving booking",
        });
      }
    } else {
      // Signature doesn't match, indicate payment verification failure
      console.log("Payment verification failed");
      return res.json({
        err: true,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      err: true,
      message: "An unexpected error occurred",
    });
  }
}


}