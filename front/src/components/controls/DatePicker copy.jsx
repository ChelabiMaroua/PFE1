import * as React from 'react';
// import dayjs from 'dayjs';
// import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale';

// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';


// dayjs.extend(localizedFormat);
// dayjs.locale('en');

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value
    }
  });
  const handleDateChange = (newValue) => {
    const adjustedDate = dayjs(newValue).add(1, 'day').locale(en);
    onChange(convertToDefEventPara(name, adjustedDate));
  };

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    //   <DesktopDatePicker
    //     label={label}
    //     inputFormat="dd/MM/yyyy"
    //     name={name}
    //     value={value}
    //     onChange={date => onChange(convertToDefEventPara(name, date))}
    //     renderInput={(params) => <TextField variant="standard" {...params} />}
    //   />
    // </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField']}>
        <DateField
          label={label}
          format="DD/MM/YYYY"
          name={name}
          value={value}
          onChange={handleDateChange}
        // renderInput={(params) => <TextField variant="standard" {...params} />} 
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
