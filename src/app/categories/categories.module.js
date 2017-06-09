angular.module('appticles.categories', [
  'ui.router',
  'appticles.api',
  'appticles.validation',
  'appticles.configuration',
  'appticles.htmlFilter'
])
  .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('categories', {
        url: '/categories',
        controller: 'CategoriesController as categoriesVm',
        templateUrl: 'app/categories/categories.template.html'
      })
      .state('posts', {
        url: '/categories/:id',
        controller: 'PostsController as postsVm',
        templateUrl: 'app/categories/posts.template.html'
      })
      .state('post', {
        url: '/article/:id',
        controller: 'PostController as postVm',
        templateUrl: 'app/categories/post.template.html'
      });

    $urlRouterProvider.otherwise('/categories');
  }]);
