import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import { seeFeed } from "../__generated__/seeFeed";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  return (
    <div>
      {data?.seeFeed?.map((photo) => (
        // * photo object에 있는 모든 요소들이 proptypes와 같은 이름을 갖고 있어야지만 사용가능
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};
export default Home;
