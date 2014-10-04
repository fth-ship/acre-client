angular
  .module('acre.page', [])
  .constant('title', 'Acre CMS')
  .factory('createPage', function ($http) {
    return function (page) {
      page.tag = page.tag.split(/\,|\,\s/);

      return $http({
        url: 'http://localhost:4000/api/page',
        method: 'POST',
        data: page
      });
    };
  })
  .controller('CreatePageCtrl', function ($scope, createPage, title, $log) {
    $scope.title = title;
    $scope.page = {};
    function savePage(page) {
      createPage(page).success(function (data) {
        $log.debug(data);
      });
    }
    $scope.savePage = savePage;
  })
  .run(function ($log) {
    $log.debug('Acre page started!');
  });

angular
  .module('acre', ['acre.page'])
  .run(function ($log) {
    $log.debug('Acre started!');
  });

angular.bootstrap(document, ['acre']);
