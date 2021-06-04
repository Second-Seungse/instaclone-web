import { gql, useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled, { ThemeProviderComponent } from "styled-components";
import { FEED_QUERY } from "../../screens/Home";
import Avatar from "../Avatar";
import { FatText } from "../shared";

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

const Photo = ({ id, user, file, isLiked, likes }) => {
  // * 백엔드에서 query를 fetch하고, 변한 내용이 있다면 apollo가 cache를 update한다
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    // * mutation을 실행하고 백엔드에 에러가 없다면 query를 다시 호출한다
    refetchQueries: [{ query: FEED_QUERY }],
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user.avatar} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
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
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      </PhotoData>
    </PhotoContainer>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
};
export default Photo;
