import { useState } from "react";
// internal
import "./Filter.css";
import arrowDown from "../../images/arrow-down.png";

type DropDownSelection = "All" | "Done" | "Undone";
type Props = {
  currentSelectedDropDown: DropDownSelection;
  setCurrentSelectedDropDown: React.Dispatch<React.SetStateAction<DropDownSelection>>;
};

function Filter({ currentSelectedDropDown, setCurrentSelectedDropDown }: Props) {
  const [showDropDown, setShowDropDown] = useState(false);

  // toggle dropdown
  function toggleDropDown(): void {
    setShowDropDown((prevShowDropDown) => !prevShowDropDown);
  }
  // hide dropdown when mouse left
  function onMouseLeaveDropDown(): void {
    setShowDropDown(false);
  }
  // handle dropdown selection
  function selectDropDown(filterOption: DropDownSelection): void {
    setCurrentSelectedDropDown(filterOption);
    setShowDropDown(false); // Hide dropdown
  }

  return (
    <div className="filter" onMouseLeave={onMouseLeaveDropDown}>
      <div className="filter__header" onClick={toggleDropDown}>
        <h1>{currentSelectedDropDown}</h1>
        <img src={arrowDown} alt="" />
      </div>
      {showDropDown && (
        <div className="filter__dropDown">
          <h1 onClick={() => selectDropDown("All")}>All</h1>
          <h1 onClick={() => selectDropDown("Done")}>Done</h1>
          <h1 onClick={() => selectDropDown("Undone")}>Undone</h1>
        </div>
      )}
    </div>
  );
}

export default Filter;
