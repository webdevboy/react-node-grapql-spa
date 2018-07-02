INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('eb3657b4-5f9f-4251-80a7-c7f68e759ab1', 'reviews-testimonials', {'/why-lunajets/reviews-testimonials'},
                                                'Reviews and testimonials about LunaJets', 'default',
                                                '{"0":{"id":0,"component":null,"childIds":["549b557c-e002-42f0-91d1-f9949b31fae9","d1abf194-f3e8-4d73-b7a7-1dbc04799ff4","cf3d5a24-564c-4caa-b44e-ff60a570d93a","877f4c7f-445d-4c48-8a50-af0b03d7917b","fa18959e-dd4f-49c2-a09a-090985f7fbe1","3572d73d-0ec9-49b3-85c9-e41c05f5c411","42c537af-9f90-4909-b71a-c1a840afcc4b"],"cssDesktop":{},"styleSheet":""},"549b557c-e002-42f0-91d1-f9949b31fae9":{"id":"549b557c-e002-42f0-91d1-f9949b31fae9","component":{"name":"Nav Bar Top","props":{"login":"abxd"},"type":"abstract","data_type":"component","dependencies":["Row","Column","Root"],"category":"Navigation"},"childIds":[]},"d1abf194-f3e8-4d73-b7a7-1dbc04799ff4":{"id":"d1abf194-f3e8-4d73-b7a7-1dbc04799ff4","component":{"name":"Nav Bar","props":{},"type":"strict","data_type":"component","dependencies":["Row","Column","Root"],"category":"Navigation"},"childIds":[]},"3572d73d-0ec9-49b3-85c9-e41c05f5c411":{"id":"3572d73d-0ec9-49b3-85c9-e41c05f5c411","component":{"name":"Footer Links","props":{},"type":"strict","data_type":"component","dependencies":["Row","Column","Root"],"category":"Footer"},"childIds":[]},"42c537af-9f90-4909-b71a-c1a840afcc4b":{"id":"42c537af-9f90-4909-b71a-c1a840afcc4b","component":{"name":"Footer End","props":{},"type":"strict","data_type":"component","dependencies":["Row","Column","Root"],"category":"Footer"},"childIds":[]},"fa18959e-dd4f-49c2-a09a-090985f7fbe1":{"id":"fa18959e-dd4f-49c2-a09a-090985f7fbe1","component":{"name":"Subscriptor","props":{},"type":"abstract","data_type":"component","dependencies":["Root","Column","Row"],"category":"component"},"childIds":[]},"cf3d5a24-564c-4caa-b44e-ff60a570d93a":{"id":"cf3d5a24-564c-4caa-b44e-ff60a570d93a","component":{"name":"Reviews Header","props":{},"type":"strict","data_type":"component","dependencies":["Row","Column","Root"],"category":"Reviews"},"childIds":[]},"877f4c7f-445d-4c48-8a50-af0b03d7917b":{"id":"877f4c7f-445d-4c48-8a50-af0b03d7917b","component":{"name":"Review Section","props":{},"type":"strict","data_type":"component","dependencies":["Row","Column","Root"],"category":"Reviews"},"childIds":[]}}',
                                                FALSE, '', '', NULL, FALSE, '2017-10-12 16:52:49.522000 +01:00',
        '2017-10-31 11:14:57.104000', NULL, '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('b3f501c1-a12d-43e0-8531-7fc379f6b1a5', 'test', '{/test2}', 'Test', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-18 18:37:08.753000 +01:00', '2017-10-18 18:37:08.879000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('0c994b77-59a7-4236-bd2a-3db880f6ad6a', 'lelel', '{/lelel}', 'Lelel', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "f8b7b25b-3eb8-459f-beef-36ffffb52072",
      "7a4145de-7555-43d5-a902-b5a3a6c3cdde"
    ],
    "styleSheet": "",
    "props": {
      "navBarStatus": false,
      "treeViewStatus": false
    }
  },
  "f8b7b25b-3eb8-459f-beef-36ffffb52072": {
    "id": "f8b7b25b-3eb8-459f-beef-36ffffb52072",
    "component": {
      "name": "Row",
      "props": {},
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": [
      "8f4eeea5-3336-430b-a820-7554e7a59056",
      "04368774-8be6-425c-9ebf-0deea81ba25b"
    ]
  },
  "8f4eeea5-3336-430b-a820-7554e7a59056": {
    "id": "8f4eeea5-3336-430b-a820-7554e7a59056",
    "component": {
      "name": "Column",
      "props": {},
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Row"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "04368774-8be6-425c-9ebf-0deea81ba25b": {
    "id": "04368774-8be6-425c-9ebf-0deea81ba25b",
    "component": {
      "name": "Column",
      "props": {},
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Row"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "7a4145de-7555-43d5-a902-b5a3a6c3cdde": {
    "id": "7a4145de-7555-43d5-a902-b5a3a6c3cdde",
    "component": {
      "name": "Header",
      "props": {},
      "proptypes": {
        "background": "media",
        "heading": {
          "title": "text",
          "subtitle": "text",
          "hasTitle": "bool",
          "hasSubtitle": "bool"
        },
        "requestFlight": "bool",
        "rightButton": {
          "background": "color",
          "color": "color",
          "icon": "icon",
          "label": "string"
        }
      },
      "type": "strict",
      "data_type": "other",
      "dependencies": [
        "Root"
      ],
      "category": "component"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-11 16:28:00.693000 +01:00', '2017-10-12 20:56:45.491000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('1996496c-6511-4f9f-a623-2d2726b1f452', 'home', '{/}', 'Home page', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "3667431e-fe73-49eb-9b65-918dd74e9e8f",
      "f9c2a830-41e2-48b0-9fce-21b22c8add93",
      "ceeb8a80-6bc8-4012-829a-3a4ed022b3f1",
      "937c036c-1151-4e64-be9a-66eec0155553",
      "2099a83c-e8a5-481b-bff1-d54dc30c9e5b",
      "aa09fead-5aa0-4fb1-ba62-30a4e793550f",
      "b7c1a3bd-8983-4983-9d2c-2e55fdb38f73",
      "be2e0b0d-45ef-4e70-8d14-beabec657e6f",
      "3e20a066-8a15-4d3a-ad59-73eb1a49488c",
      "8200526f-c4c2-4deb-add7-1268d1db6d16",
      "00410715-e776-4bb4-8b68-e9bb18b7486e"
    ],
    "props": {
      "navBarStatus": false,
      "treeViewStatus": false,
      "autoSave": false
    },
    "styleSheet": ".sc3e00470-422b-44c5-867c-ab1b45cfdbe7{background-size:cover;background-position-x:50%;background-position-y:50%;background-repeat:no-repeat;justify-content:center;align-self:auto;position:relative;flex-direction:column;background-color:transparent;height:96px;max-width:}.sa1ee6e29-c057-4642-9a63-f2e050b759c1{width:1140px;margin-left:auto;margin-right:auto;height:{dispatchConfig:null;_targetInst:null;isDefaultPrevented:null;isPropagationStopped:null;_dispatchListeners:null;_dispatchInstances:null;nativeEvent:null;type:null;target:null;eventPhase:null;bubbles:null;cancelable:null;defaultPrevented:null;isTrusted:null;location:null;ctrlKey:null;shiftKey:null;altKey:null;metaKey:null;repeat:null;locale:null}}.sefc896a9-a8b9-48af-be70-4c66e038d9e3{width:1140px;max-width:auto;min-width:auto;justify-content:center;align-self:center;background-color:transparent}.sbccd7d36-4a5b-4d50-a799-105046af0082{width:1200px}.s82c0495a-cf37-4a3f-a997-2845fb31b9f3{background-color:#ffffff}.s00b0e9a9-e155-4a7a-bad9-c7783a530482{justify-content:center}.sa77d524c-5886-4970-9093-0d6a7ffc1653{padding-left:15px;padding-right:15px}.sceeb8a80-6bc8-4012-829a-3a4ed022b3f1{background-position-x:50%;background-position-y:50%;background-size:cover;height:600px;background-repeat:no-repeat;justify-content:center;background-color:#cccccc;background-image:url(https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/a7ad0b01b6b0712ac619cc94c4a09be31508342525014.jpeg)}.s13d721f9-c569-4a7f-bcb9-2187bc74888c{padding-left:15px;padding-right:15px}",
    "cssDesktop": {
      ".sc3e00470-422b-44c5-867c-ab1b45cfdbe7": {
        "background-size": "cover",
        "background-position-x": "50%",
        "background-position-y": "50%",
        "background-repeat": "no-repeat",
        "justify-content": "center",
        "align-self": "auto",
        "position": "relative",
        "flex-direction": "column",
        "background-color": "transparent",
        "height": "96px",
        "max-width": ""
      },
      ".sa1ee6e29-c057-4642-9a63-f2e050b759c1": {
        "width": "1140px",
        "margin-left": "auto",
        "margin-right": "auto",
        "height": {
          "dispatchConfig": null,
          "_targetInst": null,
          "isDefaultPrevented": null,
          "isPropagationStopped": null,
          "_dispatchListeners": null,
          "_dispatchInstances": null,
          "nativeEvent": null,
          "type": null,
          "target": null,
          "eventPhase": null,
          "bubbles": null,
          "cancelable": null,
          "defaultPrevented": null,
          "isTrusted": null,
          "location": null,
          "ctrlKey": null,
          "shiftKey": null,
          "altKey": null,
          "metaKey": null,
          "repeat": null,
          "locale": null
        }
      },
      ".sefc896a9-a8b9-48af-be70-4c66e038d9e3": {
        "width": "1140px",
        "max-width": "auto",
        "min-width": "auto",
        "justify-content": "center",
        "align-self": "center",
        "background-color": "transparent"
      },
      ".sbccd7d36-4a5b-4d50-a799-105046af0082": {
        "width": "1200px"
      },
      ".s82c0495a-cf37-4a3f-a997-2845fb31b9f3": {
        "background-color": "#ffffff"
      },
      ".s00b0e9a9-e155-4a7a-bad9-c7783a530482": {
        "justify-content": "center"
      },
      ".sa77d524c-5886-4970-9093-0d6a7ffc1653": {
        "padding-left": "15px",
        "padding-right": "15px"
      },
      ".sceeb8a80-6bc8-4012-829a-3a4ed022b3f1": {
        "background-position-x": "50%",
        "background-position-y": "50%",
        "background-size": "cover",
        "height": "600px",
        "background-repeat": "no-repeat",
        "justify-content": "center",
        "background-color": "#cccccc",
        "background-image": "url(https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/a7ad0b01b6b0712ac619cc94c4a09be31508342525014.jpeg)"
      },
      ".s13d721f9-c569-4a7f-bcb9-2187bc74888c": {
        "padding-left": "15px",
        "padding-right": "15px"
      }
    }
  },
  "3667431e-fe73-49eb-9b65-918dd74e9e8f": {
    "id": "3667431e-fe73-49eb-9b65-918dd74e9e8f",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "f9c2a830-41e2-48b0-9fce-21b22c8add93": {
    "id": "f9c2a830-41e2-48b0-9fce-21b22c8add93",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "937c036c-1151-4e64-be9a-66eec0155553": {
    "id": "937c036c-1151-4e64-be9a-66eec0155553",
    "component": {
      "name": "Home Section",
      "props": {},
      "type": "strict",
      "data_type": "other",
      "dependencies": [
        "Root",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "aa09fead-5aa0-4fb1-ba62-30a4e793550f": {
    "id": "aa09fead-5aa0-4fb1-ba62-30a4e793550f",
    "component": {
      "name": "Nearby Empty Legs",
      "props": {},
      "type": "strict",
      "data_type": "other",
      "dependencies": [
        "Root"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "00410715-e776-4bb4-8b68-e9bb18b7486e": {
    "id": "00410715-e776-4bb4-8b68-e9bb18b7486e",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "3e20a066-8a15-4d3a-ad59-73eb1a49488c": {
    "id": "3e20a066-8a15-4d3a-ad59-73eb1a49488c",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "2099a83c-e8a5-481b-bff1-d54dc30c9e5b": {
    "id": "2099a83c-e8a5-481b-bff1-d54dc30c9e5b",
    "component": {
      "name": "Home Testimonials",
      "props": {},
      "type": "strict",
      "data_type": "other",
      "dependencies": [
        "Root",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "b7c1a3bd-8983-4983-9d2c-2e55fdb38f73": {
    "id": "b7c1a3bd-8983-4983-9d2c-2e55fdb38f73",
    "component": {
      "name": "Trending Locations",
      "props": {},
      "type": "strict",
      "data_type": "other",
      "dependencies": [
        "Root",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "be2e0b0d-45ef-4e70-8d14-beabec657e6f": {
    "id": "be2e0b0d-45ef-4e70-8d14-beabec657e6f",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "cb4b24ff-3c82-4837-a71a-2875dd664cfd": {
    "id": "cb4b24ff-3c82-4837-a71a-2875dd664cfd",
    "component": {
      "name": "Row",
      "props": {},
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "ceeb8a80-6bc8-4012-829a-3a4ed022b3f1": {
    "id": "ceeb8a80-6bc8-4012-829a-3a4ed022b3f1",
    "component": {
      "name": "Row",
      "props": {
        "0": "sceeb8a80-6bc8-4012-829a-3a4ed022b3f1",
        "1": "bouncing-arrow",
        "classnames": [
          "sceeb8a80-6bc8-4012-829a-3a4ed022b3f1",
          "bouncing-arrow"
        ],
        "alias": "Header"
      },
      "proptypes": {
        "row": "row"
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": [
      "3fff1edc-7958-4d02-8efd-9fbe5e5ac4b8"
    ]
  },
  "3fff1edc-7958-4d02-8efd-9fbe5e5ac4b8": {
    "id": "3fff1edc-7958-4d02-8efd-9fbe5e5ac4b8",
    "component": {
      "name": "Column",
      "props": {
        "classnames": [
          "max-container-width",
          "s00b0e9a9-e155-4a7a-bad9-c7783a530482"
        ],
        "collapsed": false
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Row"
      ],
      "category": "layout"
    },
    "childIds": [
      "064960f7-cdf2-42a4-8863-04159a9909fb",
      "13d721f9-c569-4a7f-bcb9-2187bc74888c"
    ]
  },
  "064960f7-cdf2-42a4-8863-04159a9909fb": {
    "id": "064960f7-cdf2-42a4-8863-04159a9909fb",
    "component": {
      "name": "Row",
      "props": {
        "classnames": [
          "sa77d524c-5886-4970-9093-0d6a7ffc1653"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": [
      "e062e71a-a611-460e-aeb9-00fb532725a7"
    ]
  },
  "e062e71a-a611-460e-aeb9-00fb532725a7": {
    "id": "e062e71a-a611-460e-aeb9-00fb532725a7",
    "component": {
      "name": "Text",
      "props": {
        "string": {
          "defaultMessage": "Insert your text here",
          "id": "client.home.Text.string1508526352743"
        },
        "classnames": [
          "home-heading"
        ]
      },
      "proptypes": {
        "string": "text"
      },
      "type": "strict",
      "data_type": "text",
      "dependencies": [
        "Row",
        "Column"
      ],
      "category": "text"
    },
    "childIds": []
  },
  "13d721f9-c569-4a7f-bcb9-2187bc74888c": {
    "id": "13d721f9-c569-4a7f-bcb9-2187bc74888c",
    "component": {
      "name": "Row",
      "props": {
        "classnames": [
          "s13d721f9-c569-4a7f-bcb9-2187bc74888c"
        ]
      },
      "proptypes": {
        "row": "row"
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": [
      "15dd3377-d4b2-4b5e-ad9d-3fa8363da0e1"
    ]
  },
  "15dd3377-d4b2-4b5e-ad9d-3fa8363da0e1": {
    "id": "15dd3377-d4b2-4b5e-ad9d-3fa8363da0e1",
    "component": {
      "name": "Request Flight",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Leads"
    },
    "childIds": []
  },
  "8200526f-c4c2-4deb-add7-1268d1db6d16": {
    "id": "8200526f-c4c2-4deb-add7-1268d1db6d16",
    "component": {
      "name": "Footer badges",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  }
}', TRUE, '', '', '', TRUE, '2017-10-06 11:42:06.843000 +01:00', '2017-11-06 18:00:57.841000', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('c872e2dc-7960-4f53-b7d6-f0968765f102', 'test-1234', '{/test1234}', 'Test 1234', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [],
    "cssDesktop": {},
    "styleSheet": ""
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-13 09:44:07.798000 +01:00', '2017-10-21 13:47:22.411000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('c117ed63-8cdd-4ac7-8d64-90c24f86ddc9', 'tesr', '{/test}', 'Tesr', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [],
    "styleSheet": ""
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 20:12:20.952000 +01:00', '2017-10-13 12:02:56.687000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('5c5b9352-fcc0-464b-a1f6-0412be57bcfa', 'ricardo', '{/ricardo}', 'Ricardo', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:33:09.573000 +01:00', '2017-10-12 18:33:09.647000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('e54b7f9e-15a6-482d-bcf7-df8f044105d7', 'private-jet-charter-cost', '{/why-lunajets/private-jet-hire-cost}',
                                                'How much does a private jet charter cost ?', 'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "549b557c-e002-42f0-91d1-f9949b31fae9",
        "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
        "4b4f463c-59fe-4777-a604-c0b6cdfae455",
        "5cfc808f-4129-46fa-bd75-9313d06e1d0e",
        "cf149ac0-ed78-4098-b99d-f73a57233ff1",
        "38add207-90a3-4299-b6f3-bd325d87c1c2",
        "13940ac3-c384-45db-aa83-03ea7b6a91c7",
        "89db712b-6fdf-4699-bce3-a624f8984a44",
        "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
        "42c537af-9f90-4909-b71a-c1a840afcc4b"
      ],
      "cssDesktop": {},
      "styleSheet": ""
    },
    "549b557c-e002-42f0-91d1-f9949b31fae9": {
      "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
      "component": {
        "name": "Nav Bar Top",
        "props": {
          "login": "abxd"
        },
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
      "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
      "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "42c537af-9f90-4909-b71a-c1a840afcc4b": {
      "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "89db712b-6fdf-4699-bce3-a624f8984a44": {
      "id": "89db712b-6fdf-4699-bce3-a624f8984a44",
      "component": {
        "name": "Subscriptor",
        "props": {},
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Root",
          "Column",
          "Row"
        ],
        "category": "component"
      },
      "childIds": []
    },
    "4b4f463c-59fe-4777-a604-c0b6cdfae455": {
      "id": "4b4f463c-59fe-4777-a604-c0b6cdfae455",
      "component": {
        "name": "Private Jet Charter Cost Header",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "PrivateJetCharterCost"
      },
      "childIds": []
    },
    "5cfc808f-4129-46fa-bd75-9313d06e1d0e": {
      "id": "5cfc808f-4129-46fa-bd75-9313d06e1d0e",
      "component": {
        "name": "Private Jet Charter Cost Section",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "PrivateJetCharterCost"
      },
      "childIds": []
    },
    "cf149ac0-ed78-4098-b99d-f73a57233ff1": {
      "id": "cf149ac0-ed78-4098-b99d-f73a57233ff1",
      "component": {
        "name": "Private Jet Charter Cost Estimate",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "PrivateJetCharterCost"
      },
      "childIds": []
    },
    "38add207-90a3-4299-b6f3-bd325d87c1c2": {
      "id": "38add207-90a3-4299-b6f3-bd325d87c1c2",
      "component": {
        "name": "Private Jet Charter Cost Range Map",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "PrivateJetCharterCost"
      },
      "childIds": []
    },
    "13940ac3-c384-45db-aa83-03ea7b6a91c7": {
      "id": "13940ac3-c384-45db-aa83-03ea7b6a91c7",
      "component": {
        "name": "Private Jet Charter Cost Compare",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "PrivateJetCharterCost"
      },
      "childIds": []
    }
  }', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:30:27.429000 +01:00', '2017-10-23 18:39:52.109000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('4dea6b84-d3c1-4341-a1d3-c29a2912b419', 'our-team', '{/why-lunajets/our-team}', 'Lunajets'' advisors team',
                                                'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "ac80e800-50ae-4e8a-9c02-00c061e58bad",
        "1ca369f0-6a0d-493e-b8c3-fb13650b1b1a",
        "1816de7c-b054-4661-b782-69a60a604fe6",
        "31a3089d-a5d8-48c3-ae8d-45ee3542d171",
        "8efbd1cf-0bac-4786-afad-c4e7786ff9e0",
        "a96552d8-c793-4b9f-b140-1b3229b95920",
        "dd70f12f-a625-43ac-b49f-7c0778a6e141"
      ],
      "styleSheet": ""
    },
    "ac80e800-50ae-4e8a-9c02-00c061e58bad": {
      "id": "ac80e800-50ae-4e8a-9c02-00c061e58bad",
      "component": {
        "name": "Nav Bar Top",
        "props": {
          "login": "abxd"
        },
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "1ca369f0-6a0d-493e-b8c3-fb13650b1b1a": {
      "id": "1ca369f0-6a0d-493e-b8c3-fb13650b1b1a",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "a96552d8-c793-4b9f-b140-1b3229b95920": {
      "id": "a96552d8-c793-4b9f-b140-1b3229b95920",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "dd70f12f-a625-43ac-b49f-7c0778a6e141": {
      "id": "dd70f12f-a625-43ac-b49f-7c0778a6e141",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "1816de7c-b054-4661-b782-69a60a604fe6": {
      "id": "1816de7c-b054-4661-b782-69a60a604fe6",
      "component": {
        "name": "Team Header",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Team"
      },
      "childIds": []
    },
    "8efbd1cf-0bac-4786-afad-c4e7786ff9e0": {
      "id": "8efbd1cf-0bac-4786-afad-c4e7786ff9e0",
      "component": {
        "name": "Join Team",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Section"
      },
      "childIds": []
    },
    "31a3089d-a5d8-48c3-ae8d-45ee3542d171": {
      "id": "31a3089d-a5d8-48c3-ae8d-45ee3542d171",
      "component": {
        "name": "Team Section",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Team"
      },
      "childIds": []
    }
  }', FALSE, '{
  getTeam{
    id
    description
    name
    teamMembers{
      id
      first_name
      last_name
      email
      title
      bio
      visible
      override
    }
  }
}', '', NULL, FALSE, '2017-10-06 10:51:05.655000 +01:00', '2017-10-31 11:15:46.560000', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('33670e60-2e8b-475d-b57a-ac327956a28f', 'private-jet-cost-destinations', '{/to-:destination}',
                                                'Private jet cost destinations', 'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "549b557c-e002-42f0-91d1-f9949b31fae9",
        "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
        "505b43d0-21ab-4741-8e55-2a6ec633a4fb",
        "3ab779c1-eecf-48df-97fb-967df3b8e069",
        "2def7d3d-ce39-4471-82ad-66e315d4efe7",
        "e594e183-6e2f-4be4-945d-78b4db5c94db",
        "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
        "42c537af-9f90-4909-b71a-c1a840afcc4b"
      ],
      "cssDesktop": {},
      "styleSheet": ""
    },
    "549b557c-e002-42f0-91d1-f9949b31fae9": {
      "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
      "component": {
        "name": "Nav Bar Top",
        "props": {
          "login": "abxd"
        },
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
      "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
      "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "42c537af-9f90-4909-b71a-c1a840afcc4b": {
      "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "e594e183-6e2f-4be4-945d-78b4db5c94db": {
      "id": "e594e183-6e2f-4be4-945d-78b4db5c94db",
      "component": {
        "name": "Subscriptor",
        "props": {},
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Root",
          "Column",
          "Row"
        ],
        "category": "component"
      },
      "childIds": []
    },
    "505b43d0-21ab-4741-8e55-2a6ec633a4fb": {
      "id": "505b43d0-21ab-4741-8e55-2a6ec633a4fb",
      "component": {
        "name": "Private Jet Destination Header",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Destinations"
      },
      "childIds": []
    },
    "3ab779c1-eecf-48df-97fb-967df3b8e069": {
      "id": "3ab779c1-eecf-48df-97fb-967df3b8e069",
      "component": {
        "name": "Private Jet Destimation Estimate",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "PrivateJetDestination"
      },
      "childIds": []
    },
    "2def7d3d-ce39-4471-82ad-66e315d4efe7": {
      "id": "2def7d3d-ce39-4471-82ad-66e315d4efe7",
      "component": {
        "name": "Private Jet Other Destimation",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "PrivateJetDestination"
      },
      "childIds": []
    }
  }', FALSE, NULL, NULL, NULL, TRUE, '2017-10-12 18:29:57.658000 +01:00', '2017-10-26 12:16:25.126000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('daa1ba13-6d57-4457-98ce-f03ba57ce1db', 'test-page', '{/test/page/}', 'Test page ', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    }
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-23 15:09:51.852000 +01:00', '2017-10-23 15:09:51.869000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('931ecd84-43b5-4294-8595-1059d522797e', 'teste', '{/teste}', 'Teste', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "fb538e6f-1ba2-4b6b-86a1-dace9a77541d"
    ],
    "styleSheet": ".sfb538e6f-1ba2-4b6b-86a1-dace9a77541d{height:500px;background-image:url(https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/ff2f5135ba4aba9ade0387a84efc24561507895616415.png)}",
    "cssDesktop": {
      ".sfb538e6f-1ba2-4b6b-86a1-dace9a77541d": {
        "height": "500px",
        "background-image": "url(https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/ff2f5135ba4aba9ade0387a84efc24561507895616415.png)"
      }
    }
  },
  "fb538e6f-1ba2-4b6b-86a1-dace9a77541d": {
    "id": "fb538e6f-1ba2-4b6b-86a1-dace9a77541d",
    "component": {
      "name": "Row",
      "props": {
        "row": null,
        "classnames": [
          "sfb538e6f-1ba2-4b6b-86a1-dace9a77541d"
        ]
      },
      "proptypes": {
        "row": "row"
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-11 12:26:04.180000 +01:00', '2017-10-27 16:43:37.951000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('cfd5bfee-43b8-4de3-9a7c-819400bf28d1', 'lunajets-french-team', '{/team/team-france}', 'Lunajets french team',
                                                'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "ac80e800-50ae-4e8a-9c02-00c061e58bad",
        "1ca369f0-6a0d-493e-b8c3-fb13650b1b1a",
        "1816de7c-b054-4661-b782-69a60a604fe6",
        "31a3089d-a5d8-48c3-ae8d-45ee3542d171",
        "8efbd1cf-0bac-4786-afad-c4e7786ff9e0",
        "a96552d8-c793-4b9f-b140-1b3229b95920",
        "dd70f12f-a625-43ac-b49f-7c0778a6e141"
      ],
      "styleSheet": ""
    },
    "ac80e800-50ae-4e8a-9c02-00c061e58bad": {
      "id": "ac80e800-50ae-4e8a-9c02-00c061e58bad",
      "component": {
        "name": "Nav Bar Top",
        "props": {
          "login": "abxd"
        },
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "1ca369f0-6a0d-493e-b8c3-fb13650b1b1a": {
      "id": "1ca369f0-6a0d-493e-b8c3-fb13650b1b1a",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "a96552d8-c793-4b9f-b140-1b3229b95920": {
      "id": "a96552d8-c793-4b9f-b140-1b3229b95920",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "dd70f12f-a625-43ac-b49f-7c0778a6e141": {
      "id": "dd70f12f-a625-43ac-b49f-7c0778a6e141",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "1816de7c-b054-4661-b782-69a60a604fe6": {
      "id": "1816de7c-b054-4661-b782-69a60a604fe6",
      "component": {
        "name": "Team Header",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Team"
      },
      "childIds": []
    },
    "8efbd1cf-0bac-4786-afad-c4e7786ff9e0": {
      "id": "8efbd1cf-0bac-4786-afad-c4e7786ff9e0",
      "component": {
        "name": "Join Team",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Section"
      },
      "childIds": []
    },
    "31a3089d-a5d8-48c3-ae8d-45ee3542d171": {
      "id": "31a3089d-a5d8-48c3-ae8d-45ee3542d171",
      "component": {
        "name": "Team Section",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Team"
      },
      "childIds": []
    }
  }', FALSE, NULL, NULL, NULL, FALSE, '2017-10-17 12:42:33.129000 +01:00', '2017-10-17 12:42:33.170000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('b2ee2440-3694-47d0-ab26-10000fdefe92', 'services', '{/services}', 'Why do we fly in private jet?', 'default',
                                                '{
                                                  "0": {
                                                    "id": 0,
                                                    "component": null,
                                                    "childIds": [
                                                      "350c0ec1-40c6-42b2-bf8d-b017bf817e73",
                                                      "1016b66e-8e0b-42ea-b311-2ebc7d44f52e",
                                                      "e0fd6f2d-a014-442b-b3c0-10919d494147",
                                                      "f63e4ea6-150e-4405-8605-4adffe987530",
                                                      "b2eef254-a6b1-456d-ba43-43772f1476d0",
                                                      "7937558d-6ba4-44f3-8421-1577b4f5c814",
                                                      "cf2b5c82-32a2-4655-81e8-4011195602a9",
                                                      "adbaa85e-c959-48da-8084-437064a92bc8"
                                                    ],
                                                    "styleSheet": ""
                                                  },
                                                  "7937558d-6ba4-44f3-8421-1577b4f5c814": {
                                                    "id": "7937558d-6ba4-44f3-8421-1577b4f5c814",
                                                    "component": {
                                                      "name": "Subscriptor",
                                                      "props": {},
                                                      "type": "abstract",
                                                      "data_type": "component",
                                                      "dependencies": [
                                                        "Root",
                                                        "Column",
                                                        "Row"
                                                      ],
                                                      "category": "component"
                                                    },
                                                    "childIds": []
                                                  },
                                                  "cf2b5c82-32a2-4655-81e8-4011195602a9": {
                                                    "id": "cf2b5c82-32a2-4655-81e8-4011195602a9",
                                                    "component": {
                                                      "name": "Footer Links",
                                                      "props": {},
                                                      "type": "strict",
                                                      "data_type": "component",
                                                      "dependencies": [
                                                        "Row",
                                                        "Column",
                                                        "Root"
                                                      ],
                                                      "category": "Footer"
                                                    },
                                                    "childIds": []
                                                  },
                                                  "adbaa85e-c959-48da-8084-437064a92bc8": {
                                                    "id": "adbaa85e-c959-48da-8084-437064a92bc8",
                                                    "component": {
                                                      "name": "Footer End",
                                                      "props": {},
                                                      "type": "strict",
                                                      "data_type": "component",
                                                      "dependencies": [
                                                        "Row",
                                                        "Column",
                                                        "Root"
                                                      ],
                                                      "category": "Footer"
                                                    },
                                                    "childIds": []
                                                  },
                                                  "350c0ec1-40c6-42b2-bf8d-b017bf817e73": {
                                                    "id": "350c0ec1-40c6-42b2-bf8d-b017bf817e73",
                                                    "component": {
                                                      "name": "Nav Bar Top",
                                                      "props": {
                                                        "login": "abxd"
                                                      },
                                                      "type": "abstract",
                                                      "data_type": "component",
                                                      "dependencies": [
                                                        "Row",
                                                        "Column",
                                                        "Root"
                                                      ],
                                                      "category": "Navigation"
                                                    },
                                                    "childIds": []
                                                  },
                                                  "1016b66e-8e0b-42ea-b311-2ebc7d44f52e": {
                                                    "id": "1016b66e-8e0b-42ea-b311-2ebc7d44f52e",
                                                    "component": {
                                                      "name": "Nav Bar",
                                                      "props": {},
                                                      "type": "strict",
                                                      "data_type": "component",
                                                      "dependencies": [
                                                        "Row",
                                                        "Column",
                                                        "Root"
                                                      ],
                                                      "category": "Navigation"
                                                    },
                                                    "childIds": []
                                                  },
                                                  "e0fd6f2d-a014-442b-b3c0-10919d494147": {
                                                    "id": "e0fd6f2d-a014-442b-b3c0-10919d494147",
                                                    "component": {
                                                      "name": "Services Header",
                                                      "props": {},
                                                      "type": "strict",
                                                      "data_type": "component",
                                                      "dependencies": [
                                                        "Row",
                                                        "Column",
                                                        "Root"
                                                      ],
                                                      "category": "Services"
                                                    },
                                                    "childIds": []
                                                  },
                                                  "f63e4ea6-150e-4405-8605-4adffe987530": {
                                                    "id": "f63e4ea6-150e-4405-8605-4adffe987530",
                                                    "component": {
                                                      "name": "Services Section",
                                                      "props": {},
                                                      "type": "strict",
                                                      "data_type": "component",
                                                      "dependencies": [
                                                        "Row",
                                                        "Column",
                                                        "Root"
                                                      ],
                                                      "category": "Services"
                                                    },
                                                    "childIds": []
                                                  },
                                                  "b2eef254-a6b1-456d-ba43-43772f1476d0": {
                                                    "id": "b2eef254-a6b1-456d-ba43-43772f1476d0",
                                                    "component": {
                                                      "name": "Services Section List",
                                                      "props": {},
                                                      "type": "strict",
                                                      "data_type": "component",
                                                      "dependencies": [
                                                        "Row",
                                                        "Column",
                                                        "Root"
                                                      ],
                                                      "category": "Services"
                                                    },
                                                    "childIds": []
                                                  }
                                                }', FALSE, '', '', NULL, TRUE, '2017-09-22 15:51:05.186000 +01:00',
        '2017-10-31 15:59:19.048000', NULL, '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('e38d6cb4-829f-4e58-82c1-22d628e041ce', 'search', '{/search}', 'Search', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "ca06756f-e1ad-4876-9597-d53de6287f9d",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    },
    "styleSheet": ".sec478d7f-1356-4d42-84a3-9c1c227f90e7{min-height:150px}"
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "ca06756f-e1ad-4876-9597-d53de6287f9d": {
    "id": "ca06756f-e1ad-4876-9597-d53de6287f9d",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:31:10.305000 +01:00', '2017-10-12 20:46:38.722000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('4fc29747-f380-4271-b015-facb32abc4d3', 'private-jet-charter', '{/private-jet-charter}', 'Private jet charter',
                                                'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "549b557c-e002-42f0-91d1-f9949b31fae9",
        "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
        "0d821691-f3aa-4968-846f-044ffe13d75e",
        "85ac8fac-a2bb-418e-a135-ebcd59769e5f",
        "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
        "42c537af-9f90-4909-b71a-c1a840afcc4b"
      ],
      "cssDesktop": {
        ".s0d821691-f3aa-4968-846f-044ffe13d75e": {
          "background-image": "url(https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/46daef6b4b6f2ba8d5685380c22c5d8a1507130559422.png)",
          "background-size": "cover",
          "background-position-x": "50%",
          "background-position-y": "50%",
          "background-repeat": "no-repeat",
          "height": "500px",
          "flex-direction": "row",
          "justify-content": "center"
        },
        ".s9b80dae8-0260-4ffe-9bf4-9a5a6d1a38ce": {
          "width": "1140px",
          "background-color": "transparent",
          "max-width": "1140px",
          "padding-left": "15px",
          "padding-right": "15px",
          "justify-content": "center"
        }
      },
      "styleSheet": ".s0d821691-f3aa-4968-846f-044ffe13d75e{background-image:url(https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/46daef6b4b6f2ba8d5685380c22c5d8a1507130559422.png);background-size:cover;background-position-x:50%;background-position-y:50%;background-repeat:no-repeat;height:500px;flex-direction:row;justify-content:center}.s9b80dae8-0260-4ffe-9bf4-9a5a6d1a38ce{width:1140px;background-color:transparent;max-width:1140px;padding-left:15px;padding-right:15px;justify-content:center}"
    },
    "549b557c-e002-42f0-91d1-f9949b31fae9": {
      "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
      "component": {
        "name": "Nav Bar Top",
        "props": {
          "login": "abxd"
        },
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
      "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
      "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "42c537af-9f90-4909-b71a-c1a840afcc4b": {
      "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "85ac8fac-a2bb-418e-a135-ebcd59769e5f": {
      "id": "85ac8fac-a2bb-418e-a135-ebcd59769e5f",
      "component": {
        "name": "Subscriptor",
        "props": {},
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Root",
          "Column",
          "Row"
        ],
        "category": "component"
      },
      "childIds": []
    },
    "0d821691-f3aa-4968-846f-044ffe13d75e": {
      "id": "0d821691-f3aa-4968-846f-044ffe13d75e",
      "component": {
        "name": "Row",
        "props": {
          "classnames": [
            "s0d821691-f3aa-4968-846f-044ffe13d75e"
          ]
        },
        "proptypes": {
          "row": "row"
        },
        "type": "abstract",
        "data_type": "layout",
        "dependencies": [
          "Root",
          "Column"
        ],
        "category": "layout"
      },
      "childIds": [
        "9b80dae8-0260-4ffe-9bf4-9a5a6d1a38ce"
      ]
    },
    "9b80dae8-0260-4ffe-9bf4-9a5a6d1a38ce": {
      "id": "9b80dae8-0260-4ffe-9bf4-9a5a6d1a38ce",
      "component": {
        "name": "Column",
        "props": {
          "column": null,
          "classnames": [
            "s9b80dae8-0260-4ffe-9bf4-9a5a6d1a38ce"
          ],
          "alias": "Column"
        },
        "proptypes": {
          "column": "column"
        },
        "type": "abstract",
        "data_type": "layout",
        "dependencies": [
          "Row"
        ],
        "category": "layout"
      },
      "childIds": [
        "f23a8f86-e7b8-4e80-b972-f6853b45bcca"
      ]
    },
    "f23a8f86-e7b8-4e80-b972-f6853b45bcca": {
      "id": "f23a8f86-e7b8-4e80-b972-f6853b45bcca",
      "component": {
        "name": "Row",
        "props": {
          "row": null
        },
        "proptypes": {
          "row": "row"
        },
        "type": "abstract",
        "data_type": "layout",
        "dependencies": [
          "Root",
          "Column"
        ],
        "category": "layout"
      },
      "childIds": [
        "777ef601-6fdb-49b9-8991-9d8cdfcdb524"
      ]
    },
    "777ef601-6fdb-49b9-8991-9d8cdfcdb524": {
      "id": "777ef601-6fdb-49b9-8991-9d8cdfcdb524",
      "component": {
        "name": "Request Flight",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Leads"
      },
      "childIds": []
    }
  }', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:32:55.513000 +01:00', '2017-10-27 17:38:40.258000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('84003b49-af79-4e83-8070-67b637da0e7a', 'partners', '{/partners}', 'Partners', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "68136c05-2fbc-4882-8ba4-b5543c56b6ce",
      "06498a56-d298-4ca1-af5d-ffdc31e0e34d",
      "22b14c2c-4d07-4271-b418-7d08c1a99926",
      "d2b48c42-db7e-4b83-9844-acc19d7113fd",
      "a325f0cc-74c3-4c34-a69e-5ebd4125698c",
      "73619afd-7191-4e1b-bd37-36807c348e86",
      "05904366-ecd8-47b0-8357-83d099ad4336",
      "6eca3642-ab97-4cc9-9cf4-4bcd6de74f4a"
    ],
    "styleSheet": ""
  },
  "68136c05-2fbc-4882-8ba4-b5543c56b6ce": {
    "id": "68136c05-2fbc-4882-8ba4-b5543c56b6ce",
    "component": {
      "name": "Nav Bar Top",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "06498a56-d298-4ca1-af5d-ffdc31e0e34d": {
    "id": "06498a56-d298-4ca1-af5d-ffdc31e0e34d",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "22b14c2c-4d07-4271-b418-7d08c1a99926": {
    "id": "22b14c2c-4d07-4271-b418-7d08c1a99926",
    "component": {
      "name": "Partners Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Header"
    },
    "childIds": []
  },
  "a325f0cc-74c3-4c34-a69e-5ebd4125698c": {
    "id": "a325f0cc-74c3-4c34-a69e-5ebd4125698c",
    "component": {
      "name": "Partners Section List",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Section"
    },
    "childIds": []
  },
  "73619afd-7191-4e1b-bd37-36807c348e86": {
    "id": "73619afd-7191-4e1b-bd37-36807c348e86",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "05904366-ecd8-47b0-8357-83d099ad4336": {
    "id": "05904366-ecd8-47b0-8357-83d099ad4336",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "6eca3642-ab97-4cc9-9cf4-4bcd6de74f4a": {
    "id": "6eca3642-ab97-4cc9-9cf4-4bcd6de74f4a",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "d2b48c42-db7e-4b83-9844-acc19d7113fd": {
    "id": "d2b48c42-db7e-4b83-9844-acc19d7113fd",
    "component": {
      "name": "Partners Heading",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Partners"
    },
    "childIds": []
  }
}', FALSE, '', '', NULL, FALSE, '2017-10-12 18:02:49.505000 +01:00', '2017-10-31 15:29:16.057000', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('c3bddacc-ba87-4c32-a94b-ec56180ac965', 'our-tips', '{/our-tips}', 'Our tips', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "5f13a6cf-339b-4291-925d-e4252b853742",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "9020f78a-ff47-4435-8c2a-a44976a6ba3f",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    },
    "styleSheet": ".sec478d7f-1356-4d42-84a3-9c1c227f90e7{min-height:150px}"
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "9020f78a-ff47-4435-8c2a-a44976a6ba3f": {
    "id": "9020f78a-ff47-4435-8c2a-a44976a6ba3f",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "5f13a6cf-339b-4291-925d-e4252b853742": {
    "id": "5f13a6cf-339b-4291-925d-e4252b853742",
    "component": {
      "name": "Our Tips Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "OurTips"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:30:51.509000 +01:00', '2017-10-13 16:59:03.677000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('43b8dc64-60f0-4310-a3d2-aa4c8e4fb9da', 'noconteste', '{/noconteste}', 'Noconteste', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [],
    "styleSheet": ""
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 21:02:40.986000 +01:00', '2017-10-12 22:29:19.179000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('3a32e9f0-7be0-4349-ad02-51ca5b284933', 'news-list', '{/news-list}', 'News list', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "22ef4bca-59db-4030-ac79-66bd083252c0",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "9a62b282-f4e5-4ed5-84d4-875a31ccf289",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    },
    "styleSheet": ".sec478d7f-1356-4d42-84a3-9c1c227f90e7{min-height:150px}"
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "9a62b282-f4e5-4ed5-84d4-875a31ccf289": {
    "id": "9a62b282-f4e5-4ed5-84d4-875a31ccf289",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "22ef4bca-59db-4030-ac79-66bd083252c0": {
    "id": "22ef4bca-59db-4030-ac79-66bd083252c0",
    "component": {
      "name": "News List Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "NewsList"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:15:28.417000 +01:00', '2017-10-13 14:57:20.083000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('ac1c1b74-daf8-4179-8298-1114f12757b7', 'mobile-app', '{/mobile-app}', 'Mobile app', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "16a2e7c0-9f40-4de1-b1f9-62b8abc7f024",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    },
    "styleSheet": ".sec478d7f-1356-4d42-84a3-9c1c227f90e7{min-height:150px}"
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "16a2e7c0-9f40-4de1-b1f9-62b8abc7f024": {
    "id": "16a2e7c0-9f40-4de1-b1f9-62b8abc7f024",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:33:52.167000 +01:00', '2017-10-12 21:01:15.263000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('6b2a4512-9a27-437c-ad89-91f750e0bceb', 'media-center', '{/media-center}', 'Media center', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "cbe6046c-44b0-43b6-9b22-ff0cdc55c15f",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    },
    "styleSheet": ".sec478d7f-1356-4d42-84a3-9c1c227f90e7{min-height:150px}"
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "cbe6046c-44b0-43b6-9b22-ff0cdc55c15f": {
    "id": "cbe6046c-44b0-43b6-9b22-ff0cdc55c15f",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:33:16.034000 +01:00', '2017-10-12 20:59:23.641000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('87468e4c-bf0a-45bd-bfe5-53f699c50d3d', 'lunatest', '{/lunatest}', 'Lunatest', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    }
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-16 16:04:37.238000 +01:00', '2017-10-16 16:04:37.298000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('0dd0672f-5fd8-4424-a70f-b00c70b1f106', 'jet-details', '{/jet-details}', 'Jet details', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "1d84171e-917a-417e-99e7-cee1a1e64fbc",
      "c7b65df5-52e5-447c-8482-1892dda4ebf3",
      "881b005a-49da-44df-9fdf-54d4173aa478",
      "6fc60839-de78-4b4a-8c46-3a1292a83349",
      "3e60a37a-86c1-4c6a-b0c2-1c848d321d6d",
      "9d0c83e9-634e-4ad1-ac23-397145fe1c36",
      "9d200408-7ae6-42be-831a-3bd59b057000",
      "801b56aa-a617-4728-89d5-2cd522a9810b",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {},
    "styleSheet": ""
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "1d84171e-917a-417e-99e7-cee1a1e64fbc": {
    "id": "1d84171e-917a-417e-99e7-cee1a1e64fbc",
    "component": {
      "name": "Jet Detail Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "JetDetail"
    },
    "childIds": []
  },
  "801b56aa-a617-4728-89d5-2cd522a9810b": {
    "id": "801b56aa-a617-4728-89d5-2cd522a9810b",
    "component": {
      "name": "Jet Detail Request",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "JetDetail"
    },
    "childIds": []
  },
  "881b005a-49da-44df-9fdf-54d4173aa478": {
    "id": "881b005a-49da-44df-9fdf-54d4173aa478",
    "component": {
      "name": "Jet Detail Cabin",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "JetDetail"
    },
    "childIds": []
  },
  "6fc60839-de78-4b4a-8c46-3a1292a83349": {
    "id": "6fc60839-de78-4b4a-8c46-3a1292a83349",
    "component": {
      "name": "Jet Detail Map",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "JetDetail"
    },
    "childIds": []
  },
  "c7b65df5-52e5-447c-8482-1892dda4ebf3": {
    "id": "c7b65df5-52e5-447c-8482-1892dda4ebf3",
    "component": {
      "name": "Jet Detail Carousel",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "JetDetail"
    },
    "childIds": []
  },
  "3e60a37a-86c1-4c6a-b0c2-1c848d321d6d": {
    "id": "3e60a37a-86c1-4c6a-b0c2-1c848d321d6d",
    "component": {
      "name": "Jet Detail Empty Legs",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "JetDetail"
    },
    "childIds": []
  },
  "9d0c83e9-634e-4ad1-ac23-397145fe1c36": {
    "id": "9d0c83e9-634e-4ad1-ac23-397145fe1c36",
    "component": {
      "name": "Jet Detail Search Empty Legs",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "JetDetail"
    },
    "childIds": []
  },
  "9d200408-7ae6-42be-831a-3bd59b057000": {
    "id": "9d200408-7ae6-42be-831a-3bd59b057000",
    "component": {
      "name": "Jet Detail Similar Aircraft",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "JetDetail"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:09:32.741000 +01:00', '2017-10-24 18:10:32.090000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('d9a705ee-e42f-4254-ae21-f1d9a7a56090', 'jet-comparator', '{/jet-comparator}', 'Jet comparator', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "a28d8e6f-b5c1-45aa-bf75-dd56f5752a16",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    },
    "styleSheet": ".sec478d7f-1356-4d42-84a3-9c1c227f90e7{min-height:150px}"
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "a28d8e6f-b5c1-45aa-bf75-dd56f5752a16": {
    "id": "a28d8e6f-b5c1-45aa-bf75-dd56f5752a16",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:35:31.242000 +01:00', '2017-10-12 21:04:08.615000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('f22ca675-d2f9-44df-9216-2a64f28c0643', 'fleet', '{/fleet}', 'Fleet', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "8d425b9a-6ca8-4fa9-85b7-cac2dae92c1c",
      "487a79ad-ee91-4b8a-aeef-2b6aa859a7a4",
      "5a80387e-b9ce-4793-870d-35bd71883aa4",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {},
    "styleSheet": ""
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "5a80387e-b9ce-4793-870d-35bd71883aa4": {
    "id": "5a80387e-b9ce-4793-870d-35bd71883aa4",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "8d425b9a-6ca8-4fa9-85b7-cac2dae92c1c": {
    "id": "8d425b9a-6ca8-4fa9-85b7-cac2dae92c1c",
    "component": {
      "name": "Header",
      "props": {
        "version": 0,
        "background": "/assets/src/admin/components/DroppableArea/gfx/media_placeholder.png?b5d37347",
        "heading": {
          "title": {
            "defaultMessage": "Insert your text here",
            "id": "client.fleet.Header.title"
          },
          "subtitle": {
            "defaultMessage": "Insert your text here",
            "id": "client.fleet.Header.subtitle"
          },
          "hasTitle": false,
          "hasSubtitle": false
        },
        "requestFlight": false,
        "rightButton": {
          "background": "#FFFFFF",
          "color": "#FFFFFF",
          "icon": {
            "icon": "Edit"
          },
          "label": "default placeholder"
        }
      },
      "proptypes": {
        "version": [
          {
            "name": "default",
            "value": 0
          },
          {
            "name": "heading",
            "value": 1
          },
          {
            "name": "title",
            "value": 2
          },
          {
            "name": "subtitle",
            "value": 3
          },
          {
            "name": "heading with icon",
            "value": 4
          },
          {
            "name": "request flight",
            "value": 5
          }
        ],
        "background": "media",
        "heading": {
          "title": "text",
          "subtitle": "text",
          "hasTitle": "bool",
          "hasSubtitle": "bool"
        },
        "requestFlight": "bool",
        "rightButton": {
          "background": "color",
          "color": "color",
          "icon": "icon",
          "label": "string"
        }
      },
      "type": "strict",
      "data_type": "other",
      "dependencies": [
        "Root"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "487a79ad-ee91-4b8a-aeef-2b6aa859a7a4": {
    "id": "487a79ad-ee91-4b8a-aeef-2b6aa859a7a4",
    "component": {
      "name": "Fleet Grid",
      "props": {},
      "type": "strict",
      "data_type": "other",
      "dependencies": [
        "Root",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:08:30.965000 +01:00', '2017-10-26 09:50:01.342000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('e3438b85-12e7-4140-8eae-6bc41250fc1c', 'evergreen', '{/evergreen}', 'Evergreen', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "eb8df0e5-7c08-4cd7-9719-06f393394154",
      "c9368603-4f08-4890-9ffe-2e4d68bbff11",
      "355c2b74-cda7-492b-a5cd-eaa92ea5090d",
      "343cd5fb-a538-40ca-88b7-78dbe620dc82",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {},
    "styleSheet": ""
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "343cd5fb-a538-40ca-88b7-78dbe620dc82": {
    "id": "343cd5fb-a538-40ca-88b7-78dbe620dc82",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "eb8df0e5-7c08-4cd7-9719-06f393394154": {
    "id": "eb8df0e5-7c08-4cd7-9719-06f393394154",
    "component": {
      "name": "EverGreen Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "EverGreen"
    },
    "childIds": []
  },
  "c9368603-4f08-4890-9ffe-2e4d68bbff11": {
    "id": "c9368603-4f08-4890-9ffe-2e4d68bbff11",
    "component": {
      "name": "Evergreen Latest News",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Evergreen"
    },
    "childIds": []
  },
  "355c2b74-cda7-492b-a5cd-eaa92ea5090d": {
    "id": "355c2b74-cda7-492b-a5cd-eaa92ea5090d",
    "component": {
      "name": "Evergreen Upcoming Events",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Evergreen"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:24:16.580000 +01:00', '2017-10-27 17:31:59.992000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('64150b9f-da94-488b-afed-07cb9ddec1f1', 'event-detail', '{/event-detail}', 'Event detail', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "5eabf813-7417-454c-8c38-0905285e1735",
      "73490974-9859-41fe-ad21-0af1fdb3ee68",
      "a9e80183-0f61-487d-bda0-2a73ff3d1128",
      "58fbd84a-e98d-46c2-88e0-cece4540f6dc",
      "e8e8a224-38ab-48ac-9c9f-4fdcf65ef2b0",
      "ce65979a-d3ff-4197-9c0c-28067edde132",
      "b897b5b7-fc63-4436-bb4b-f0fab2ac0833",
      "5f73f1dc-af1a-4194-898b-a9d81df98e94",
      "79cfaaa5-12f3-4481-a30f-cec53eaa6efb"
    ],
    "styleSheet": ""
  },
  "a9e80183-0f61-487d-bda0-2a73ff3d1128": {
    "id": "a9e80183-0f61-487d-bda0-2a73ff3d1128",
    "component": {
      "name": "Event Detail Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "EventDetail"
    },
    "childIds": []
  },
  "73490974-9859-41fe-ad21-0af1fdb3ee68": {
    "id": "73490974-9859-41fe-ad21-0af1fdb3ee68",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "5eabf813-7417-454c-8c38-0905285e1735": {
    "id": "5eabf813-7417-454c-8c38-0905285e1735",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "5f73f1dc-af1a-4194-898b-a9d81df98e94": {
    "id": "5f73f1dc-af1a-4194-898b-a9d81df98e94",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "79cfaaa5-12f3-4481-a30f-cec53eaa6efb": {
    "id": "79cfaaa5-12f3-4481-a30f-cec53eaa6efb",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "b897b5b7-fc63-4436-bb4b-f0fab2ac0833": {
    "id": "b897b5b7-fc63-4436-bb4b-f0fab2ac0833",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "58fbd84a-e98d-46c2-88e0-cece4540f6dc": {
    "id": "58fbd84a-e98d-46c2-88e0-cece4540f6dc",
    "component": {
      "name": "Event Detail Section Description",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "EventDetail"
    },
    "childIds": []
  },
  "e8e8a224-38ab-48ac-9c9f-4fdcf65ef2b0": {
    "id": "e8e8a224-38ab-48ac-9c9f-4fdcf65ef2b0",
    "component": {
      "name": "Event Detail Section Recomended",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "EventDetail"
    },
    "childIds": []
  },
  "ce65979a-d3ff-4197-9c0c-28067edde132": {
    "id": "ce65979a-d3ff-4197-9c0c-28067edde132",
    "component": {
      "name": "Event Detail Section Helicopter",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "EventDetail"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:21:01.239000 +01:00', '2017-10-25 17:16:22.392000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('15ae0343-2891-4e41-a75e-ad73373dfb07', 'empty-legs-destinations', '{/empty-legs-destinations}',
                                                'Empty legs destinations', 'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "549b557c-e002-42f0-91d1-f9949b31fae9",
        "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
        "1e0be268-d274-4ba0-a91d-6d01e8508d35",
        "67abe4f3-3955-44a9-9413-bf40bd72354c",
        "7c574056-aa5b-4137-8d17-f6da9c26d01f",
        "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
        "42c537af-9f90-4909-b71a-c1a840afcc4b"
      ],
      "cssDesktop": {},
      "styleSheet": ""
    },
    "549b557c-e002-42f0-91d1-f9949b31fae9": {
      "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
      "component": {
        "name": "Nav Bar Top",
        "props": {
          "login": "abxd"
        },
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
      "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
      "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "42c537af-9f90-4909-b71a-c1a840afcc4b": {
      "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "1e0be268-d274-4ba0-a91d-6d01e8508d35": {
      "id": "1e0be268-d274-4ba0-a91d-6d01e8508d35",
      "component": {
        "name": "Empty Legs Destinations Header",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "EmptyLegsDestinations"
      },
      "childIds": []
    },
    "7c574056-aa5b-4137-8d17-f6da9c26d01f": {
      "id": "7c574056-aa5b-4137-8d17-f6da9c26d01f",
      "component": {
        "name": "Empty Legs Request",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "EmptyLegsDetail"
      },
      "childIds": []
    },
    "67abe4f3-3955-44a9-9413-bf40bd72354c": {
      "id": "67abe4f3-3955-44a9-9413-bf40bd72354c",
      "component": {
        "name": "Jet Detail Search Empty Legs",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "JetDetail"
      },
      "childIds": []
    }
  }', FALSE, NULL, NULL, NULL, FALSE, '2017-10-30 14:47:42.053000', '2017-10-30 15:07:16.186000', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('9a63c06c-99f4-4702-80e1-66b5f18321b9', 'empty-leg-flights',
                                                '{/empty-leg-flights/fly-to-:to/fly-from-:from,/empty-leg-flights/fly-to-:to,/empty-leg-flights}',
                                                'Empty legs', 'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "549b557c-e002-42f0-91d1-f9949b31fae9",
        "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
        "6c5b0724-0eb2-458c-829a-58da14c96daa",
        "7b9becd1-eab2-4a0e-a16c-d21c73b0c191",
        "f1db1ae5-44fa-4872-8693-8feda7b2775b",
        "220f2570-6ab5-4118-8167-0bc7126daedc",
        "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
        "42c537af-9f90-4909-b71a-c1a840afcc4b"
      ],
      "cssDesktop": {},
      "styleSheet": ""
    },
    "549b557c-e002-42f0-91d1-f9949b31fae9": {
      "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
      "component": {
        "name": "Nav Bar Top",
        "props": {
          "login": "abxd"
        },
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
      "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
      "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "42c537af-9f90-4909-b71a-c1a840afcc4b": {
      "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "220f2570-6ab5-4118-8167-0bc7126daedc": {
      "id": "220f2570-6ab5-4118-8167-0bc7126daedc",
      "component": {
        "name": "Empty Legs Request",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "EmptyLegsDetail"
      },
      "childIds": []
    },
    "7b9becd1-eab2-4a0e-a16c-d21c73b0c191": {
      "id": "7b9becd1-eab2-4a0e-a16c-d21c73b0c191",
      "component": {
        "name": "Find Empty Legs Header",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "EmptyLegsSearch"
      },
      "childIds": []
    },
    "f1db1ae5-44fa-4872-8693-8feda7b2775b": {
      "id": "f1db1ae5-44fa-4872-8693-8feda7b2775b",
      "component": {
        "name": "Find Empty Leg Section",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "EmptyLegsSearch"
      },
      "childIds": []
    },
    "6c5b0724-0eb2-458c-829a-58da14c96daa": {
      "id": "6c5b0724-0eb2-458c-829a-58da14c96daa",
      "component": {
        "name": "Row",
        "props": {},
        "type": "abstract",
        "data_type": "layout",
        "dependencies": [
          "Root",
          "Column"
        ],
        "category": "layout"
      },
      "childIds": []
    }
  }', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:32:28.764000 +01:00', '2017-10-20 15:48:32.761000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('a6e2c1bb-9f81-4980-89ec-75d78f85f0f0', 'empty-legs-details', '{/empty-leg-flights/empty-leg-:from-:to-:id}',
                                                'Empty Legs Details', 'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "cb637fcc-8638-4ee6-ac22-6897a61cf61d",
        "481a1645-2932-4773-b273-41a8edd32f83",
        "39e3d4e3-9936-4bf9-ab2a-8c7ac2c2f791",
        "3c98c63b-18fc-41c2-a592-9b97be67d57c",
        "d219ea50-477d-4fa0-83a4-44b4c583d4a7",
        "e278534b-a01c-45c2-9ce3-120f2d62bb5b",
        "3a5155a4-7bff-4790-8700-5252dbee92a8",
        "bd86c9e3-7f13-42ad-a9bd-ad6091b65a37",
        "fc2cca06-322d-4dc4-a11a-4f48fb64d590"
      ],
      "styleSheet": ""
    },
    "bd86c9e3-7f13-42ad-a9bd-ad6091b65a37": {
      "id": "bd86c9e3-7f13-42ad-a9bd-ad6091b65a37",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "fc2cca06-322d-4dc4-a11a-4f48fb64d590": {
      "id": "fc2cca06-322d-4dc4-a11a-4f48fb64d590",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "3c98c63b-18fc-41c2-a592-9b97be67d57c": {
      "id": "3c98c63b-18fc-41c2-a592-9b97be67d57c",
      "component": {
        "name": "Aircraft Detail Section",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Section"
      },
      "childIds": []
    },
    "39e3d4e3-9936-4bf9-ab2a-8c7ac2c2f791": {
      "id": "39e3d4e3-9936-4bf9-ab2a-8c7ac2c2f791",
      "component": {
        "name": "EmptyLeg Section Map",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Map"
      },
      "childIds": []
    },
    "481a1645-2932-4773-b273-41a8edd32f83": {
      "id": "481a1645-2932-4773-b273-41a8edd32f83",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "cb637fcc-8638-4ee6-ac22-6897a61cf61d": {
      "id": "cb637fcc-8638-4ee6-ac22-6897a61cf61d",
      "component": {
        "name": "Nav Bar Top",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "3a5155a4-7bff-4790-8700-5252dbee92a8": {
      "id": "3a5155a4-7bff-4790-8700-5252dbee92a8",
      "component": {
        "name": "Empty Legs Request",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "EmptyLegsDetail"
      },
      "childIds": []
    },
    "d219ea50-477d-4fa0-83a4-44b4c583d4a7": {
      "id": "d219ea50-477d-4fa0-83a4-44b4c583d4a7",
      "component": {
        "name": "Aircraft Detail Caroussel",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Caroussel"
      },
      "childIds": []
    },
    "e278534b-a01c-45c2-9ce3-120f2d62bb5b": {
      "id": "e278534b-a01c-45c2-9ce3-120f2d62bb5b",
      "component": {
        "name": "Empty Legs",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "EmptyLegs"
      },
      "childIds": []
    }
  }', FALSE, ' query blabla($name: String) {
    getOffice(name: $name) { id, name, address,location }
  }', '', NULL, FALSE, '2017-09-15 18:13:39.167000 +01:00', '2017-10-26 13:20:03.089000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', '9a63c06c-99f4-4702-80e1-66b5f18321b9');
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('2cffaecc-7121-49aa-9696-412a6e4cc63c', 'my-title', '{/emptyLeg/12335}', 'My title', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "ac80e800-50ae-4e8a-9c02-00c061e58bad",
      "1ca369f0-6a0d-493e-b8c3-fb13650b1b1a",
      "1816de7c-b054-4661-b782-69a60a604fe6",
      "31a3089d-a5d8-48c3-ae8d-45ee3542d171",
      "8efbd1cf-0bac-4786-afad-c4e7786ff9e0",
      "a96552d8-c793-4b9f-b140-1b3229b95920",
      "dd70f12f-a625-43ac-b49f-7c0778a6e141"
    ],
    "styleSheet": ""
  },
  "ac80e800-50ae-4e8a-9c02-00c061e58bad": {
    "id": "ac80e800-50ae-4e8a-9c02-00c061e58bad",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "1ca369f0-6a0d-493e-b8c3-fb13650b1b1a": {
    "id": "1ca369f0-6a0d-493e-b8c3-fb13650b1b1a",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "a96552d8-c793-4b9f-b140-1b3229b95920": {
    "id": "a96552d8-c793-4b9f-b140-1b3229b95920",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "dd70f12f-a625-43ac-b49f-7c0778a6e141": {
    "id": "dd70f12f-a625-43ac-b49f-7c0778a6e141",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "1816de7c-b054-4661-b782-69a60a604fe6": {
    "id": "1816de7c-b054-4661-b782-69a60a604fe6",
    "component": {
      "name": "Team Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Team"
    },
    "childIds": []
  },
  "8efbd1cf-0bac-4786-afad-c4e7786ff9e0": {
    "id": "8efbd1cf-0bac-4786-afad-c4e7786ff9e0",
    "component": {
      "name": "Join Team",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Section"
    },
    "childIds": []
  },
  "31a3089d-a5d8-48c3-ae8d-45ee3542d171": {
    "id": "31a3089d-a5d8-48c3-ae8d-45ee3542d171",
    "component": {
      "name": "Team Section",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Team"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-23 15:22:23.780000 +01:00', '2017-10-23 15:22:23.789000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES
  ('74bf7e83-8844-484b-90ee-febebd624a0f', 'corporate-social', '{/corporate-social}', 'Corporate social', 'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "549b557c-e002-42f0-91d1-f9949b31fae9",
        "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
        "b0d5c07a-382f-468f-8466-764aae6f3f6d",
        "26cf9c97-c7b7-411a-9a04-8702323d70ce",
        "74fbe0fe-dcb1-46c6-83c9-265488cae6c5",
        "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
        "42c537af-9f90-4909-b71a-c1a840afcc4b"
      ],
      "cssDesktop": {},
      "styleSheet": ""
    },
    "549b557c-e002-42f0-91d1-f9949b31fae9": {
      "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
      "component": {
        "name": "Nav Bar Top",
        "props": {
          "login": "abxd"
        },
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
      "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
      "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "42c537af-9f90-4909-b71a-c1a840afcc4b": {
      "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "74fbe0fe-dcb1-46c6-83c9-265488cae6c5": {
      "id": "74fbe0fe-dcb1-46c6-83c9-265488cae6c5",
      "component": {
        "name": "Subscriptor",
        "props": {},
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Root",
          "Column",
          "Row"
        ],
        "category": "component"
      },
      "childIds": []
    },
    "b0d5c07a-382f-468f-8466-764aae6f3f6d": {
      "id": "b0d5c07a-382f-468f-8466-764aae6f3f6d",
      "component": {
        "name": "Corporate Sociale Header",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "CorporateSocial"
      },
      "childIds": []
    },
    "26cf9c97-c7b7-411a-9a04-8702323d70ce": {
      "id": "26cf9c97-c7b7-411a-9a04-8702323d70ce",
      "component": {
        "name": "Corporate Social Section List",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "CorporateSocial"
      },
      "childIds": []
    }
  }', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:14:19.259000 +01:00', '2017-10-16 19:08:28.693000 +01:00', NULL,
   '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('792c458d-4537-4342-84b6-8c998f245043', 'corporate-services', '{/corporate-services}',
                                                'Private Jet Flight for companies', 'default', '{
    "0": {
      "id": 0,
      "component": null,
      "childIds": [
        "549b557c-e002-42f0-91d1-f9949b31fae9",
        "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
        "fcd6eac9-56ed-4d5c-8da0-d2f68a37022f",
        "ff266260-7ab6-468c-ba9f-73fb40262cea",
        "28a76d3e-478e-4938-bb67-5cf0715d9781",
        "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
        "42c537af-9f90-4909-b71a-c1a840afcc4b",
        "6b3172ad-49a5-4543-a9be-eb9e2a9a319c"
      ],
      "cssDesktop": {},
      "styleSheet": ""
    },
    "549b557c-e002-42f0-91d1-f9949b31fae9": {
      "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
      "component": {
        "name": "Nav Bar Top",
        "props": {
          "login": "abxd"
        },
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
      "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "component": {
        "name": "Nav Bar",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Navigation"
      },
      "childIds": []
    },
    "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
      "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "component": {
        "name": "Footer Links",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "42c537af-9f90-4909-b71a-c1a840afcc4b": {
      "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
      "component": {
        "name": "Footer End",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "Footer"
      },
      "childIds": []
    },
    "6b3172ad-49a5-4543-a9be-eb9e2a9a319c": {
      "id": "6b3172ad-49a5-4543-a9be-eb9e2a9a319c",
      "component": {
        "name": "Chat Box",
        "props": {},
        "type": "strict",
        "data_type": "other",
        "dependencies": [
          "Root"
        ],
        "category": "component"
      },
      "childIds": []
    },
    "fcd6eac9-56ed-4d5c-8da0-d2f68a37022f": {
      "id": "fcd6eac9-56ed-4d5c-8da0-d2f68a37022f",
      "component": {
        "name": "Corporate Services Header",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "CorporateServices"
      },
      "childIds": []
    },
    "ff266260-7ab6-468c-ba9f-73fb40262cea": {
      "id": "ff266260-7ab6-468c-ba9f-73fb40262cea",
      "component": {
        "name": "Corporate Services Section List",
        "props": {},
        "type": "strict",
        "data_type": "component",
        "dependencies": [
          "Row",
          "Column",
          "Root"
        ],
        "category": "CorporateServices"
      },
      "childIds": []
    },
    "28a76d3e-478e-4938-bb67-5cf0715d9781": {
      "id": "28a76d3e-478e-4938-bb67-5cf0715d9781",
      "component": {
        "name": "Subscriptor",
        "props": {},
        "type": "abstract",
        "data_type": "component",
        "dependencies": [
          "Root",
          "Column",
          "Row"
        ],
        "category": "component"
      },
      "childIds": []
    }
  }', FALSE, '', '', NULL, FALSE, '2017-10-12 18:02:02.008000 +01:00', '2017-10-31 14:23:34.063000', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('4d231a19-c711-4995-800b-a19bcb3d2ebf', 'contacts', '{/contacts}', 'Contacts', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "91abd7b7-70db-4cec-b8d9-77b269c7dfcc",
      "d89fba54-8aec-4a51-a148-957611c3f895",
      "45802cda-e048-4a99-b165-fe1c82caafef",
      "8136776a-e015-44ca-ad6c-aadea11f7a0c",
      "b2174557-99c9-4756-8e2c-e06f9bb74889",
      "69688134-44f3-4e2e-9845-94717cb6ea82",
      "8b4362df-d63b-4628-8f71-259d447befef"
    ],
    "cssDesktop": {
      ".s93ac5bac-d3ac-4da6-a8c6-f02ffa490fc5": {
        "justify-content": "center",
        "align-self": "auto",
        "background-color": "#faf7f6"
      },
      ".s795b270a-fa19-4665-96a9-94a2f74ac833": {
        "align-self": "center"
      },
      ".s4e74a525-7be2-4d32-9908-e3868eb20b77": {
        "background-color": "#263d50",
        "align-self": "center",
        "margin-top": "0px",
        "padding-right": "0px",
        "padding-top": "40px"
      },
      ".sd4a27da6-88a7-4ce4-aeac-c5dd2f090b20": {
        "align-self": "center",
        "justify-content": "center"
      }
    },
    "styleSheet": ".s93ac5bac-d3ac-4da6-a8c6-f02ffa490fc5{justify-content:center;align-self:auto;background-color:#faf7f6}.s795b270a-fa19-4665-96a9-94a2f74ac833{align-self:center}.s4e74a525-7be2-4d32-9908-e3868eb20b77{background-color:#263d50;align-self:center;margin-top:0px;padding-right:0px;padding-top:40px}.sd4a27da6-88a7-4ce4-aeac-c5dd2f090b20{align-self:center;justify-content:center}"
  },
  "d89fba54-8aec-4a51-a148-957611c3f895": {
    "id": "d89fba54-8aec-4a51-a148-957611c3f895",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "45802cda-e048-4a99-b165-fe1c82caafef": {
    "id": "45802cda-e048-4a99-b165-fe1c82caafef",
    "component": {
      "name": "Contact Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Header"
    },
    "childIds": []
  },
  "8136776a-e015-44ca-ad6c-aadea11f7a0c": {
    "id": "8136776a-e015-44ca-ad6c-aadea11f7a0c",
    "component": {
      "name": "Contact Section",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Section"
    },
    "childIds": []
  },
  "b2174557-99c9-4756-8e2c-e06f9bb74889": {
    "id": "b2174557-99c9-4756-8e2c-e06f9bb74889",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "69688134-44f3-4e2e-9845-94717cb6ea82": {
    "id": "69688134-44f3-4e2e-9845-94717cb6ea82",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "8b4362df-d63b-4628-8f71-259d447befef": {
    "id": "8b4362df-d63b-4628-8f71-259d447befef",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "91abd7b7-70db-4cec-b8d9-77b269c7dfcc": {
    "id": "91abd7b7-70db-4cec-b8d9-77b269c7dfcc",
    "component": {
      "name": "Nav Bar Top",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  }
}', FALSE,
                                                '{getOffices{id,name,address,postal_code,location,country,phone,alt_phone,fax,email,coordinates,primary,order}}',
                                                '', NULL, TRUE, '2017-09-12 15:36:31.124000 +01:00',
        '2017-10-16 16:02:34.021000 +01:00', NULL, '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('b37a5ac2-c3e2-4477-ad83-1d539fcd0fc3', 'career', '{/career}', 'Career', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "66660b49-dee9-4eaa-a7ae-f434a90e894f",
      "5725bd39-632d-4faa-a43e-3b933b49890f",
      "d87ad0a7-84c1-4b5e-8622-65d1e1efac45",
      "d76b4ec9-abdc-4ca1-80cb-95c8480b0eb2",
      "453df9d4-846b-47a9-a60a-14ae492437c7",
      "87003c49-1cac-4575-8ad3-45289b873bf8",
      "0ca20e90-b850-4ce9-8b1e-834753b60743",
      "60e716e6-17dd-476d-83fa-f44f8f3baa26"
    ],
    "styleSheet": "",
    "props": {
      "expertMode": "",
      "treeViewStatus": true,
      "navBarStatus": false
    }
  },
  "d87ad0a7-84c1-4b5e-8622-65d1e1efac45": {
    "id": "d87ad0a7-84c1-4b5e-8622-65d1e1efac45",
    "component": {
      "name": "Career Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Header"
    },
    "childIds": []
  },
  "5725bd39-632d-4faa-a43e-3b933b49890f": {
    "id": "5725bd39-632d-4faa-a43e-3b933b49890f",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "66660b49-dee9-4eaa-a7ae-f434a90e894f": {
    "id": "66660b49-dee9-4eaa-a7ae-f434a90e894f",
    "component": {
      "name": "Nav Bar Top",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d76b4ec9-abdc-4ca1-80cb-95c8480b0eb2": {
    "id": "d76b4ec9-abdc-4ca1-80cb-95c8480b0eb2",
    "component": {
      "name": "Career Section",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Section"
    },
    "childIds": []
  },
  "453df9d4-846b-47a9-a60a-14ae492437c7": {
    "id": "453df9d4-846b-47a9-a60a-14ae492437c7",
    "component": {
      "name": "Career Section Openinings",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Section"
    },
    "childIds": []
  },
  "87003c49-1cac-4575-8ad3-45289b873bf8": {
    "id": "87003c49-1cac-4575-8ad3-45289b873bf8",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "0ca20e90-b850-4ce9-8b1e-834753b60743": {
    "id": "0ca20e90-b850-4ce9-8b1e-834753b60743",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "60e716e6-17dd-476d-83fa-f44f8f3baa26": {
    "id": "60e716e6-17dd-476d-83fa-f44f8f3baa26",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  }
}', FALSE, '', '', NULL, TRUE, '2017-09-12 15:31:17.285000 +01:00', '2017-10-16 13:05:22.554000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('2348f324-fdcf-400d-9813-12685e5b74ff', 'airports-maps', '{/airports-maps}', 'Airports maps', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "3517366e-a961-479c-8fba-54eb2dca2b48",
      "51add495-b16d-46a2-b2f2-8d3ed7119af3",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "adf442ec-e446-4603-aa21-1f46cb3561c5",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    },
    "styleSheet": ".sec478d7f-1356-4d42-84a3-9c1c227f90e7{min-height:150px}"
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": [
      "0889db67-8231-4d7a-91a7-0ff142de11b1"
    ]
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "adf442ec-e446-4603-aa21-1f46cb3561c5": {
    "id": "adf442ec-e446-4603-aa21-1f46cb3561c5",
    "component": {
      "name": "Subscriptor",
      "props": {},
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Root",
        "Column",
        "Row"
      ],
      "category": "component"
    },
    "childIds": []
  },
  "3517366e-a961-479c-8fba-54eb2dca2b48": {
    "id": "3517366e-a961-479c-8fba-54eb2dca2b48",
    "component": {
      "name": "Airport Section Map",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Airport"
    },
    "childIds": []
  },
  "0889db67-8231-4d7a-91a7-0ff142de11b1": {
    "id": "0889db67-8231-4d7a-91a7-0ff142de11b1",
    "component": {
      "name": "Airports Section List",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Section"
    },
    "childIds": []
  },
  "51add495-b16d-46a2-b2f2-8d3ed7119af3": {
    "id": "51add495-b16d-46a2-b2f2-8d3ed7119af3",
    "component": {
      "name": "Airports List Header",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Airports"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-12 18:32:03.322000 +01:00', '2017-10-27 15:31:54.312000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('8ed8991e-005c-4f11-9881-0789d21ab787', 'airports', '{/airports}', 'Airports', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "549b557c-e002-42f0-91d1-f9949b31fae9",
      "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
      "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
      "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
      "42c537af-9f90-4909-b71a-c1a840afcc4b"
    ],
    "cssDesktop": {
      ".sec478d7f-1356-4d42-84a3-9c1c227f90e7": {
        "min-height": "150px"
      }
    }
  },
  "549b557c-e002-42f0-91d1-f9949b31fae9": {
    "id": "549b557c-e002-42f0-91d1-f9949b31fae9",
    "component": {
      "name": "Nav Bar Top",
      "props": {
        "login": "abxd"
      },
      "type": "abstract",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4": {
    "id": "d1abf194-f3e8-4d73-b7a7-1dbc04799ff4",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ec478d7f-1356-4d42-84a3-9c1c227f90e7": {
    "id": "ec478d7f-1356-4d42-84a3-9c1c227f90e7",
    "component": {
      "name": "Row",
      "props": {
        "alias": "Placeholder",
        "style": {},
        "classnames": [
          "sec478d7f-1356-4d42-84a3-9c1c227f90e7"
        ]
      },
      "type": "abstract",
      "data_type": "layout",
      "dependencies": [
        "Root",
        "Column"
      ],
      "category": "layout"
    },
    "childIds": []
  },
  "3572d73d-0ec9-49b3-85c9-e41c05f5c411": {
    "id": "3572d73d-0ec9-49b3-85c9-e41c05f5c411",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "42c537af-9f90-4909-b71a-c1a840afcc4b": {
    "id": "42c537af-9f90-4909-b71a-c1a840afcc4b",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  }
}', FALSE, NULL, NULL, NULL, FALSE, '2017-10-17 12:29:56.648000 +01:00', '2017-10-17 12:29:56.732000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);
INSERT INTO public.pages (id, slug, path, title, template, body, "isHome", query, external_scripts, custom_script, state, created_at, updated_at, deleted_at, user_id, parent_id)
VALUES ('94dcf070-951c-4070-aa13-884b9012452b', 'airport', '{/airport}', 'Airport', 'default', '{
  "0": {
    "id": 0,
    "component": null,
    "childIds": [
      "ca788558-8a7d-4ac1-a492-ec4b34b64b3a",
      "46bf4554-1564-43d1-ac07-e8b00f080db5",
      "adfaafa2-9edd-4c25-9add-045bbf873c7a",
      "0aa9a6c8-3e2a-4b59-9b9f-224734bbbed9",
      "d1d32029-53a0-4061-bb55-08d9c6b4675d",
      "5e26ef32-bfcc-4a1a-9c4b-7d62bd39f4f1",
      "577ad150-ab39-4177-aad3-1539e51e2bc0",
      "fbf3a50a-853c-4f88-8916-deb5d844bfc9"
    ],
    "styleSheet": "",
    "cssDesktop": {},
    "props": {
      "expertMode": ""
    }
  },
  "577ad150-ab39-4177-aad3-1539e51e2bc0": {
    "id": "577ad150-ab39-4177-aad3-1539e51e2bc0",
    "component": {
      "name": "Footer Links",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "fbf3a50a-853c-4f88-8916-deb5d844bfc9": {
    "id": "fbf3a50a-853c-4f88-8916-deb5d844bfc9",
    "component": {
      "name": "Footer End",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Footer"
    },
    "childIds": []
  },
  "d1d32029-53a0-4061-bb55-08d9c6b4675d": {
    "id": "d1d32029-53a0-4061-bb55-08d9c6b4675d",
    "component": {
      "name": "Airport Section Legs",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Section"
    },
    "childIds": []
  },
  "0aa9a6c8-3e2a-4b59-9b9f-224734bbbed9": {
    "id": "0aa9a6c8-3e2a-4b59-9b9f-224734bbbed9",
    "component": {
      "name": "Airport Section Detail",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Section"
    },
    "childIds": []
  },
  "46bf4554-1564-43d1-ac07-e8b00f080db5": {
    "id": "46bf4554-1564-43d1-ac07-e8b00f080db5",
    "component": {
      "name": "Nav Bar",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "ca788558-8a7d-4ac1-a492-ec4b34b64b3a": {
    "id": "ca788558-8a7d-4ac1-a492-ec4b34b64b3a",
    "component": {
      "name": "Nav Bar Top",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Navigation"
    },
    "childIds": []
  },
  "adfaafa2-9edd-4c25-9add-045bbf873c7a": {
    "id": "adfaafa2-9edd-4c25-9add-045bbf873c7a",
    "component": {
      "name": "Airport Section Map",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Map"
    },
    "childIds": []
  },
  "5e26ef32-bfcc-4a1a-9c4b-7d62bd39f4f1": {
    "id": "5e26ef32-bfcc-4a1a-9c4b-7d62bd39f4f1",
    "component": {
      "name": "Airport Request Call or Email",
      "props": {},
      "type": "strict",
      "data_type": "component",
      "dependencies": [
        "Row",
        "Column",
        "Root"
      ],
      "category": "Airport"
    },
    "childIds": []
  }
}', FALSE, '', '', NULL, TRUE, '2017-09-15 12:18:55.883000 +01:00', '2017-10-26 12:18:28.320000 +01:00', NULL,
        '18610542-009d-4be1-8de9-88b9dcaad988', NULL);