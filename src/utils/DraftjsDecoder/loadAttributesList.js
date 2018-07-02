import flatAttributesList from './flatAttributesList'

const loadAttributesList = (text, inlineStyles, entityRanges, entityMap) => {
    let listComponents = [];
    let textStyled = '';
    const elementList = [];
    let attrs = inlineStyles ? inlineStyles.concat(entityRanges) : entityRanges;
    attrs = attrs.sort((a: Object, b: Object): number => a.offset - b.offset);
    const attributes = flatAttributesList(attrs);
    if (attributes.length) {
      if (attributes[0].offset > 0) {
        const component = {
          text: text.substring(0, attributes[0].offset),
          isBold: false,
          isItalic: false,
          isLink: false
        };
        listComponents.push(component);
	  }
        const textInTag = {
          text: text.substring(attributes[0].offset, attributes[0].offset + attributes[0].length),
          isBold: false,
          isItalic: false,
          isLink: false
        };
        if (attributes[0].style) {
		  if (Array.isArray(attributes[0].style)){
          const listAttrs = Array.from(attributes[0].style);
          listAttrs.map((aStyle) => {
            switch (aStyle) {
              case 'BOLD': {
                textInTag.isBold = true;
                break;
              }
              case 'ITALIC': {
                textInTag.isItalic = true;
                break;
              }
              default: {
                break;
              }
            }
          })
		  }
		  else{
			switch (attributes[0].style) {
              case 'BOLD': {
                textInTag.isBold = true;
                break;
              }
              case 'ITALIC': {
                textInTag.isItalic = true;
                break;
              }
              default: {
                break;
              }
            }  
		  }
        }
        if (attributes[0].key >= 0) {
          if (entityMap[attributes[0].key].type = 'LINK') {
            textInTag.isLink = true;
            textInTag.url = entityMap[attributes[0].key].data.url;
          }
        }
        listComponents.push(textInTag);

      //console.log(textStyled);
      attributes.forEach((item, index) => {
        if (index > 0) {
          const previousItem = attributes[index - 1];
          const offset = previousItem.offset + previousItem.length;
          const component = {
            text: text.substring(offset, item.offset),
            isBold: false,
            isItalic: false,
            isLink: false
          };
          listComponents.push(component);
          const textInTag = {
            text: text.substring(item.offset, item.offset + item.length),
            isBold: false,
            isItalic: false,
            isLink: false
          };
          if (item.style) {
			if (Array.isArray(item.style)){
			const listAttrs = Array.from(item.style);
            listAttrs.map((aStyle) => {
              switch (aStyle) {
                case 'BOLD': {
                  textInTag.isBold = true;
                  break;
                }
                case 'ITALIC': {
                  textInTag.isItalic = true;
                  break;
                }
                default: {
                  break;
                }
              }
            })
			}
			else{
				switch (item.style) {
                case 'BOLD': {
                  textInTag.isBold = true;
                  break;
                }
                case 'ITALIC': {
                  textInTag.isItalic = true;
                  break;
                }
                default: {
                  break;
                }
              }
			}
          }
          if (item.key >= 0) {
            if (entityMap[item.key].type = 'LINK') {
              textInTag.isLink = true;
              textInTag.url = entityMap[item.key].data.url;
            }
          }
          listComponents.push(textInTag);
        }
      });
      //Manage the last item of attributs
      const lastAttribut = attributes[attributes.length - 1];
      const lastItem = {
        text: text.substring(lastAttribut.offset + lastAttribut.length, text.length),
        isBold: false,
        isItalic: false,
        isLink: false,
      };
      listComponents.push(lastItem);
    }
    else {
      const component = {
        text: text,
        isBold: false,
        isItalic: false,
        isLink: false
      };
      listComponents.push(component);
    }
    return listComponents;
  };

export default loadAttributesList;