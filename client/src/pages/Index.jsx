import BlogCard from "@/components/BlogCard";
import LoadingScreen from "@/components/LoadingScreen";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/use-fetch";
import React from "react";

const Index = () => {
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/blogs`, {
    method: "get",
    credentials: "include",
  });
  if (loading) return <LoadingScreen />;
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {blogData && blogData.blog.length > 0 ? (
        blogData.blog.map((blog) => <BlogCard key={blog._id} props={blog} />)
      ) : (
        <div>No Blog Found</div>
      )}
    </div>
  );
};

export default Index;
