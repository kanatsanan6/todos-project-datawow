import { useState } from "react";
// internal
import "./Filter.css";
import arrowDown from "../../images/arrow-down.png";

type Props = {
  currentDropDown: "All" | "Done" | "Undone";
  setCurrentDropDown: React.Dispatch<React.SetStateAction<"All" | "Done" | "Undone">>;
};

function Filter({ currentDropDown, setCurrentDropDown }: Props) {
  const [showDropDown, setShowDropDown] = useState(false);

  // toggle dropdown
  function onClickedShowDropDown(): void {
    setShowDropDown((prevShowDropDown) => !prevShowDropDown);
  }
  // hide dropdown when mouse left
  function onMouseLeaveDropDown(): void {
    setShowDropDown(false);
  }
  // set current dropdown selection
  function onClickedCurrentDropDown(filterOption: "All" | "Done" | "Undone"): void {
    setCurrentDropDown(filterOption);
    setShowDropDown(false); // Hide dropdown
  }

  return (
    <div className="filter" onMouseLeave={onMouseLeaveDropDown}>
      <div className="filter__header" onClick={onClickedShowDropDown}>
        <h1>{currentDropDown}</h1>
        <img src={arrowDown} alt="" />
      </div>
      {showDropDown && (
        <div className="filter__dropDown">
          <h1 onClick={() => onClickedCurrentDropDown("All")}>All</h1>
          <h1 onClick={() => onClickedCurrentDropDown("Done")}>Done</h1>
          <h1 onClick={() => onClickedCurrentDropDown("Undone")}>Undone</h1>
        </div>
      )}
    </div>
  );
}

export default Filter;
