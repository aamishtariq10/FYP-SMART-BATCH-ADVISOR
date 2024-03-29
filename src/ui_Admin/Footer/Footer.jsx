import React from "react";

export const Footer = () => {
  return (
<footer className="flex justify-center mx-4 my-4 rounded-lg bg-white p-4 text-center shadow md:items-center md:p-6 xl:p-8">
  <p className="text-sm font-normal text-gray-500">
    {/* © 2022{" "} */}
    <a href="#/" className="hover:underline">
      Smart Batch Advisor
    </a>
    {/* . All rights reserved. */}
  </p>
</footer>

  );
};
