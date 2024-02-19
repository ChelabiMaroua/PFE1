import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MuiDatePicker(props) {
    const { name, label, value, onChange } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value,
        },
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                slotProps={{ textField: { variant: "standard" } }}
                sx={{ width: '200px' }}
                //format="DD/MM/YYYY"
                label={label}
                name={name}
                value={value}
                onChange={(date) => onChange(convertToDefEventPara(name, date))}
            />
        </LocalizationProvider>
    );
}
