import React, { useEffect, useState } from "react";
import { Switch, SwitchLabel, SwitchRadio, SwitchSelection } from "./Styles.jsx";

const ToggleSwitch = ({ values, selected, onChange }) => {
  const [selectedState, setSelectedState] = useState(selected);

  const ClickableLabel = ({ title, onChange, id }) => (
    <SwitchLabel onClick={() => onChange(title)} className={id}>
      {title}
    </SwitchLabel>
  );

  const ConcealedRadio = ({ value, selected }) => (
    <SwitchRadio type="radio" name="switch" checked={selected === value} readOnly={true} />
  );

  const handleChange = (state) => setSelectedState(state);

  useEffect(() => {
    onChange(selectedState);
  }, [selectedState]);

  const selectionStyle = () => {
    return {
      left: `${(values.indexOf(selectedState) / 3) * 100}%`,
    };
  };

  return (
    <Switch>
      {values.map((val) => {
        return (
          <span key={val}>
            <ConcealedRadio value={val} selected={selectedState} />
            <ClickableLabel title={val} onChange={handleChange} />
          </span>
        );
      })}
      <SwitchSelection style={selectionStyle()} />
    </Switch>
  );
};

export default ToggleSwitch;
