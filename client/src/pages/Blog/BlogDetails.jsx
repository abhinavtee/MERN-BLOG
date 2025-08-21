import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { RouteBlog, RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/use-fetch";
import { getEnv } from "@/helpers/getEnv";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import LoadingScreen from "@/components/LoadingScreen";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from "moment";

const BlogDetails = () => {

    const [refresh, setRefresh] = useState(false);
      const {
        data: blogData,
        loading,
        error,
      } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`, {
        method: "get",
        credentials: "include",
      }, [refresh]);
      
    //Delete Function 
     const handleDelete = (id)=> {
          const response = deleteData(`${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`);
          if(response){
            setRefresh(!refresh);
            showToast("success", "Article deleted successfully");
          } else{
            showToast("error", "Something went wrong");
          }
     }
    
      if (loading) return <LoadingScreen />;
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.category?.name}</TableCell>
                    <TableCell>{blog?.title}</TableCell>
                    <TableCell>{blog.slug}</TableCell>
                    <TableCell>{moment(blog.createdAt).format("DD-MM-YYYY")}</TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                        asChild
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FiEdit />
                        </Link>
                      </Button>

                      <Button
                        onClick={() => handleDelete(blog._id)}
                        variant="outline"
                        className="hover:bg-red-500 hover:text-white"
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">No blog Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
