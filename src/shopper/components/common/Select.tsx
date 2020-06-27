import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

interface SelectProps {
  title: string;
  choices: string[];
  value: string | undefined;
  onChange: (value: number) => void;
}

export default function Select(props: SelectProps) {
  return (
    <div style={{ marginTop: 10 }}>
      <InputLabel shrink htmlFor="age-native-label-placeholder">
        {props.title}
      </InputLabel>
      <NativeSelect
        fullWidth
        value={props.value}
        onChange={event => props.onChange(event.target.selectedIndex)}
      >
        {props.choices.map((choice, index) => {
          return (
            <option value={choice} key={index}>
              {choice}
            </option>
          );
        })}
      </NativeSelect>
    </div>
  );
}
