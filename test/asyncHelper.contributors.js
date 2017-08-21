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

function addTemplate(app, filename) {
  var fp = fixtures(filename);
  app.pages.addView(filename, {path: fp, contents: fs.readFileSync(fp)});
}

describe('asyncHelper.contributors', function() {
  beforeEach(function() {
    app = new App();
    app.use(helpers);
    app.engine('md', require('engine-base'));
    app.create('partials', { viewType: 'partial' });
    app.create('pages');
    app.data(require('../package'));
  });

  it('should add contributors using defaults', function(cb) {
    addTemplate(app, 'contributors-defaults.md');
    app.render('contributors-defaults.md', function(err, res) {
      if (err) return cb(err);
      // contributors haven't updated on github yet
      if (!res.contents.toString().trim()) {
        assert.deepEqual(res.contents, new Buffer('\n'))
        cb();
        return;
      }

      assert(/\*\*Commits\*\*/.test(res.contents.toString()));
      assert(/\*\*Contributor\*\*/.test(res.contents.toString()));
      assert(/\[\w+\]\(.*?\)/.test(res.content));
      cb();
    });
  });

  it('should add contributors list', function(cb) {
    addTemplate(app, 'contributors-list.md');
    app.render('contributors-list.md', function(err, res) {
      if (err) return cb(err);
      assert(/\*\*Commits\*\*/.test(res.contents.toString()));
      assert(/\*\*Contributor\*\*/.test(res.contents.toString()));
      assert(/ *\+ *\d+ *\[\w+\]\(.*?\)/.test(res.contents.toString()));
      cb();
    });
  });

  it('should add contributors table', function(cb) {
    addTemplate(app, 'contributors-table.md');
    app.render('contributors-table.md', function(err, res) {
      if (err) return cb(err);
      assert(/\*\*Commits\*\*/.test(res.contents.toString()));
      assert(/\*\*Contributor\*\*/.test(res.contents.toString()));
      assert(/\[\w+\]\(.*?\)/.test(res.content));
      cb();
    });
  });

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
