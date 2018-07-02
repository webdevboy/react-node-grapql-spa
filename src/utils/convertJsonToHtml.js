import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw } from 'draft-js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export function convertJsonToHtml(body) {
  let options = {
    entityStyleFn: (entity) => {
      const entityType = entity.get('type').toLowerCase();
      if (entityType === 'link') {
        const data = entity.getData();
        return {
          element: 'a',
          attributes: {
            ...data,
            target: '_blank'
          },
        };
      }
      if (entityType === 'image') {
        const data = entity.getData();
        return {
          element: 'img',
          attributes: {
            src: data.src,
            width: data.width,
            height: data.height,
            alt: data.alt,
            size: data.size,
            title: data.title
          },
          style: {
            color: '#900'
          },
        };
      }
    },
  };

  var htmlOutput;
  if (typeof body == 'object')
  	htmlOutput = body ? stateToHTML(convertFromRaw(body), options) : null;
  else
  	htmlOutput = body ? stateToHTML(convertFromRaw(JSON.parse(body)), options) : null;
  
  // console.log(htmlOutput);
  return ReactHtmlParser(htmlOutput,{"decodeEntities": true});
  /*let strHtml = String(htmlOutput);
  strHtml = strHtml.replace(/<p>/g, '');
  strHtml = strHtml.replace(/<\/p>/g,'');
  let data = ReactHtmlParser(strHtml,{"decodeEntities": true});
  return ReactHtmlParser(data);*/
}
