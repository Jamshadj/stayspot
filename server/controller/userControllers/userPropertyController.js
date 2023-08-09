import propertyModel from '../../models/propertyModel.js';
import hostModel from '../../models/hostModel.js';
import userModel from '../../models/userModel.js';
import bookingModel from '../../models/bookingModel.js';
export default {
  getListings: async (req, res) => {
    try {
      const { status } = req.query;
      const filter = status ? { status } : {}; // If status is provided, use it as a filter; otherwise, return all listings
  
      const listings = await propertyModel.find(filter);
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
  addToWishList: async (req, res) => {
    try {
      const { propertyId, userId } = req.body;
      const user = await userModel.findByIdAndUpdate(
        userId,
        { $addToSet: { wishlist: propertyId } }, // Adding the id to the wishlist array, avoiding duplicates
        { new: true } // To get the updated user document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Successfully added to wishlist', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  removeFromWishList: async (req, res) => {
    try {
      const { propertyId, userId } = req.body;
      const user = await userModel.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: propertyId } }, // Removing the id from the wishlist array
        { new: true } // To get the updated user document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Successfully removed from wishlist', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  getWishList: async (req, res) => {
    try {
      const { propertyId, userId } = req.params; // Use params instead of body for fetching data
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const propertyExistsInWishlist = user.wishlist.includes(propertyId);
  
      res.json({ message: 'Wishlist item status fetched', propertyExistsInWishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getWishLists: async (req, res) => {
    try {
      
      const { userId } = req.params; // Use params instead of body for fetching data
      console.log(userId);
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Wishlist fetched', wishlist: user.wishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }  
  },
  getReservationsById: async (req, res) => {
    try {
      const { userId } = req.params; // Use params instead of body for fetching data
      const bookings = await bookingModel.find({userId:userId});
      console.log("fe",bookings);
  
      if (!bookings) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json({ message: 'booking item status fetched',bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  // getMatchingListings: async (req, res) => {
  //   const latitude = parseFloat(req.query.latitude);   // Convert to float
  //   const longitude = parseFloat(req.query.longitude); // Convert to float
  
  //   // Define a radius for proximity search (adjust as needed)
  //   const searchRadius = 0.1; // For example, a radius of 0.1 degrees (~10km)
  
  //   // Construct a query based on coordinates
  //   const listings = await propertyModel.find({
  //     "coordinates.latitude": { $gte: latitude - searchRadius, $lte: latitude + searchRadius },
  //     "coordinates.longitude": { $gte: longitude - searchRadius, $lte: longitude + searchRadius }
  //   });
  //   console.log(listings,"lis");
  
  //   res.json(listings); 
  // }
  
  

  
   
  
  
  
};
