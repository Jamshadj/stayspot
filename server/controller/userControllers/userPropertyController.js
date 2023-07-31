import propertyModel from '../../models/propertyModel.js';
import hostModel from '../../models/hostModel.js'
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

      const { propertyId } = req.params; // Get the propertyId from the request parameters
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
  
};
