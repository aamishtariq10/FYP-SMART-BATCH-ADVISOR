import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";

const Services = () => {
  return (
    <div className="flex justify-evenly w-full h-auto">
      <div className="flex space-y-4 flex-col items-center justify-center">
        <StarIcon className="h-10" />
        <p className="text-2xl font-bold">Excellent Services</p>
        <p className="text-lg w-3/4">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>

      <div className="flex space-y-4 flex-col items-center justify-center">
        <StarIcon className="h-10" />
        <p className="text-2xl font-bold">Excellent Services</p>
        <p className="text-lg w-3/4">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>

      <div className="flex space-y-4 flex-col items-center justify-center">
        <StarIcon className="h-10" />
        <p className="text-2xl font-bold">Excellent Services</p>
        <p className="text-lg w-3/4">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};

export default Services;
