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
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import UserIcon from "@/assets/images/user.png";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";

const Users = () => {
  const [refreshData, setRefresh] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-all-user`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  //Delete Function
  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/user/delete/${id}`
    );
    if (response) {
      setRefresh(!refreshData);
      showToast("success", "User deleted successfully");
    } else {
      showToast("error", "User deletion failed");
    }
  };

  if (loading) return <LoadingScreen />;
  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Name </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? (
                data.user.map((user) => (
                  <TableRow key={user._id}>
                    
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <img
                        src={user.avatar || UserIcon}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    </TableCell>
                      <TableCell>{moment(user.createdAt).format("DD-MM-YYYY")}</TableCell>
                   
                   

                    <TableCell className="flex gap-3">
                      <Button
                        onClick={() => handleDelete(user._id)}
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

export default Users;
