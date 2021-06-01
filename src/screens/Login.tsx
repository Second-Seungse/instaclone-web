import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/pageTitle";
import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

type LoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, getValues, setValue } = useForm<LoginForm>();
  const onSubmitValid: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
  };
  const onSubmitInvalid: SubmitErrorHandler<LoginForm> = (data) => {
    console.log(data, "invalid");
  };
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register("username", { minLength: 5, required: true })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", { required: true })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit" value="Log in" />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};
export default Login;
