import { useForm } from "react-hook-form";
import styled from "styled-components";
import Comment from "./Comment";
import { ApolloCache, FetchResult, gql, useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  createCommentVariables,
  createComment_createComment,
} from "../../__generated__/createComment";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;
const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;
const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

interface IPhotoComments extends seeFeed_seeFeed {}
interface ICommentForm extends createCommentVariables {}
interface IMutationResponse extends createComment_createComment {}

const Comments = (photo: IPhotoComments) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } =
    useForm<ICommentForm>();

  const createCommentUpdate = (
    cache: ApolloCache<IMutationResponse>,
    result: FetchResult<IMutationResponse>
  ) => {
    const { payload } = getValues();
    setValue("payload", "");
    const { ok, id } = result.data;

    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: `Photo:${photo.id}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  // * data는 form이 가진 값을 나타낸다
  const onValid = (data) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId: photo.id,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      <Comment author={photo.user.username} payload={photo.caption} />
      <CommentCount>
        {photo.commentNumber === 1
          ? "1 comment"
          : `${photo.commentNumber} comments`}
      </CommentCount>
      {photo.comments?.map((comment) => (
        <Comment
          key={comment.id}
          id = {comment.id}
          photoId={photo.id}
          author={comment.user.username}
          payload={comment.payload}
          isMine={comment.isMine}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            name="payload"
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
};

export default Comments;
