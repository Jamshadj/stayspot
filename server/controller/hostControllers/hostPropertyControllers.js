// propertyController.js
import cloudinary from '../../helper/config.js'
import propertyModel from '../../models/propertyModel.js';

export default {
  postAddProperty: async (req, res) => {
    try {
      // Get the property details from the request body
      const propertyDetails = req.body;
      
      // Create a new document in the property collection with the provided property details
      let images = [];
      for (let item of req.body.images) {
        const result = await cloudinary.uploader.upload(item, {  //uploading to cloudinary
          folder: 'property'
        });
        images.push(result);
      } 
      console.log(images);
      const newProperty = await propertyModel.create({
        structure: propertyDetails.structure,
        privacyType: propertyDetails.privacyType,
        location: propertyDetails.location,
        images, 
        coordinates: {
          latitude: propertyDetails.coordinates[1], // Swap the indices for latitude and longitude
          longitude: propertyDetails.coordinates[0], // Swap the indices for latitude and longitude
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
      console.log("zsws");
      res.json({ error: false, property: newProperty });
      // Respond with a success message and the newly created property document
    } catch (error) {
      // If an error occurs, respond with an error message and status code 500
      console.error("zsws", error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }   
  },
  setDates: async (req, res) => {
    const { startDate, endDate, minimumStay, maximumStay } = req.body;
    console.log("gfsd",req.body);

    try {
      // Assuming you want to update the 'startDate', 'endDate', 'minimumStay', and 'maximumStay' fields in propertyModel
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
  getProperties: async (req, res) => {
    try {
      const hostId = req.params.hostId; // Extract the hostId from the request parameters
      console.log('Host ID:', hostId);
  
      const properties = await propertyModel.find({ hostId: hostId });
      console.log('Properties:', properties);
  
      res.json({ properties });
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  },getProperty: async (req, res) => {
    try {
      console.log("rfffffffff");
      const propertyId= req.params.propertyId; // Extract the hostId from the request parameters

  
      const property = await propertyModel.find({ _id: propertyId });
   

      res.json({ property });
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  }
};
