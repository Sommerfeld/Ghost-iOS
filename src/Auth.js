export function getClientInformation(url) {
  const configURL = `${url}/ghost/api/v0.1/configuration/`;
  return fetch(configURL)
    .then(function(data) {
      return data.json();
    })
    .then(function(json) {
      return {
        clientId: json.configuration[0].clientId,
        clientSecret: json.configuration[0].clientSecret,
      };
    });
}
// getClientInformation('http://207.154.225.34/').then(function(data) {
//   console.log(data);
// });
export default {};
