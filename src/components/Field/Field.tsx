import React from 'react';
import {atom, useAtom} from 'jotai';
import { removePlaceholderAtom } from '../../pages/Homepage/Config';

/* 
  Uses discriminated union design. Claude helped generate this code, will learn this design seems very useful. 
  I'm writing this so I can attempt to learn what is happening. There is a base field, and I have as many 
  types as I want. Currently, there is a "text" and a "number". I put any common variables in base, and anything 
  that needs to be separate is in its respective props.  
*/
interface BaseFieldProps {
  groupName: string;
  placeHolder?: string;
  style?: React.CSSProperties; // Ensures style is correctly typed as an object
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

const Field = ({ setValue, value, groupName, type, placeHolder, style, ...props }: FieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      setValue(Number(e.target.value));
    } else {
      setValue(e.target.value);
    }
  };
  const [removePlaceholder] = useAtom(removePlaceholderAtom);

  return (
    <div className="input-container">
      <label>{groupName}</label>
      <input
        style={style} 
        name={groupName}
        value={value}
        type={type}
        onChange={handleChange}
        placeholder={!removePlaceholder ? placeHolder : ''}
        {...(type === 'number'
          ? {
              min: (props as NumberFieldProps).min,
              max: (props as NumberFieldProps).max,
            }
          : {})}
      />
    </div>
  );
};

export default Field;
