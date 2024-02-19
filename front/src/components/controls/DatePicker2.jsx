import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function MuiDatePicker(props) {
  const { name, label, value, onChange } = props;
  console.log('La date actuelle : ' + value);

  const handleDateChange = (value) => {
    if (dayjs.isDayjs(value)) {
      setValue(value);
      if (props.value) {
        props.setValue(newValue);
      }
    }
  };
  // const convertToDefEventParam = (name, value) => ({
  //   target: {
  //     name,
  //     value,
  //   }
  // });

  console.log('La date modifiée est : ' + value)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slotProps={{ textField: { variant: "standard" } }}
        sx={{ width: '200px' }}
        label={label}
        format="DD/MM/YYYY"
        name={name}
        value={value}
        //onChange={date => onChange(convertToDefEventParam(name, date))}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}