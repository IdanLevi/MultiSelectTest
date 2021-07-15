import React, { /*useState,*/ useRef, useEffect } from "react";
import "./MultiSelect.scss";
import vImage from 'img/check-white.svg';

export default function DropDownItem({ selectedOptions, option, toggleSelection, index, focusIndex }) {
  
    const myRef = useRef();

  useEffect(() => {
    if (focusIndex === index) {
      myRef.current.focus();
    }
  }, [focusIndex, index]);

  return (
    <div className="Option" index={index} onClick={() => toggleSelection(option)} ref={myRef} tabIndex="-1">
      <div className="optionSelectedIndicator">
        {selectedOptions.find(so => so.value === option.value) &&
          <img src={vImage} className="arrow-static" alt="Selected Indicator" />
        }
      </div>
      <div className="optionLabel">
        {option.label}
        <span className="tooltip">{option.label}</span>
      </div>
    </div>
  )
}
