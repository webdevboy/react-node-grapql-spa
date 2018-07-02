


// export const baseAction = async (context) => {
  
//   console.log('===== START 2nd LEVEL =====');
//   console.log(context.route);

//   const { data } = await context.client.query({
//     query: queryGetPage,
//     variables: {
//       path: `/${context.params.page}`,
//       option: 'site_title'
//     }
//   });

//   const { getPage, getSingleSettings } = data;
  
//   let pageData = { data: {} };
  
//     if (getPage && getPage.query) {
//       pageData = await context.client.query({
//         query: gql`${getPage.query}`,
//         variables: context.params
//       })
//     }

//   const site_title = getSingleSettings.value || '';
//   const page = getPage || null;

//   console.log('page => ',page);

//   if (!page) {
//     return await context.next();
//   } 

//   const meta = getPage && getPage.meta ? _.find(getPage.meta , (meta, index) => {
//     if( meta && meta.language && meta.language.locale.locale == context.intl.locale){
//       return meta
//     } 
//   }) : null;


//   return {
//     title: `${meta ? meta.meta.title : page.title} | ${site_title}`,
//     chunks: ['client-page'],
//     name: 'page',
//     status: 200,
//     component: (<Page template={page.template}><Composer params={context.params} body={page.body} id={0} data={pageData.data}/></Page>),
//     styles: page.body[0].styleSheet,
//     meta: {
//       description: meta ? meta.meta.description : null,
//       keywords: meta ? meta.meta.keywords : null,
//       author: meta ? meta.meta.author : null,
//     },
//     type: 'website',
//   };

// }

// export const action = async (context) => {

//   console.log('===== START 3rd LEVEL =====');
//   console.log(context.route);

//   // const locale = context.intl.locale.split('-')[0];
//   // const defaultLocale = context.intl.defaultLocale.split('-')[0];

//   // if (typeof context.params.locale === undefined) {
//   //   let currentPath = location.pathname.split('/').reverse();
//   //   currentPath = currentPath.splice(0, currentPath.length-2).reverse().join('/');
//   //   console.log('NEXT PATH => ', `/${locale}/${currentPath}`);
//   //   return { redirect: `/${locale}/${currentPath}` }
//   // }

//   const { data } = await context.client.query({
//     query: queryChildPage,
//     variables: {
//       id: context.route.id,
//       option: 'site_title'
//     }
//   });

//   const { getPage, getSingleSettings } = data;

//   let pageData = { data: {} };
  
//   if (getPage && getPage.query) {
//     pageData = await context.client.query({
//       query: gql`${getPage.query}`,
//       variables: context.params
//     })
//   }
  
//   const site_title = getSingleSettings.value || '';
//   const page = getPage || null;

//   console.log('===== END 3rd LEVEL =====');
//   console.log(context.route);

//   console.log('page 3 => ', page);

//   if (!page) {
//     return await context.next();
//   }

//   const meta = getPage && getPage.meta ? _.find(getPage.meta , (meta, index) => {
//     if( meta && meta.language && meta.language.locale.locale == context.intl.locale){
//       return meta
//     } 
//   }) : null;
//   return {
//     title: meta ? meta.meta.title : page.title,
//     chunks: ['client-page'],
//     name: 'page',
//     status: 200,
//     component: (<Page template={page.template}><Composer params={context.params} body={page.body} id={0} data={pageData.data}/></Page>),
//     styles: page.body[0].styleSheet,
//     meta: {
//       description: meta ? meta.meta.description : null,
//       keywords: meta ? meta.meta.keywords : null,
//       author: meta ? meta.meta.author : null,
//     },
//     type: 'website',
//   };
  

// };

// const page = {
//   path: '/:locale(\\w{2})?/:page*',
//   children: [],
//   async action(context) {

//     console.log(context.params);

//     console.log('===== START 1st LEVEL =====');
//     console.log(context.route);
    
//     const locale = context.intl.locale.split('-')[0];
//     const defaultLocale = context.intl.defaultLocale.split('-')[0];
    
//     if (typeof context.params.locale === undefined) {
//       let currentPath = location.pathname.split('/').reverse();
//       currentPath = currentPath.splice(0, currentPath.length-2).reverse().join('/');
//       console.log('NEXT PATH => ', `/${locale}/${currentPath}`);
//       return { redirect: `/${locale}/${currentPath}` }
//     }
  
//     // /empty-leg-flights/
//     // /empty-leg-flights/empty-leg-:from-:to-:id     => empty leg detail
//     // /empty-leg-flights/fly-to-:to/from-:from       => empty leg from-to
//     // /empty-leg-flights/fly-to-:to                  => empty leg destination
//     const { data } = await context.client.query({
//       query: queryGetPage,
//       variables: {
//         path: `/${context.params.page}`,
//         option: 'site_title',
//       }
//     });

//     const { getPage, getSingleSettings } = data;

//     let base = [{
//       path: '',
//       action: baseAction,
//     }];
    
//     if (getPage && getPage.childrens.length) {

//       getPage.childrens.forEach(pageChildren => {
//         base.push({
//             path: pageChildren.path,  //empty-leg-flight/:id
//             id: pageChildren.id || null,
//             action,
//         });
//       });

//       console.log('===== END 1st LEVEL =====');
//       console.log(context.route);
//       // return context.next();
//     }

//     context.route.children = base;
//     return await context.next();

//     // let pageData = {data: {}};
    
//     // if (getPage && getPage.query) {
//     //   pageData = await client.query({
//     //     query: gql`${getPage.query}`,
//     //     variables: context.params
//     //   })
//     // }
    
//     // const site_title = getSingleSettings.value || '';
//     // const page = getPage || null;
    

//     // console.log('===== END 1st LEVEL =====');
//     // console.log(context.route);

//     // if (!page) {
//     //   return { status: 404 } //context.next()
//     // } else {

//     //   const meta = getPage && getPage.meta ? _.find(getPage.meta , (meta, index) => {
//     //     if( meta && meta.language && meta.language.locale.locale == locale){
//     //       return meta
//     //     } 
//     //   }) : null;

//     //   return {
//     //     title: `${page.title} | ${site_title}`,
//     //     chunks: ['client-page'],
//     //     name: 'page',
//     //     status: 200,
//     //     component: (<Page template={page.template}><Composer params={context.params} body={page.body} id={0} data={pageData.data}/></Page>),
//     //     styles: page.body[0].styleSheet,
//     //     meta: {
//     //       description: meta ? meta.meta.description : null,
//     //       keywords: meta ? meta.meta.keywords : null,
//     //       author: meta ? meta.meta.author : null,
//     //     },
//     //     type: 'website',
//     //   };
//     // }
//   }
// }

// export default page;

