import { createBrowserRouter } from "react-router-dom";

import Layout, {loader as layoutLoader} from "../layouts/Layout";

import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";
import UserPage from "../pages/user/UserPage";

//users pages
import HomePage from "../pages/user/home/HomePage";
import ProfilePage, {loader as profileLoader} from "../pages/user/profile/ProfilePage";
import EditProfilePage, {action as editProfileAction} from "../pages/user/profile/EditProfilePage";

import ListsPage, {loader as listsLoader} from "../pages/user/lists/ListsPage";
import FormListPage, {action as formListAction} from "../pages/user/lists/FormListPage";
import ListPage, {loader as listLoader} from "../pages/user/lists/ListPage";

import ProtectedRoute, {loader as protectedLoader} from "../components/ProtectedRoute";

//modals action
import {action as loginAction } from "../components/modals/Login";
import {action as registerAction } from "../components/modals/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/login",
        action: loginAction,
        element: <LandingPage />
      },
      {
        path: "/register",
        action: registerAction,
        element: <LandingPage />
      }
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserPage />
      </ProtectedRoute>
    ),
    loader: protectedLoader,
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: "profile/edit",
        element: <EditProfilePage />,
        action: editProfileAction
      },
      {
        path: "lists",
        element: <ListsPage />,
        loader: listsLoader
      },
      {
        path: "lists/:listId",
        element: <ListPage />,
        loader: listLoader
      },
      {
        path: "lists/:listId/edit",
        element: <FormListPage />,
        loader: listLoader,
        action: formListAction
      },
      {
        path: "lists/create",
        element: <FormListPage />,
        action: formListAction
      },
      {
        path: "lists/:listId/delete",
        action: formListAction
      },
    ],
  },
]);
