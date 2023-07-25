// propertyController.js
import cloudinary from '../../helper/config.js'
import propertyModel from '../../models/propertyModel.js';

export default {
  postAddProperty: async (req, res) => {
    try {
      console.log("fe");
      // Get the property details from the request body
      const propertyDetails = req.body;
      console.log(req.body);
  
      
      // console.log(propertyDetails.image.map((img)=>{

      // }));
     
      // Create a new document in the property collection with the provided property details
      let images=[]
      for(let item of req.body.images){
        const result = await cloudinary.uploader.upload(item, {  //uploading to cloudinary
          folder: 'property'
        });
        images.push(result)
      }
      console.log(images)
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
        hostId:propertyDetails.hostId
      });
  
      // Respond with a success message and the newly created property document
      res.status(201).json({ success: true, property: newProperty });
    } catch (error) {
      // If an error occurs, respond with an error message and status code 500
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }   
  },
};
