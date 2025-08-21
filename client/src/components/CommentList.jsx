import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { Avatar, AvatarImage } from "./ui/avatar";
import UserIcon from "../assets/images/user.png";
import moment from "moment";
import { useSelector } from "react-redux";

const CommentList = ({ props }) => {
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get/${props.blogid}`,
    {
      method: "get",
      credentials: "include",
    }
  );
  useEffect(() => {
    if (data?.comments) setComments(data.comments);
  }, [data]);

  useEffect(() => {
    if (props.newComment) {
      const commentWithUser = {
        ...props.newComment,
        user: {
          _id: user.user._id,
          name: user.user.name,
          avatar: user.user.avatar,
        },
      };
      setComments((prev) => [commentWithUser, ...prev]);
    }
  }, [props.newComment, user]);
  if (loading) return <LoadingScreen />;
  return (
    <div>
      <h4 className="text-2xl font-bold">
        <span className="me-2">{comments.length}</span>Comments
      </h4>
      <div className="mt-5">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-2 mb-3">
            <Avatar>
              <AvatarImage src={comment?.user?.avatar || UserIcon} />
            </Avatar>
            <div>
              <p className="font-bold">
                {comment?.user?.name || user?.user?.name}
              </p>
              <p>{moment(comment?.createdAt).format("DD-MM-YYYY")}</p>
              <div className="pt-3">{comment?.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
