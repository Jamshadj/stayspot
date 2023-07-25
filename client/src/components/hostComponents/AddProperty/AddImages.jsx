import React, { useState } from 'react';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import the useDispatch function

function AddImages() {
  const [selectedImages, setSelectedImages] = useState([]); // State to hold the selected images
  const navigate = useNavigate();
  const [finalImages, setFinalImages] = useState([]);
  const dispatch = useDispatch(); // Initialize the useDispatch function

  const isValidFileUploaded = (file) => {
    const validExtensions = ['jpg', 'png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleNext = () => {
    // Dispatch the images to the Redux store
    console.log(selectedImages);
    dispatch({ type: 'propertyDetails', payload: { images: finalImages } });
    navigate('/host/add-title');
  };

  const handleFileChange = (e) => {
    // Handle the file selection and update the state with selected images
    const files = e.target.files;
    const imageList = Array.from(files);

    const isValidImages = imageList.every((file) => isValidFileUploaded(file));

    if (isValidImages) {
      Promise.all(imageList.map(convertToBase64))
        .then((base64Images) => setFinalImages(base64Images))
        .catch((error) => console.log('Error converting images to base64:', error));
    } else {
      // Replace the generateError function with the appropriate error handling mechanism
      console.log('Invalid File type');
    }

    setSelectedImages(imageList);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <PropertyNavbar />
      </header>
      <main className="flex-grow mx-auto w-1/3 mt-44 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Add some images of your place</h2>
        </div>

        <div class="flex items-center justify-center w-full">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" multiple // Allow multiple file selection
              onChange={handleFileChange} // Call the handleFileChange function on file selection
            />
          </label>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default AddImages;
