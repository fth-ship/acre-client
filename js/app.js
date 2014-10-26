angular
  .module('acre.page', [])
  .value('title', 'Acre CMS')
  .factory('splitTag', function () {
    return function (input) {
      return input.split(/\,?\s/); 
    };
  })
  .factory('createPage', function ($http, splitTag) {
    return function (page) {
      page.tag = splitTag(page.tag);

      return $http({
        url: 'http://localhost:4000/api/page',
        method: 'POST',
        data: page
      });
    };
  })
  .factory('listPage', function ($http) {
    return function () {
      return $http({
        url: 'http://localhost:4000/api/page',
        method: 'GET',
      });
    };
  })
  .factory('removePage', function ($http) {
    return function (id) {
      return $http({
        url: 'http://localhost:4000/api/page/' + id,
        method: 'DELETE',
      });
    };
  })
  .controller('CreatePageCtrl', function (createPage, title, $log) {
    this.title = title;
    this.page = {};
    function savePage(page) {
      createPage(page).success(function (data) {
        $log.debug(data);
        this.page = {};
      });
    }
    this.savePage = savePage;
  })
  .controller('ListPageCtrl', function (listPage, removePage, $log, $scope) {
    $scope.pages = [];
    listPage().success(function (data) {
      $scope.pages = data.result;
    });
    this.listPages = function () {
      listPage().success(function (data) {
        $scope.pages = data.result;
      });
    };
    this.removePage = function (id, idx) {
      removePage(id).success(function (data) {
        function _pagesFilterHandler(item, i) {
          if (i !== idx) {
            return item;
          }
        }
        $scope.pages = $scope.pages.filter(_pagesFilterHandler);
      });
    };
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
