import React from "react";

const CourseCard = ({ courseName, courseCode, section, onDelete, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="font-semibold text-lg">{courseName}</div>
      <div className="text-gray-500">{courseCode}</div>
      <div className="text-gray-500">{section}</div>
      <div className="flex justify-end mt-4">
        <button
          onClick={onAdd}
          className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
        >
          Add
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
