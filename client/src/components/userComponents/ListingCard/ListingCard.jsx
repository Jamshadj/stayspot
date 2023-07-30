import React from 'react'

function ListingCard({ data ,currentUser}) {
    const image=data.images[0]
    
    return (
        <div
            // onClick={() => router.push(`/listings/${data.id}`)} 
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
                >
  <img
           
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={image.secure_url}
            alt="Listing"
          />
 <div className="
            absolute
            top-3
            right-3
          ">
              <HeartButton 
              listingId={data._id} 
              currentUser={currentUser}
            />
          </div>

                </div>

            </div></div>
    )
}

export default ListingCard