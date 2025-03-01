import React, { useEffect, useState } from 'react';
import './radioButtons.css'; 
import '../../index.css'

export interface radioButtonProps {
  setVari: React.Dispatch<React.SetStateAction<string>>; 
  vari: string; 
  options: { label: string; value: string }[]; 
  groupName: string;
}

const RadioButtons: React.FC<radioButtonProps> = ({vari, setVari, options, groupName} : radioButtonProps) => {


  return (
    <div className="radio-group">
      <p className="radio-title"><strong>{groupName}</strong></p>
      {options.map((option) => (
        <label className="radio-label" key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={vari === option.value}
            onChange={() => setVari(option.value)}
            name={groupName}
            className="radio-input"
          />
          <span className="radio-custom"></span>
          <span className="radio-text">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export type Option = { label: string; value: string }[];

export default RadioButtons;