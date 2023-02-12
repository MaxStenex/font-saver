import React from "react";

export const Toolbar = () => {
  return (
    <div className="flex">
      <input type="text" className="field mr-4 flex-1" placeholder="Search..." />
      <div className="flex">
        <button className="max-w-fit primary-btn mr-3">Download all</button>
        <button className="max-w-fit secondary-btn">Download selected</button>
      </div>
    </div>
  );
};
