const moduleName = 'iads';
const moduleVersion = 'v1';
const baseApiUrl = `${env('BASE_URL', 'http://localhost:8000')}/api`;
const urlBase = `${moduleName}/${moduleVersion}`


export default {
  urlBase : urlBase,
  version: moduleVersion,
  categories: `${urlBase}/categories`,
  services: `${urlBase}/services`,
  schedules: `${urlBase}/schedules`,
  ads: `${urlBase}/ads`,
}
