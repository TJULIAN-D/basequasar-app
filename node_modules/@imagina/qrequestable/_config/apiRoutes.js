const moduleName = 'requestable';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase: urlBase,
  version: moduleVersion,
  requestables: `${urlBase}/requestables`,
  statuses: `${urlBase}/statuses`,
  categories: `${urlBase}/categories`,
  orderStatus: `${urlBase}/statuses/order-status`,
  automationRule: `${urlBase}/automation-rule`,
  comments: `${urlBase}/comments`,
  categoriesRule: `${urlBase}/category-rule`,
  categoriesFormFields: `${urlBase}/categories/{categoryId}/form-fields`,
  analytics: `${urlBase}/requestable/analytics`,
  chat: `${urlBase}/requestable/{criteria}/chat`,
  sources: `${urlBase}/sources`,
}
