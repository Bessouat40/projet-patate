import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'http://51.20.69.171:8080/',
  realm: 'foodcop-realm',
  clientId: 'foodcop',
});
