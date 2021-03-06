import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
/* import PageTitle from "../components/PageTitle"; */
import { FatLink } from "../components/shared";
import routes from "../routes";
import { createAccount, createAccountVariables } from "../__generated__/createAccount";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const [createAccount, { loading }] = useMutation<createAccount>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: (data) => {
        const {
          createAccount: { ok },
        } = data;
        if (!ok) {
          return;
        }
        history.push(routes.home, {
          message: "Account created. Please log in.",
          //username, password,
        });
      },
    }
  );
  
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<createAccountVariables>({
    mode: "onChange",
  });
  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    let signUpValues: createAccountVariables = getValues();
    console.log(signUpValues);
    createAccount({
      variables: {
        ...getValues(),
      },
    });
  };
  return (
    <AuthLayout>
      {/* <PageTitle title="Sign up" /> */}
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: true,
            })}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <Input
            {...register("lastName")}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("email", {
              required: true,
            })}
            name="email"
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("username", {
              required: true,
            })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", {
              required: true,
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};

export default SignUp;
