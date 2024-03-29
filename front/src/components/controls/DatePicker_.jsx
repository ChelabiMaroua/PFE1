import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@mui/pickers';

import DateFnsUtils from '@date-io/date-fns';

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    }
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="dd/MM/yyyy"
        name={name}
        value={value}
        onChange={date => onChange(convertToDefEventParam(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
