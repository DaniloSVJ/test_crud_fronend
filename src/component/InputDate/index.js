import React from "react";
import InputMask from "react-input-mask";

const InputDate = (props) => (
  <InputMask mask="99/99/9999" placeholder="Data de Nascimento" value={props.value} onChange={props.onChange} />
);

export default InputDate;