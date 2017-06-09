angular.module('appticles.api')
  .factory('AppticlesAPI', AppticlesAPI);

AppticlesAPI.$inject = ['$log', '$http', 'configuration'];

/**
 * @ngdoc function
 * @name capitalize
 * @description Returns a capitalized version of the string being passed as an argument
 *
 * @example
 * <example module="myModule">
 * <file name="index.html">
 * <label for="word">Word</label>
 * <input type="text" name="word" id="word" placeholder="Type word...">
 * </file>
 *
 * <file name="capitalize.js">
 * let capitalizedName = capitalize('appticles'); // 'Appticles'
 * </file>
 * </example>
 *
 * @param  {string} input A string we want capitalized
 * @return {string}     The capitalized version of the string received as an argument
 */
const capitalize = (input) => {
  if (typeof input != 'string' || input == '') {
    return '';
  }

  return `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
};

/**
 * @ngdoc function
 * @name camelCase
 * @description Returns a camelCase version of all the strings passed in the `inputs` array.
 *
 * @example
 * <example module="myModule">
 * <file name="index.html">
 * </file>
 *
 * <file name="capitalize.js">
 * let camelCaseFox = camelCase(['the', 'quick', 'brown', 'fox']); // 'theQuickBrownFox'
 * </file>
 * </example>
 *
 * @param  {Array} inputs A list of strings(words)
 * @return {string}       A string representing the camel case version of the words in the `inputs` list
 */
const camelCase = (inputs) => {
  if (!angular.isArray(inputs) || inputs.some(input => typeof input != 'string')) {
    return '';
  }

  return [inputs[0], inputs.slice(1).map(capitalize)].join('');
};

/**
 * @ngdoc function
 * @name appticles.api.AppticlesAPI#findCategories
 * @methodOf appticles.api.AppticlesAPI
 * @description Fetches the list of categories available for a specific publisher, via
 * the Appticles API. Each category contains a list of posts.
 *
 * @return {Promise|Array} A promise which resolves to an array of category objects
 *
 * {@link https://developer.wordpress.org/rest-api/reference/categories/}
 */

/**
 * @ngdoc function
 * @name appticles.api.AppticlesAPI#findPosts
 * @methodOf appticles.api.AppticlesAPI
 * @description Fetches the list of posts available under a specific category, for a
 * specific publisher, via the Appticles API.
 *
 * @return {Promise|Array} A promise which resolves to an array of posts
 *
 * {@link https://developer.wordpress.org/rest-api/reference/posts/}
 *
 */


/**
 * @ngdoc function
 * @name appticles.api.AppticlesAPI#findPages
 * @methodOf appticles.api.AppticlesAPI
 * @description Fetches the list of pages for a specific publisher, via the Appticles API.
 *
 * @return {Promise|Array} A promise which resolves to an array of pages
 *
 * {@link https://developer.wordpress.org/rest-api/reference/pages/}
 */


/**
 * @ngdoc function
 * @name appticles.api.AppticlesAPI#findComments
 * @methodOf appticles.api.AppticlesAPI
 * @description Lists all the comments under a post for a publisher.
 *
 * @return {Promise|Array} A promise which resolves to an array of comments
 *
 * {@link https://developer.wordpress.org/rest-api/reference/comments/}
 */

/**
 * @ngdoc service
 * @name appticles.api.AppticlesAPI
 *
 * @description Creates a programmatic API that wraps around the export endpoints provided via
 * the configuration service.
 */
function AppticlesAPI($log, $http, configuration) {
  const API = {};
  const exportApiEndpoints = configuration.export;

  Object.keys(exportApiEndpoints)
    .forEach((endpoint) => {
      let methods = exportApiEndpoints[endpoint];
      Object.keys(methods)
        .forEach((method) => {
          API[camelCase([method, endpoint])] = (params = {}) => {
            params._jsonp = 'JSON_CALLBACK';

            let url = methods[method];
            if (params && params.id) {
              url = url + '/' + String(params.id);
              delete params.id;
            }

            return $http.jsonp(url, {
              method: 'GET',
              params: params
            });
          };
        });
    });

  return API;
}
