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
  }
};
