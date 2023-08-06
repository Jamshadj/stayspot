import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { addToWishList, getWishlist, removeFromWishList } from '../../../api/userApi';

function HeartButton({ listingId, currentUser }) {
  const [hasFavorited, setHasFavorited] = useState(false);

  const toggleFavorite = async () => {
    try {
      if (hasFavorited) {
        await removeFromWishList(listingId, currentUser.details._id);
        Swal.fire({
          icon: 'success',
          title: 'Removed from Favorites',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await addToWishList(listingId, currentUser.details._id);
        Swal.fire({
          icon: 'success',
          title: 'Added to Favorites',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setHasFavorited(!hasFavorited);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const response = await getWishlist(listingId, currentUser.details._id);
        setHasFavorited(response.data.property !== null);
      } catch (error) {
        console.error(error);
      }
    };
    checkIfFavorited(); // Call the checkIfFavorited function on mount
  }, [listingId, currentUser]);

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-red-400' : 'fill-neutral-500/70'
        }
      />
    </div>
  );
}

export default HeartButton;
