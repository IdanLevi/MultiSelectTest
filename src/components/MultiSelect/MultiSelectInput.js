import React, { useRef } from "react";
import "./MultiSelect.scss";
import arrowImage from 'img/arrow-static.svg';
import xImage from 'img/close-white.svg';

export default function MultiSelectInput({ selectedOptions, toggleSelection, changeDropDownOpenedState, isOpen, text, handleTextChange }) {
  
  const handleArrowClicked = () => {
    inputRef.current.focus();
    changeDropDownOpenedState(!isOpen);
  }
  
  const handleInputFocused = () => {
    changeDropDownOpenedState(true);
  }

  const inputRef = useRef();

  return (
    <div className="InputWrapper">
      <div className="SelectedOptions">
        {selectedOptions.map((option) => (
        <div className="SelectedOption" key={option.value}>
          <label>{option.label}</label>
          <div className="width3" />
          <div className="XWrapper" onClick={() => toggleSelection(option)}>
            <img src={xImage} className="arrow-static" alt="Remove Selection" />
          </div>
        </div>
        ))}
      <input className="InnerInput" placeholder="Search" value={text} onChange={handleTextChange} ref={inputRef}
              onMouseDown={handleArrowClicked} onFocus={handleInputFocused} />
      </div>
      <div className="ArrowWrapper" onClick={handleArrowClicked}>
        <img src={arrowImage} className={`arrow-static ${isOpen ? 'rotate180' : ''}`} alt="Arrow Show Categories" />
      </div>
    </div>
  )
}
