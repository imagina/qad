const moduleName = 'iad';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase: urlBase,
  version: moduleVersion,
  ads: `${urlBase}/ads`,
  adStatus: `${urlBase}/ads/status`,
  categories: `${urlBase}/categories`,
}
