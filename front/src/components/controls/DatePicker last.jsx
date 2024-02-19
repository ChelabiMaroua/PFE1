import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function MuiDatePicker(props) {
  const { name, label, value, onChange } = props;
  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        //disableToolbar
        slotProps={{ textField: { variant: "standard" } }}
        sx={{ width: '200px' }}
        //inputVariant="standard"
        label={label}
        format="DD/MM/YYYY"
        name={name}
        value={value}
        onChange={date => onChange(convertToDefEventParam(name, date))}
      />
    </LocalizationProvider>
  );
}