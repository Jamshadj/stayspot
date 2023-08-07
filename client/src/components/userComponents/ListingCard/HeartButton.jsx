import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { addToWishList, removeFromWishList } from '../../../api/userApi';

function HeartButton({ listingId, currentUser, favorites, updateWishlist }) {
  const [hasFavorited, setHasFavorited] = useState(false);

  const toggleFavorite = async () => {
    try {
      if (hasFavorited || favorites) {
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
      if (updateWishlist) {
        updateWishlist(listingId); // Notify parent component to update wishlist
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          hasFavorited || favorites ? 'fill-red-400' : 'fill-neutral-500/70'
        }
      />
    </div>
  );
}

export default HeartButton;
