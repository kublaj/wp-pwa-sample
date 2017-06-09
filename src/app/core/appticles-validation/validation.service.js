angular.module('appticles.validation')
  .factory('AppticlesValidation', AppticlesValidation);


/**
 * @ngdoc service
 * @name appticles.validation.AppticlesValidation
 *
 * @description Service for validating data coming from the API.
 */
function AppticlesValidation() {

  let service = {
    validateCategories: validateCategories,
    validateOneCategories: validateOneCategories,
    validatePosts: validatePosts,
    validateOnePosts: validateOnePosts,
  };

  return service;

  /**
   * @ngdoc function
   * @name appticles.validation.AppticlesValidation#checkOneCategories
   * @methodOf appticles.validation.AppticlesValidation
   * @description Validate a single category object.
   *
   * @return {Boolean|Object} Return the category if it's valid, false otherwise.
   *
   * {@link https://developer.wordpress.org/rest-api/reference/categories/#schema}
   */
  function _checkOneCategories(category) {

    if (angular.isDefined(category.id) && /^[a-z0-9]+$/i.test(category.id) &&
      angular.isDefined(category.name) &&  angular.isString(category.name) &&
      angular.isDefined(category.slug) && angular.isString(category.slug) &&
      angular.isDefined(category.link) && angular.isString(category.link) &&
      (angular.isUndefined(category.parent) || /^[a-z0-9]+$/i.test(category.parent) )) {

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        link: category.link,
        parent: category.parent
      };
    }

    return false;
  }

    /**
   * @ngdoc function
   * @name appticles.validation.AppticlesValidation#validateCategory
   * @methodOf appticles.validation.AppticlesValidation
   * @description Validate category data
   *
   * @return {An Object} An object containing category details
   *
   * {@link https://developer.wordpress.org/rest-api/reference/categories/#retrieve-a-category}
   */
  function validateOneCategories(input) {
    if(angular.isObject(input) && !angular.isArray(input)) {

      if (angular.isDefined(input.data)) {

        let validCategory = _checkOneCategories(input.data);

        if (validCategory !== false) {
          return validCategory;
        }
      }
    }

    return { 'error': 'Invalid data' };
  };

  /**
   * @ngdoc function
   * @name appticles.validation.AppticlesValidation#validateCategories
   * @methodOf appticles.validation.AppticlesValidation
   * @description Validate categories data
   *
   * @return {Array} An array of category objects
   *
   * {@link https://developer.wordpress.org/rest-api/reference/categories/#list-categorys}
   */
  function validateCategories(input) {

    if(angular.isObject(input) && !angular.isArray(input)) {
      if (angular.isDefined(input.data)) {

        if (input.data.length == 0 || (input.data.status && input.data.status === 400)) {
          return [];
        }

        let validatedCategories = input.data.map(_checkOneCategories);

        if (validatedCategories.indexOf(false) === -1) {
          return validatedCategories;
        }
      }
    }

    return { 'error': 'Invalid data' };
  }

  /**
   * @ngdoc function
   * @name appticles.validation.AppticlesValidation#checkOnePages
   * @methodOf appticles.validation.AppticlesValidation
   * @description Validate a single page object.
   *
   * @return {Boolean|Object} Return the page if it's valid, false otherwise.
   *
   * {@link https://developer.wordpress.org/rest-api/reference/posts/#schema}
   */
  function _checkOnePosts(post) {

    if (angular.isDefined(post.id) && /^[a-z0-9]+$/i.test(post.id) &&
      angular.isDefined(post.title) && angular.isDefined(post.title.rendered)  && angular.isString(post.title.rendered) &&
      angular.isDefined(post.author) && /^[a-z0-9]+$/i.test(post.author) &&
      angular.isDefined(post.link) && angular.isString(post.link) &&
      angular.isDefined(post.date) && angular.isString(post.date) &&
      angular.isDefined(post.slug) && angular.isString(post.slug) &&
      angular.isDefined(post.excerpt) && angular.isDefined(post.excerpt.rendered) && angular.isString(post.excerpt.rendered) &&
      angular.isDefined(post.content) && angular.isDefined(post.content.rendered) && angular.isString(post.content.rendered) &&
      angular.isDefined(post.categories) && angular.isArray(post.categories) &&
      (angular.isUndefined(post.featured_media) || /^[a-z0-9]+$/i.test(post.featured_media)) &&
      (angular.isUndefined(post.comment_status) || ['open','closed'].indexOf(post.comment_status) !== -1 )) {

      let obj = {
        id: post.id,
        author: post.author,
        link: post.link,
        date: post.date,
        slug: post.slug,
        categories: post.categories
      };

      obj.title = post.title.rendered;
      obj.description = post.excerpt.rendered;
      obj.content = post.content.rendered;

      if (angular.isDefined(post.comment_status)) {
        obj.comment_status = post.comment_status;
      } else {
        obj.comment_status = 'closed';
      }

      if (angular.isDefined(post.featured_media)) {
        obj.featured_media = post.featured_media;
      }

      return obj;
    }

    return false;
  }

  /**
   * @ngdoc function
   * @name appticles.validation.AppticlesValidation#validateOnePosts
   * @methodOf appticles.validation.AppticlesValidation
   * @description Validate post details data
   *
   * @return {Object} An object with the details of a post
   *
   * {@link https://developer.wordpress.org/rest-api/reference/posts/#retrieve-a-post}
   */
  function validateOnePosts(input) {

    if(angular.isObject(input) && !angular.isArray(input)) {
      if (angular.isDefined(input.data)) {
        let validArticle = _checkOnePosts(input.data);

        if (validArticle !== false) {
          return validArticle;
        }
      }
    }

    return { 'error': 'Invalid data' };
  };

  /**
   * @ngdoc function
   * @name appticles.validation.AppticlesValidation#validatePosts
   * @methodOf appticles.validation.AppticlesValidation
   * @description Validate posts data
   *
   * @return {Array} An array of articles objects
   *
   * {@link https://developer.wordpress.org/rest-api/reference/posts/#list-posts}
   */
  function validatePosts(input) {

    if(angular.isObject(input) && !angular.isArray(input)) {

      if (angular.isDefined(input.data)) {

        if (input.data.length == 0 || (input.data.status && input.data.status === 400)) {
          return [];
        }

        let validatedPosts = input.data.map(_checkOnePosts);

        if (validatedPosts.indexOf(false) === -1) {
          return validatedPosts;
        }
      }
    }

    return { 'error': 'Invalid data' };
  };
}

