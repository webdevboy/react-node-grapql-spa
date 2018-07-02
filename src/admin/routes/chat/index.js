import React from "react";
import Layout from "../../components/Layout";
import Chat from "../../components/Chat";
import ChatRoom from "../../components/Chat/ChatRoom";

import { getChatRooms, getSingleChatRoom, getAllMessagesFromRoom } from "admin/actions/chat";

import Cookies from "js-cookie";
import { find } from "lodash";

export default {

  path: "/chat",

  name: "chat",

  rootNav: true,

  permission: "manage_chat",

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: "",

      name: "chat",

      nav: true,

      async action({ store, route, client }) {
        console.log("passei aqui!");

        // store.dispatch(setCurrentTalk((Cookies.get("chattalks-expanded") == "true")));
        await store.dispatch(getChatRooms());

        const { rooms } = store.getState().chat;

        return {
          title: "Chat",
          chunk: "chatManager",
          permission: "manage_chat",
          component: <Layout><Chat isManager rooms={rooms} /></Layout>,
        };
      },
    },
    {
      // inside chat conversation
      path: "/:id",

      name: "conversation",

      nav: true,

      permission: "manage_chat",

      async action({ store, params, route }) {
        const { rooms } = await store.getState().chat;
        console.log(rooms.length);


        if (!rooms.length) { // 1
          await store.dispatch(getSingleChatRoom(params.id)); // add    [{},{}]
        } else {
          await store.dispatch(getAllMessagesFromRoom(params.id)); // update
        }

        const room = await find(store.getState().chat.rooms, { id: params.id });
        // if (!room) {
        //   return { redirect: route.parent.path || '/' }
        // }


        return {
          title: "Conversation",
          chunk: "chatRoom",

          component: <Layout route={route}><Chat currentRoute={route} isManager={false} room={room} /></Layout>,
        };
      },

    },

  ],

  async action({ next }) {
    const child = await next();
    // check if token is present or redirect to /login
    return child;
  },

};
