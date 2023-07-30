import React from 'react'
import Container from '../userComponents/Container'
import ListingHead from './ListingHead'

function ListingClient({listing,currentUser}) {
  return (
  <Container>
     <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
          <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.images}
            locationValue={listing.coordinates}
            id={listing._id}
            currentUser={currentUser}
          />
          </div>
      </div>
  </Container>
  )
}

export default ListingClient