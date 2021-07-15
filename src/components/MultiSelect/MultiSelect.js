import React, { useState, useRef, useEffect, useCallback } from "react";
import "./MultiSelect.scss";
import DropDown from "./DropDown";
import MultiSelectInput from "./MultiSelectInput";
import * as Constants from './constants';

export default function MultiSelect({ options, selectedOptions, onChange }) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [focusIndex, setFocusIndex] = useState(-1);

  const multiSelectRef = useRef();

  // #region functions

  const applyFilter = useCallback((text) => {
    setFilteredOptions(options.filter(o => o.label.toLowerCase().includes(text.toLowerCase())));
  },[options])

  const closeDropDown = useCallback((e) => {
    if (!multiSelectRef.current.contains(e?.target)) {
      setText('');
      applyFilter('');

      if(isOpen) {
        changeDropDownOpenedState(false);
      }

      setFocusIndex(-1);
    }
  }, [applyFilter, isOpen])

  const toggleSelection = useCallback((newSelection) => {
    let newSelectedOptions = [...selectedOptions];
    
    if(newSelectedOptions.find(so => so.value === newSelection.value)) {
      newSelectedOptions = newSelectedOptions.filter(so => so.value !== newSelection.value);
    }
    else {
      newSelectedOptions.push(newSelection);
    }
    
    onChange(newSelectedOptions);
    closeDropDown({});
  }, [closeDropDown, onChange, selectedOptions]);

  const handleKeyDown = useCallback((e) => {
    const activeElement = document.activeElement;

    if (e.key === Constants.BackSpace) {
      if (multiSelectRef.current.contains(e?.target) &&
          selectedOptions.length > 0 &&
          text?.length === 0) {
        e.preventDefault();
        toggleSelection(selectedOptions[selectedOptions.length - 1]);
      }
    }
    else if (e.key === Constants.ArrowDown) {
      if(activeElement.className === Constants.InnerInputClassName) {
        e.preventDefault();         
        const allOptions = multiSelectRef.current.getElementsByClassName(Constants.OptionClassName);

        if (allOptions.length > 0) {
          
          setFocusIndex(0);
        }
      }
      else if(activeElement.className === Constants.OptionClassName) { 
        e.preventDefault();
        setFocusIndex(focusIndex === filteredOptions.length - 1 ? 0 : focusIndex + 1);
      }
    }
    else if (e.key === Constants.ArrowUp) {
      if(activeElement.className === Constants.InnerInputClassName) {
        e.preventDefault();
        const allOptions = multiSelectRef.current.getElementsByClassName(Constants.OptionClassName);

        if (allOptions.length > 0) {
          setFocusIndex(filteredOptions.length - 1);
        }
      }
      else if(activeElement.className === Constants.OptionClassName) { 
        e.preventDefault();
        setFocusIndex(focusIndex === 0 ? filteredOptions.length - 1 : focusIndex - 1);
      }
    }
    else if (e.key === Constants.Enter) {
      if(activeElement.className === Constants.OptionClassName) {
        e.preventDefault();
        const optionToToggle = filteredOptions[activeElement.getAttribute('index')];
        toggleSelection(optionToToggle);
      }
    }  
  }, [filteredOptions, focusIndex, selectedOptions, text, toggleSelection]);

  const handleTextChange = ({ target: { value } }) => {
    setIsOpen(true);
    setText(value);
    applyFilter(value);
  }

  const changeDropDownOpenedState = (value) => {
    setIsOpen(value);

    if(!value) {
      setFocusIndex(-1);
    }
  }

  //#endregion functions

  //#region effects

  useEffect(() => {
    setFilteredOptions([...options]);
  }, [options]);

  useEffect(() => {
    document.addEventListener('mousedown', closeDropDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
        document.removeEventListener('mousedown', closeDropDown);
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, closeDropDown])

  //#endregion effects

  return (
    <div className="MultiSelect" ref={multiSelectRef}>
      <MultiSelectInput 
        selectedOptions={selectedOptions}
        setSelectedOptions={onChange}
        toggleSelection={toggleSelection}
        changeDropDownOpenedState={changeDropDownOpenedState}
        isOpen={isOpen}
        text={text}
        handleTextChange={handleTextChange}
      />
      {isOpen && filteredOptions.length > 0 &&
      <DropDown
        options={filteredOptions}
        selectedOptions={selectedOptions}
        toggleSelection={toggleSelection}
        focusIndex={focusIndex}
      />
      }
    </div>
  );
}
