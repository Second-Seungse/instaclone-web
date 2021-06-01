import React from "react";
import styled from "styled-components";

// * 속성
type InputProps = {
  hasError?: Boolean;
};
type InputRef = InputProps & Omit<JSX.IntrinsicElements["input"], "ref">;

const SInput = styled.input<InputProps>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;
const Input = React.forwardRef<HTMLInputElement, InputRef>(
  ({ ...props }, forwardedRef) => {
    return <SInput ref={forwardedRef} {...props} />;
  }
);
export default Input;

/* 
type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};
type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] };
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, ...props }, ref) => (
    <select ref={ref} {...props}>
      {options.map(({ label, value }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  )
);
 */