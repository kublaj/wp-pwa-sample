class Post {
  constructor($log, $stateParams, $q, AppticlesAPI, AppticlesValidation) {

    const postId = $stateParams.id;

    const validatePost = (result) => {
      let validatedPost = AppticlesValidation.validateOnePosts(result);
      return $q.when(validatedPost);
    };

    const populatePost = (result) => {
      if (angular.isUndefined(result.error)) {
        this.post = result;
      }
    };

    AppticlesAPI.findOnePosts({ id: postId })
      .then(validatePost)
      .then(populatePost)
      .catch($log.error);
  }
}

Post.$inject = ['$log', '$stateParams', '$q', 'AppticlesAPI', 'AppticlesValidation'];

angular.module('appticles.categories')
  .controller('PostController', Post);
