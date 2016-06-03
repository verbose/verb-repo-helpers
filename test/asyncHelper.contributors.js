'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var App = require('templates');
var assert = require('assert');
var helpers = require('..');
var app;

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var template;

function addTemplate(app, name, filename) {
  var fp = fixtures(filename);
  app[name].addView(filename, {path: fp, contents: fs.readFileSync(fp)});
}

describe('asyncHelper.contributors', function() {
  beforeEach(function() {
    app = new App();
    app.use(helpers);

    app.engine('md', require('engine-base'));
    app.create('partials', { viewType: 'partial' });
    app.create('pages');
    app.data(require('../package'));
    template = addTemplate.bind(null, app, 'pages');
  });

  it('should add contributors list', function(cb) {
    var name = 'contributors-list.md';
    template(name);
    app.render(name, function(err, res) {
      if (err) return cb(err);
      assert(/\*\*Commits\*\*/.test(res.content));
      assert(/\*\*Contributor\*\*/.test(res.content));
      assert(/ *\+ *\d+ *\[\w+\]\(.*?\)/.test(res.content));
      cb();
    });
  });

  // it('should add contributors table', function(cb) {
  //   var name = 'contributors-table.md';
  //   template(name);
  //   app.render(name, function(err, res) {
  //     if (err) return cb(err);
  //     assert(/\*\*Commits\*\*/.test(res.content));
  //     assert(/\*\*Contributor\*\*/.test(res.content));
  //     assert(/ *\+ *\d+ *\[\w+\]\(.*?\)/.test(res.content));
  //     cb();
  //   });
  // });

  // it('should error when a file does not exist', function(cb) {
  //   app.page('note.md', {content: 'foo <%= contributors("test/fixtures/fofofofofo.md") %> bar'});

  //   app.render('note.md', function(err, res) {
  //     assert(err);
  //     assert.equal(err.code, 'ENOENT');
  //     cb();
  //   });
  // });

  // it('should contributors a file from a partial', function(cb) {
  //   app.partial('a.md', {content: '<%= contributors("test/fixtures/abc.md") %>'});
  //   app.page('note.md', {content: 'foo <%= partial("a.md") %> bar'});

  //   app.render('note.md', function(err, res) {
  //     if (err) return cb(err);
  //     assert.equal(res.content, 'foo AAABBBCCC bar');
  //     cb();
  //   });
  // });
});
