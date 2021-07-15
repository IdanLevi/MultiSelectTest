import React, { /*useState,*/ useRef, useEffect } from "react";
import "./MultiSelect.scss";
import vImage from 'img/check-white.svg';

export default function DropDownItem({ selectedOptions, option, toggleSelection, index, focusIndex }) {
  
  const myRef = useRef();

  const vImageClassName = `arrow-static ${selectedOptions.find(so => so.value === option.value) ? '' : 'Hidden'}`;

  useEffect(() => {
    if (focusIndex === index) {
      myRef.current.focus();
    }
  }, [focusIndex, index]);

  return (
    <div className="Option" index={index} onClick={() => toggleSelection(option)} ref={myRef} tabIndex="-1">
      <div className="optionSelectedIndicator">
        <img src={vImage} className={vImageClassName} alt="Selected Indicator" />
      </div>
      <div className="optionLabel" title={option.label}>
        {option.label}
      </div>
    </div>
  )
}
