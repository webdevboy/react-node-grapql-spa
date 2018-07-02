import React from "react";
import Layout from "../../components/Layout";
import Media from "./Media";

export default {

  path: "/media",
  name: "Media",

  children: [
  	{
      path: "",
      name: "Media",
  		async action({ store }) {
  			// await store.dispatch(getFiles());
  			return {
	  			title: "Media Center",
			    permission: "manage_media_center",
			    component: <Layout><MediaCenter /></Layout>,
  			};
      	},
  	},
  	{
      path: "/:id",
      name: "Edit Media",
  		async action({ store, params }) {
        // await store.dispatch(getFiles());
  			return {
  				title: "Edit Image",
	      		permission: "manage_media_center",
	      		component: <Layout><MediaCenterEditor id={params.id} /></Layout>,
  			};
      	},
  	},
  ],

  async action({ next }) {
  	// let { media } = store.getState().media;

  	// if (!media.length) {

  	// 	const { data } = await client.networkInterface.query({
	  // 		query: gql`{
	  // 			getAllMedia(order: "asc") {
    // 	    id
    // 	    src
    // 	    thumbnail
    // 	    filename
    // 	    extension
    // 	    size
    // 	    created_at
    // 	}
    // }`,
	  // 	});

	  // 	media = data.getAllMedia.reduce((result, val) => {
	  // 		result[val.id] = val;
	  // 		return result
	  // 	}, {});

  	// }


  	const route = await next();
    return route;
  },

};
