class Categories {
  constructor($log, $q, AppticlesAPI, AppticlesValidation) {

    const validateCategories = (result) => {
      let validatedCategories = AppticlesValidation.validateCategories(result);
      return $q.when(validatedCategories);
    };

    const populateCategories = (result) => {
      if (angular.isUndefined(result.error)) {
        this.categories = result;
      }
    };

    AppticlesAPI.findCategories({per_page: 100})
      .then(validateCategories)
      .then(populateCategories)
      .catch($log.error);
  }
}

Categories.$inject = ['$log', '$q', 'AppticlesAPI', 'AppticlesValidation'];

angular.module('appticles.categories')
  .controller('CategoriesController', Categories);
