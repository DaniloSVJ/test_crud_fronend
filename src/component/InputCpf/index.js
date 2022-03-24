import React from "react";
import InputMask from "react-input-mask";

const InputCpf = (props) => (
  <InputMask mask="999.999.999-99" placeholder='Digite o CPF' value={props.value} onChange={props.onChange}>
  
</InputMask>

);

export default InputCpf;