import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";

const Services = () => {
  return (
    <div className="flex justify-evenly w-full h-auto">
      <div className="flex space-y-4 flex-col items-center justify-center">
        <StarIcon className="h-10" />
        <p className="text-2xl font-bold">Simple</p>
        <p className="text-lg w-3/4">
          Easy Access to Courses you want to learn. No need to go to the center.
        </p>
      </div>

      <div className="flex space-y-4 flex-col items-center justify-center">
        <StarIcon className="h-10" />
        <p className="text-2xl font-bold">Less Hassle</p>
        <p className="text-lg w-3/4">
          The registration process was never been this easy.
        </p>
      </div>

      <div className="flex space-y-4 flex-col items-center justify-center">
        <StarIcon className="h-10" />
        <p className="text-2xl font-bold">All record at one place</p>
        <p className="text-lg w-3/4">
          All your records are stored at one place.
        </p>
      </div>
    </div>
  );
};

export default Services;
