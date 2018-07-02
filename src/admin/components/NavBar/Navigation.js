const NAVIGATION = [
  {
    label: "Dashboard",
    iconOnly: true,
    icon: "pt-icon-dashboard",
    path: "",
  },
  {
    label: "Chat",
    icon: "pt-icon-chat",
    path: "/chat",
  },
  {
    label: "Media Library",
    icon: "pt-icon-media",
    path: "/media",
  },
  {
    label: "Users",
    icon: "pt-icon-people",
    path: "/users",
    children: [
      {
        label: "Add User",
        icon: "pt-icon-new-person",
        path: "/users/add",
      },
      {
        divider: true,
      },
      {
        label: "Manage Users",
        icon: "pt-icon-user",
        path: "/users",
      },
      {
        label: "Manage Roles",
        icon: "pt-icon-walk",
        path: "/users/roles",
        children: [
          {
            label: "Add Role",
            icon: "pt-icon-add",
            path: "/users/roles/add",
          },
          {
            label: "Manage Roles",
            icon: "pt-icon-id-number",
            path: "/users/roles",
          },
        ],
      },
      // {
      //   label: 'Permissions',
      //   icon: 'pt-icon-cog',
      //   path: '/users/permissions',
      // },
    ],
  },
  {
    label: "Website",
    icon: "pt-icon-application",
    path: "/website",
    children: [
      {
        label: "Pages",
        icon: "pt-icon-document",
        path: "/website/pages",
        children: [
          {
            label: "New Page",
            icon: "pt-icon-add",
            path: "/website/pages/add",
          },
          {
            label: "Manage Pages",
            icon: "pt-icon-add",
            path: "/website/pages",
          },
        ],
      },
      {
        label: "Articles",
        icon: "pt-icon-font",
        path: "",
        children: [
          {
            label: "Add Article",
            icon: "pt-icon-add",
            path: "/website/articles/add",
          },
          {
            label: "Manage Articles",
            icon: "pt-icon-font",
            path: "/website/articles",
          },
		  {
            label: "Manage Categories",
            icon: "pt-icon-font",
            path: "/website/articles/category",
          },
		  {
            label: "Manage Tags",
            icon: "pt-icon-font",
            path: "/website/articles/tag",
          },
        ],
      },
      {
        label: "Events",
        icon: "pt-icon-timeline-events",
        path: "",
        children: [
          {
            label: "Add Event",
            icon: "pt-icon-add",
            path: "/website/events/add",
          },
          {
            label: "Manage Events",
            icon: "pt-icon-timeline-events",
            path: "/website/events",
          },
        ],
      },
      {
        label: "Fleet",
        icon: "pt-icon-airplane",
        path: "",
        children: [
          {
            label: "Add Aircraft",
            icon: "pt-icon-add",
            path: "/website/aircrafts/add",
          },
          {
            divider: true,
          },
          {
            label: "Manage Fleet",
            icon: "pt-icon-airplane",
            path: "/website/aircrafts",
          },
        ],
      },
      {
        label: "Airport",
        icon: "pt-icon-airplane",
        path: "",
        children: [
          {
            label: "Add Airport",
            icon: "pt-icon-add",
            path: "/website/airports/add",
          },
          {
            divider: true,
          },
          {
            label: "Manage Airport",
            icon: "pt-icon-airplane",
            path: "/website/airports",
          },
        ],
      },
      {
        label: "Team",
        icon: "pt-icon-people",
        path: "/website/team",
        children: [
          {
            label: "Add Team Member",
            icon: "pt-icon-add",
            path: "/website/team/add",
          },
          {
            label: "Manage Teams",
            icon: "pt-icon-add",
            path: "/website/team/departments",
          },
          {
            label: "Manage Members",
            icon: "pt-icon-add",
            path: "/website/team",
          },
        ],
      },
      {
        label: "Partners",
        icon: "pt-icon-people",
        path: "/website/partners",
        children: [
          {
            label: "Add partner",
            icon: "pt-icon-add",
            path: "/website/partners/add",
          },
          {
            label: "Manage partners",
            icon: "pt-icon-add",
            path: "/website/partners",
          }
        ],
      },
      {
        label: "Jobs",
        icon: "pt-icon-document",
        path: "/website/jobs",
        children: [
          {
            label: "Add Job",
            icon: "pt-icon-add",
            path: "/website/jobs/add",
          },
          {
            label: "Manage jobs",
            icon: "pt-icon-add",
            path: "/website/jobs",
          },
        ]
      },
      {
        label: "Reviews",
        icon: "pt-icon-document",
        path: "/website/reviews",
        children: [
          {
            label: "Add Review",
            icon: "pt-icon-add",
            path: "/website/reviews/add",
          },
          {
            label: "Manage Reviews",
            icon: "pt-icon-add",
            path: "/website/reviews",
          },
        ]
      },
      {
        label: "Offices",
        icon: "pt-icon-document",
        path: "/website/offices",
      },
      {
        label: "Empty Legs",
        icon: "pt-icon-airplane",
        path: "",
        children: [
          {
            label: "Add Empty Legs",
            icon: "pt-icon-add",
            path: "/website/empty-legs/add",
          },
          {
            label: "Manage Empty Legs",
            icon: "pt-icon-airplane",
            path: "/website/empty-legs",
          },
        ]
      },
    ],
  },
  {
    label: "Tools",
    icon: "pt-icon-wrench",
    children: [
      {
        label: "Logs",
        path: "/tools/logs",
        icon: "pt-icon-console",
      },
      {
        label: "Push notifications",
        path: "/tools/push-notifications",
        icon: "pt-icon-notifications",
      },
      { divider: true },
      {
        label: "Email Manager",
        path: "/tools/email-manager",
        icon: "pt-icon-envelope",
        children: [
          {
            label: "Add Email Template",
            icon: "pt-icon-add",
            path: "/tools/email-manager/add",
          },
          {
            label: "Manage Email Template",
            icon: "pt-icon-envelope",
            path: "/tools/email-manager",
          }
        ] 
      },
      {
        label: "Translations",
        path: "/tools/translations",
        icon: "pt-icon-translate",
      },
      {
        label: "URL Redirections",
        path: "/tools/url-redirections",
        icon: "pt-icon-git-merge",
      },
      {
        label: "Sitemap",
        path: "/tools/sitemap",
        icon: "pt-icon-globe",
      },
      { divider: true },
      {
        label: "General Settings",
        path: "/tools/settings",
        icon: "pt-icon-cog",
      },
    ],
  },
];

export default NAVIGATION;
