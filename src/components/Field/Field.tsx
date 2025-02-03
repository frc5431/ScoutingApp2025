import React from 'react'

/* 
  uses discriminated union design. Claude helped generate this code, will learn this design seems very useful. 
  I'm writing this so I can attempt to learn what is happening. There is a base field, and I have as many 
  types as I want. Current there is a "text" and a "number". I put any common variables in base, and anything 
  that needs to be seperate is in its respective props.  
*/
interface BaseFieldProps {
  groupName: string;
  placeHolder?: string;
}

interface TextFieldProps extends BaseFieldProps {
  type: 'text';
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface NumberFieldProps extends BaseFieldProps {
  type: 'number';
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
}

export type FieldProps = TextFieldProps | NumberFieldProps;

const Field = ({ setValue, value, groupName, type, placeHolder, ...props}: FieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // The different actions and filters for different types
    if (type === "number") {
      setValue(Number(e.target.value));
    }
    // text is simple, it can take in anything. 
    else {
      setValue(e.target.value);
    }
  };

  return (
    <div className="input-container">
      <label>{groupName}</label>
      <input 
        name={groupName}
        value={value}
        type={type}
        onChange={handleChange}
        placeholder={placeHolder}

        // Number specific properities
        {...(type === 'number' ? {
          min: (props as NumberFieldProps).min,
          max: (props as NumberFieldProps).max,
        } : {})}
      />
    </div>
  );
};

export default Field;