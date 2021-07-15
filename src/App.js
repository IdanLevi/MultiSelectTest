import React, { useState } from "react";
import categories from "./categories";
import MultiSelect from "./components/MultiSelect/MultiSelect";
import "./App.scss";

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  function onChangeSelect(selectedOptions) {
    setSelectedOptions(selectedOptions);
  }

  return (
    <div className="App">
      <div className="Modal">
        <div className="FormGroup">
          <label className="DisplayBlock MarginBottom05">Categories</label>
          <MultiSelect
            onChange={onChangeSelect}
            options={categories}
            selectedOptions={selectedOptions}
          />
        </div>
      </div>
    </div>
  );
}
