import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { me } from "../__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
  });
  console.log(data);
  // * useEffect는 hook이 마운트되면 한 번 실행되고, 데이터가 변경될 때 마다 실행된다
  useEffect(() => {
    if (data?.me === null) {
        logUserOut();
    }
  }, [data]);
  return;
};
export default useUser;
