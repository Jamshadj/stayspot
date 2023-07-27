import React, { useState, useEffect } from "react";
import { Card, List, ListItem } from "@material-tailwind/react";

import { useSelector } from "react-redux";

function SideBarListing({ activeItem }) {
  const { propertyDetails } = useSelector((state) => state);

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
       
          <ListItem>
    {propertyDetails.title}
          </ListItem>


        <ListItem className={activeItem === "Listing Details" ? "bg-blue-100" : ""}>
          Listing Details
        </ListItem>
        <ListItem>
          Pricing and Availability
        </ListItem>
        <ListItem>
          Policies and Rules
        </ListItem>
        <ListItem>
          Info for Guests
        </ListItem>
      </List>
    </Card>
  );
}

export default SideBarListing;
