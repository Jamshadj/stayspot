// Import necessary modules
import cloudinary from '../../helper/config.js';
import propertyModel from '../../models/propertyModel.js';

export default {
  // Add a new property to the database
  postAddProperty: async (req, res) => {
     try {
    const propertyDetails = req.body;
    console.log(propertyDetails);
    // Upload property images to Cloudinary and store the URLs
    let images = [];
    for (let item of propertyDetails.images) {
      const result = await cloudinary.uploader.upload(item, {
        folder: 'property'
      });
      images.push(result.url);
    }
    console.log('ew');
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
      minimumStay: propertyDetails.minimumStay,
      maximumStay: propertyDetails.maximumStay,
      availableDates: {
        startDate: propertyDetails.availability[0],
        endDate: propertyDetails.availability[1],
      },
      title: propertyDetails.title,
      description: propertyDetails.description,
      pricePerNight: propertyDetails.pricePerNight,
      hostId: propertyDetails.hostId,
    });

    res.json({ error: false, property: newProperty });
  } catch (error) {
    console.error("Error occurred while adding property:", error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
  },

  // Update dates for all properties in  the database
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
  },

 postPropertyEditProperty:async(req,res)=>{
  try {
    const { propertyId, fieldName, fieldValue } = req.body;
    const allowedFields = ["structure", "floorPlan", "privacyType"];

    if (!allowedFields.includes(fieldName)) {
      return res.status(400).json({ success: false, message: 'Invalid field name' });
    }

    // Construct the update object based on the field name
    const updateData = { [fieldName]: fieldValue };
    console.log(updateData);
    // Update the property document in the database using Mongoose findByIdAndUpdate
    // Assuming propertyModel is a Mongoose model representing the property collection
    const updatedProperty = await propertyModel.findByIdAndUpdate(propertyId, updateData, { new: true });
    
    if (!updatedProperty) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, message: 'Field updated successfully', data: updatedProperty });
  } catch (error) {
    console.error('Error occurred during updating field:', error);
    res.status(500).json({ success: false, message: 'Error occurred during updating field' });
  }
 },
 postPropertyEditPrice:async(req,res)=>{
  try {
    const { propertyId, pricePerNight } = req.body;

    const updatedProperty = await propertyModel.findByIdAndUpdate(
      propertyId,
      { pricePerNight }, // Update the pricePerNight field
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, message: 'Price per night updated successfully', data: updatedProperty });
  } catch (error) {
    console.error('Error occurred during updating price per night:', error);
    res.status(500).json({ success: false, message: 'Error occurred during updating price per night' });
  }

 }
};
