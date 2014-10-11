describe('Acre app', function () {
  beforeEach(module('acre'));

  var $httpBackend = null;
  var createPageCtrl = null;
  var content = {
    title: 'Test case',
    body: 'testing...',
    tag: 'tag1, tag2',
  };
  var dataResult = {
    title: content.title,
    body: content.body,
    tag: content.tag.split(/\,?\s/)
  };

  beforeEach(inject(function ($injector, $controller, $rootScope) {
    $httpBackend = $injector.get('$httpBackend');
    createPageScope = $rootScope.$new();
    createPageCtrl = $controller('CreatePageCtrl', {
      $scope: createPageScope, 
    });
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('title value should be equal Acre CMS', inject(function (title) {
    expect(title).toEqual('Acre CMS');
  }));

  it('splitTag function should be result an list', inject(function (splitTag) {
    expect(splitTag('tag1, tag2')).toEqual(['tag1', 'tag2']); 
  }));

  it('createPage function should be create an page', inject(function (createPage) {
    $httpBackend
      .expectPOST('http://localhost:4000/api/page', dataResult)
      .respond(200, dataResult);

    createPage(content);
    $httpBackend.flush();
  }));

  it('create page ctrl should be title', function () {
    expect(createPageScope.title).toEqual('Acre CMS');
  });

  it('savePage ctrl should be exists', function () {
    expect(createPageScope.savePage).toBeDefined();
  });
});
