import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import {
  RouteAddCategrory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteCategroryDetails,
  RouteCommentDetails,
  RouteEditCategrory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./helpers/RouteName";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AddCategory from "./pages/Category/AddCategory";
import EditCategory from "./pages/Category/EditCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import AddBlog from "./pages/Blog/AddBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import EditBlog from "./pages/Blog/EditBlog";
import SingleBlogDetails from "./pages/SingleBlogDetails";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import Comments from "./pages/Comment";
import Users from "./pages/User";
import AuthRouteProtection from "./components/AuthRouteProtection";
import AuthRouteProtectionOnlyAdmin from "./components/AuthRouteProtectionOnlyAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RouteIndex is a route URL path name in helper folder */}
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />

          {/* Blog  */}
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />

          <Route element={<AuthRouteProtection />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteCommentDetails} element={<Comments />} />
          </Route>
          <Route element={<AuthRouteProtectionOnlyAdmin />}>
            {/* Blog Category  */}
            <Route path={RouteAddCategrory} element={<AddCategory />} />
            <Route path={RouteCategroryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategrory()} element={<EditCategory />} />
            <Route path={RouteUser} element={<Users />} />
          </Route>
        </Route>
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
