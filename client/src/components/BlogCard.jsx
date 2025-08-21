import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { FaRegCalendarAlt } from "react-icons/fa";
import userIcon from "../assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const BlogCard = ({ props }) => {
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      {/* 1. Make card flex-col and full height */}
      <Card className="flex flex-col h-full pt-5 shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        {/* 2. Make CardContent flex-col + flex-1 so text takes remaining space */}
        <CardContent className="flex flex-col flex-1">
          {/* First Row */}
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center gap-2">
              <Avatar>
                <AvatarImage src={props.author.avatar || userIcon} />
              </Avatar>
              <span>{props.author.name}</span>
            </div>
            {props.author.role === "admin" && (
              <Badge variant="outline" className="bg-violet-300">
                Admin
              </Badge>
            )}
          </div>

          {/* Second Row - Fixed image height */}
          <div className="w-full h-48 overflow-hidden rounded my-2">
            <img
              src={props.featuredImage}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text content - flex-1 ensures equal card height */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="flex items-center gap-2 mb-2">
                <FaRegCalendarAlt />
                <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
              </p>
              <h2 className="text-2xl font-bold line-clamp-2">{props.title}</h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
