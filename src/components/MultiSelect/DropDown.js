import React, { useState, useEffect } from "react";
import "./MultiSelect.scss";
import DropDownItem from "./DropDownItem"

export default function DropDown({ options, selectedOptions, toggleSelection, focusIndex }) {
  
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setFilteredOptions([...options]);
  }, [options]);

  return (
    <div className="OptionsWrapper">
        {filteredOptions.map((option, index) => (
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
