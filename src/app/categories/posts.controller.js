class Posts {
  constructor($log, $stateParams, $q, AppticlesAPI, AppticlesValidation) {

    const categoryId = $stateParams.id;

    const validatePosts = (result) => {
      let validatedPosts = AppticlesValidation.validatePosts(result);
      return $q.when(validatedPosts);
    };

    const populatePosts = (result) => {
      if (angular.isUndefined(result.error)) {
        this.posts = result;
      }
    };

    AppticlesAPI.findPosts({ categories: categoryId })
      .then(validatePosts)
      .then(populatePosts)
      .catch($log.error);
  }
}

Posts.$inject = ['$log', '$stateParams', '$q', 'AppticlesAPI', 'AppticlesValidation'];

angular.module('appticles.categories')
  .controller('PostsController', Posts);
