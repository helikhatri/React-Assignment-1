import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event,isClear) {
      debugger;
      if (isClear === 1) {
        setValues('');
      }
      else {
        setValues({
          ...fields,
          [event.target.id]: event.target.value
        });
      }
    }
  ];
}
