import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const TimePick = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  function handleChange(tid) {
    // Here, we invoke the callback with the new value
    props.onChange(tid);
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date); // changes state
        handleChange(date); // passes value to parent component
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="hh:mm"
    />
  );
};

export default TimePick;
