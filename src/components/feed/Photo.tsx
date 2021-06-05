import { ApolloCache, FetchResult, gql, useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { Link } from "react-router-dom";
import { toggleLike } from "../../__generated__/toggleLike";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import Comments from "./Comments";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div<any>`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

interface IFeedPhoto extends seeFeed_seeFeed {}
interface IMutationResponse extends toggleLike {}

const Photo = (photo: IFeedPhoto) => {
  const updateToggleLike = (
    cache: ApolloCache<IMutationResponse>,
    result: FetchResult<IMutationResponse>
  ) => {
    const { ok } = result.data.toggleLike;
    console.log(result);
    if (ok) {
      const photoId = `Photo:${photo.id}`;
      cache.modify({
        id: photoId,
        fields: {
          // * prev에서는 이전 isLiked값을 쓸 수 있다
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (photo.isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id: photo.id,
    },
    update: updateToggleLike,
  });
  return (
    <PhotoContainer key={photo.id}>
      <PhotoHeader>
        <Link to={`/users/${photo.user.username}`}>
          <Avatar lg url={photo.user.avatar} />
        </Link>
        <Link to={`/users/${photo.user.username}`}>
          <Username>{photo.user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={photo.file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: photo.isLiked ? "tomato" : "inherit" }}
                icon={photo.isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <PhotoAction>
              <FontAwesomeIcon icon={faBookmark} />
            </PhotoAction>
          </div>
        </PhotoActions>
        <Likes>{photo.likes === 1 ? "1 like" : `${photo.likes} likes`}</Likes>
        <Comments {...photo} />
      </PhotoData>
    </PhotoContainer>
  );
};
//{...photo}
export default Photo;
