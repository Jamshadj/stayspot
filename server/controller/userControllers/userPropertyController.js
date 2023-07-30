import propertyModel from '../../models/propertyModel.js';

export default {
  getListings: async (req, res) => {
    try {
      const listings = await propertyModel.find();
      console.log(listings);
      res.json({ err: false, listings });
    } catch (err) {
      console.error('Error retrieving listings:', err);
      res.status(500).json({ err: true, message: 'Error retrieving listings' });
    }
  },

  getListingById: async (req, res) => {
    try {
      console.log("de");
      const { propertyId } = req.params; // Get the propertyId from the request parameters
      console.log(propertyId, "de");
      const property = await propertyModel.findById({ _id: propertyId }).lean();
  
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
  
      res.json(property);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },  
};
