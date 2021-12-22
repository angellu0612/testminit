/**
 * append node
 * @param parent {Node}
 * @param child {Node}
 * @return {void}
 */
export function appendNode(parent, child) {
  parent.appendChild(child);
}

/**
 * remove node
 * @param node
 * @return {void}
 */
export function removeNode(node) {
  node.parentNode?.removeChild(node);
}

/**
 * Set a style property
 * @param target {ElementCSSInlineStyle}
 * @param propertyName {string}
 * @param value {number|string}
 * @param [priority] {string}
 */
export function setStyleProperty(target, propertyName, value, priority) {
  target.style.setProperty(propertyName, String(value), priority);
}

/**
 * Get a style property
 * @param target {ElementCSSInlineStyle}
 * @param propertyName {string}
 * @returns {string}
 */
export function getStyleProperty(target, propertyName) {
  return target.style.getPropertyValue(propertyName).trim();
}
