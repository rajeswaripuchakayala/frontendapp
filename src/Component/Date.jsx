
import React, { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Date() {
  const [value, setValue] = useState(dayjs('2022-04-01'));

  const {$d}=value;
  let dates =$d;
  console.log(dates);
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{display:"flex", justifyContent:"center"}}>
      <div style={{top:"50%",left:"40%",position:"absolute",alignItems:"center"}}>
   
     <DatePicker
           views={['year', 'month']}
          minDate={dayjs('2019-03-01')}
          maxDate={dayjs('2024-12-01')}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            console.log("valueb:----",value)
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
       
     </div>
       
      </div>
    
    </LocalizationProvider>

    
    </>
  );
}
