export default {
  path: '/private-jet-charter',
  name: 'private-jet-charter',
  children: [
    {
      path: '',
      children: [
        {
          path: '',
          load: () => import(/* webpackChunkName: "client-private-jet-charter" */ './PrivateJetCharter'),
        },
        {
          path: '/fly-to-:toDestination',
          name: 'private-jet-charter-fly-to',
          children: [
            {
              path: '',
              load: () => import(/* webpackChunkName: "client-private-jet-charter-destination" */ './PrivateJetCharterDestination'),
            },
            {
              path: '/from-:fromDestination',
              name: 'private-jet-charter-fly-from-to',
              load: () => import(/* webpackChunkName: "client-private-jet-charter-from-to-destination" */ './PrivateJetCharterFromToDestination'),
            },
          ],
        },
        {
          path: '/fly-with-a-:manufacturer_slug',
          name: 'fly-with-manufacturer',
          load: () => import(/* webpackChunkName: "client-private-jet-charter-manufacturer" */ './PrivateJetCharterManufacturer'),
        },
        {
          path: '/fly-a-:category_slug',
          name: 'fly-with-category',
          load: () => import(/* webpackChunkName: "client-private-jet-charter-category" */ './PrivateJetCharterCategory'),
        },
      ],
    },
  ],
};
