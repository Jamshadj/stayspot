import React, { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { setDates } from '../../../api/hostApi';
import { useNavigate } from 'react-router-dom';

function Avaliablity() {
  const [minimumStay, setMinimumStay] = useState('');
  const [maximumStay, setMaximumStay] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the setDates API with the required data
    try {
      const response = await setDates({ startDate, endDate, minimumStay, maximumStay });
      console.log(response.data.message); // Success message from the backend

      // If API call is successful, navigate to the "/host" page
      navigate('/host');
    } catch (error) {
      console.log('Error occurred during updating dates:', error);
    }

    // Process the form data or perform any necessary actions with the state values
    console.log('Minimum Stay:', minimumStay);
    console.log('Maximum Stay:', maximumStay);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Set up your calendar
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Use availability settings to customize how and when you want to host.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-4">
            <label htmlFor="minimumstay">Minimum Stay</label>
            <Input
              size="lg"
              label="Minimum stay day"
              value={minimumStay}
              onChange={(e) => setMinimumStay(e.target.value)}
            />
            <label htmlFor="maximumstay">Maximum Stay</label>
            <Input
              size="lg"
              label="Maximum stay day"
              value={maximumStay}
              onChange={(e) => setMaximumStay(e.target.value)}
            />
          </div>
          <Typography variant="h6" color="blue-gray">
            Select Dates from and to
          </Typography>
          <Input
            size="lg"
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            size="lg"
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Button className="mt-6" type="submit" fullWidth>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Avaliablity;
