import React from "react";
import "./MultiSelect.scss";
import DropDownItem from "./DropDownItem"

export default function DropDown({ options, selectedOptions, toggleSelection, focusIndex }) {

  return (
    <div className="OptionsWrapper">
        {options.map((option, index) => (
          <DropDownItem
            selectedOptions={selectedOptions}
            option={option}
            toggleSelection={toggleSelection}
            index={index}
            key={index}
            focusIndex={focusIndex}
          />
        ))}
    </div>
  )
}
