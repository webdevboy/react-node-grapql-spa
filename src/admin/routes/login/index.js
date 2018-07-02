import React from "react";
import Login from "./Login";
import Layout from "admin/components/Layout";

function action({
  route, client, fetch, store,
}) {
  const { user } = store.getState().auth;

  // if (user) {
  //   if (route.parent) {
  //     return { redirect: route.parent.path };
  //   }
  //   return { redirect: "" };
  // }

  return {
    title: "Login",
    chunk: 'admin-login',
    component: (
      <Layout hideNav>
        <Login />
      </Layout>
    ),
  };
}

export default action;
