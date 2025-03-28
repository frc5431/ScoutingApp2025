import React from 'react';
import {useAtom} from 'jotai';
import { removePlaceholderAtom } from '../../pages/Homepage/Config';

interface BaseFieldProps {
  groupName: string;
  placeHolder?: string;
  style?: React.CSSProperties;
}

interface TextFieldProps extends BaseFieldProps {
  type: 'text';
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface NumberFieldProps extends BaseFieldProps {
  type: 'number';
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
  min: number;
  max: number;
}

export type FieldProps = TextFieldProps | NumberFieldProps;

const Field = ({ setValue, value, groupName, type, placeHolder, style, ...props }: FieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const inputValue = e.target.value.trim();
      
      if (inputValue === '') {
        setValue(null);
      } else {
        const numValue = Number(inputValue);
        setValue(isNaN(numValue) ? null : numValue);
      }
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
        value={value ?? ''}
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