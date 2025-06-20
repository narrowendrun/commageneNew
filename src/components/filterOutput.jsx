import { useState } from "react";
import { TiDeleteOutline, TiEdit } from "react-icons/ti";
import VxlanForm from "./VXLANform";
import VlanForm from "./VLANform";
import MACForm from "./MACform";

export default function FiltersOutput({
  optionsFlags,
  filters,
  setFilters,
  showHide,
}) {
  const [showNames, setShowNames] = useState({});
  const [showEditForms, setShowEditForms] = useState({});

  const handleToggle = (index) => {
    setShowNames((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleClick = (index) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[index];
      return newFilters;
    });
  };

  const handleEditToggle = (index) => {
    setShowEditForms((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="filterOutputsContainer">
        <p id="firstPartCommand">
          <span>bash tcpdump</span>
          <span id="optionFlags">
            {" "}
            -{optionsFlags.hostService}
            {optionsFlags.printMAC}
            {optionsFlags.verbosity}
            {optionsFlags.quickDisplay}
            {optionsFlags.timestamp}
            {optionsFlags.interface}
            {optionsFlags.packetCount}
            {optionsFlags.flowDirection}
            {optionsFlags.filename}
            {optionsFlags.filesize}
            {optionsFlags.filecount}
            {optionsFlags.filefrequency}
          </span>
        </p>
        {Object.keys(filters).map((index) => {
          const firstIndex = Math.min(...Object.keys(filters).map(Number));
          const showEditForm = showEditForms[index] ?? false;

          return (
            <div className="filter_div" key={index}>
              {index !== firstIndex.toString() ? (
                filters[index].andor ? (
                  <button>or</button>
                ) : (
                  <button style={{ all: "unset" }}>or</button>
                )
              ) : null}
              <p className="filter_p" onClick={() => handleToggle(index)}>
                {showHide
                  ? filters[index].filter
                  : !showNames[index]
                  ? filters[index].filter
                  : filters[index].name}
              </p>
              {filters[index].edit ? (
                <TiEdit
                  className="filterEditButton"
                  onClick={() => handleEditToggle(index)}
                />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "VXLAN" &&
              showEditForm ? (
                <VxlanForm setFilters={setFilters} index={index} />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "VLAN" &&
              showEditForm ? (
                <VlanForm setFilters={setFilters} index={index} />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "MAC" &&
              showEditForm ? (
                <MACForm setFilters={setFilters} index={index} />
              ) : null}
              <TiDeleteOutline
                className="filterDeleteButton"
                onClick={() => handleClick(index)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
