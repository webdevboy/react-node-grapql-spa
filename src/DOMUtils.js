export function updateTag(tagName, keyName, keyValue, attrName, attrValue, isHref) {
  let node;

  if (!isHref) {
    node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"]`);
  } else {
    node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"][rel="alternate"]`);
  }

  if (node && node.getAttribute(attrName) === attrValue) return;

  // Remove and create a new tag in order to make it work with bookmarks in Safari
  if (node) {
    node.parentNode.removeChild(node);
  }
  
  if (typeof attrValue === 'string' && typeof keyValue === 'string') {
    const nextNode = document.createElement(tagName);
    nextNode.setAttribute(keyName, keyValue);
    nextNode.setAttribute(attrName, attrValue);
    if (isHref) {
      nextNode.setAttribute('rel', 'alternate');
    }
    document.head.appendChild(nextNode);
  } else {
    console.error("Unable to update tag with [tag=%s, keyName=%s, keyValue=%s, attrName=%s, attrValue=%s]", tagName, keyName, keyValue, attrName, attrValue);
  }
}

export function updateMeta(name, content) {
  updateTag('meta', 'name', name, 'content', content);
}

export function updateCustomMeta(property, content) {
  updateTag('meta', 'property', property, 'content', content);
}

export function updateHreflang(lang, href) {
  updateTag('link', 'hreflang', lang, 'href', href, true);
}

export function updateLink(rel, href) {
  updateTag('link', 'rel', rel, 'href', href);
}

export function updateTitle (title) {
  if (typeof title === "string") {
    document.title = title;
  } else {
    console.error("Unable to update site title with [title=%s]", title);
  }
}

export function clearHreflangs() {
  const nodes = document.head.querySelectorAll(`link[rel="alternate"]`) || [];
  nodes.forEach(node => node.parentNode.removeChild(node));
}
