// Import necessary modules
import cloudinary from '../../helper/config.js';
import propertyModel from '../../models/propertyModel.js';

export default {
  // Add a new property to the database
  postAddProperty: async (req, res) => {
    try {
      const propertyDetails = req.body;

      // Upload property images to Cloudinary and store the URLs
      let images = [];
      for (let item of req.body.images) {
        const result = await cloudinary.uploader.upload(item, {
          folder: 'property'
        });
        images.push(result);
      }

      // Create a new property document with the provided property details
      const newProperty = await propertyModel.create({
        structure: propertyDetails.structure,
        privacyType: propertyDetails.privacyType,
        location: propertyDetails.location,
        images,
        coordinates: {
          latitude: propertyDetails.coordinates[1],
          longitude: propertyDetails.coordinates[0],
        },
        address: {
          country: propertyDetails.address.country,
          city: propertyDetails.address.city,
          postCode: propertyDetails.address.postCode,
          region: propertyDetails.address.region,
          houseNumber: propertyDetails.address.houseNumber,
          area: propertyDetails.address.area,
          streetAddress: propertyDetails.address.streetAddress,
          landMark: propertyDetails.address.landMark,
        },
        floorPlan: propertyDetails.floorPlan.map((plan) => ({
          type: plan.type,
          count: plan.count,
        })),
        amenities: propertyDetails.amenities,
        title: propertyDetails.title,
        description: propertyDetails.description,
        pricePerNight: propertyDetails.pricePerNight,
        hostId: propertyDetails.hostId
      });

      res.json({ error: false, property: newProperty });
    } catch (error) {
      console.error("Error occurred while adding property:", error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  },

  // Update dates for all properties in the database
  setDates: async (req, res) => {
    try {
      const { startDate, endDate, minimumStay, maximumStay } = req.body;

      // Update 'startDate', 'endDate', 'minimumStay', and 'maximumStay' fields in propertyModel
      await propertyModel.updateMany({}, {
        $set: {
          startDate,
          endDate,
          minimumStay,
          maximumStay
        }
      });

      res.status(200).json({ success: true, message: 'Dates updated successfully' });
    } catch (error) {
      console.error('Error occurred during updating dates:', error);
      res.status(500).json({ success: false, message: 'Error occurred during updating dates' });
    }
  },

  // Get all properties associated with a specific host
  getProperties: async (req, res) => {
    try {
      const hostId = req.params.hostId;
      console.log('Host ID:', hostId);

      // Find all properties with the given hostId
      const properties = await propertyModel.find({ hostId: hostId });
      console.log('Properties:', properties);

      res.json({ properties });
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  },

  // Get property details based on propertyId
  getProperty: async (req, res) => {
    try {
      const propertyId = req.params.propertyId;
      const propertyDetails = await propertyModel.findOne({ _id: propertyId });

      res.json({ propertyDetails });
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  },

  // Update basic details (title, description, and status) of a property
  postPropertyEditBasics: async (req, res) => {
    try {
      const { propertyId, title, description, status } = req.body;

      // Update 'title', 'description', and 'status' fields in propertyModel
      await propertyModel.findByIdAndUpdate(propertyId, {
        title,
        description,
        status,
      });

      res.status(200).json({ success: true, message: 'Listing basics updated successfully' });
    } catch (error) {
      console.error('Error occurred during updating listing basics:', error);
      res.status(500).json({ success: false, message: 'Error occurred during updating listing basics' });
    }
  }
};
