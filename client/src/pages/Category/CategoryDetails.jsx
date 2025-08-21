import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategrory, RouteEditCategrory } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/use-fetch";
import { getEnv } from "@/helpers/getEnv";
import LoadingScreen from "@/components/LoadingScreen";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";

const CategoryDetails = () => {
  const [refreshData, setRefresh] = useState(false);
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  }, [refreshData]);
  
//Delete Function 
 const handleDelete = (id)=> {
      const response = deleteData(`${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`);
      if(response){
        setRefresh(!refreshData);
        showToast("success", "Category deleted successfully");
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
              <Link to={RouteAddCategrory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.category.length > 0 ? (
                categoryData.category.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                        asChild
                      >
                        <Link to={RouteEditCategrory(category._id)}>
                          <FiEdit />
                        </Link>
                      </Button>

                      <Button
                      onClick = {() => handleDelete(category._id)}
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
                  <TableCell colSpan="3">No Category Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
