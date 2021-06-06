import styled from "styled-components";

const BtnContainer = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`;

interface IProps {
  value: string;
  onClick?: any;
  type?: string;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<IProps> = ({
  onClick,
  type,
  value,
  disabled = false,
  className,
}) => (
  <BtnContainer
    onClick={onClick}
    type={type ? type : "submit"}
    value={value}
    disabled={disabled}
    className={className}
  />
);

export default Button;
