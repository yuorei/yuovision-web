import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
}

const BillBoardPlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  return (
    <button
      onClick={() => {
        window.location.href = `/video/${movieId}`;
      }}
      className="
            bg-white
            text-black
            rounded-md
            py-1 md:py-2
            px-2 md:px-4
            w-auto
            text-xs lg:text-lg
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-neutral-300
            transition
            "
    >
      <BsFillPlayFill size={25} className="mr-1" />
      Play
    </button>
  );
};

export default BillBoardPlayButton;
