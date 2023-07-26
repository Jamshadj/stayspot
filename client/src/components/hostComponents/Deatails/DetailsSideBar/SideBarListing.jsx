import React from "react";
import {
  Card,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { BsChevronDown } from "react-icons/bs";

function SideBarListing({ activeItem }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
       
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
