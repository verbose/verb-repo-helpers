/*!
 * verb-repo-helpers (https://github.com/verbose/verb-repo-helpers)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var debug = require('debug')('base:verb:readme-generator');
var utils = require('./utils');

module.exports = function plugin(app) {
  if (!this.isApp) return;
  if (this.isRegistered('verb-repo-helpers')) return;
  debug('initializing <%s>, called by <%s>', __filename, module.parent.id);

  /**
   * async helpers
   */

  app.asyncHelper('related', function() {
    var fn = utils.related(this.options);
    return fn.apply(this, arguments);
  });

  app.asyncHelper('reflinks', function() {
    var fn = utils.reflinks(this.options);
    return fn.apply(this, arguments);
  });

  app.asyncHelper('githubContributors', function() {
    return utils.contributors.apply(this, arguments);
  });

  app.asyncHelper('pkg', function fn(name, prop, cb) {
    if (typeof prop === 'function') {
      cb = prop;
      prop = null;
    }

    var key = name + ':' + String(prop);
    if (fn[key]) {
      cb(null, fn[key]);
      return;
    }

    utils.getPkg(name, function(err, pkg) {
      if (err) return cb(err);
      var res = prop ? utils.get(pkg, prop) : pkg;
      fn[key] = res;
      cb(null, res);
    });
  });

  app.asyncHelper('read', function(fp, cb) {
    fs.readFile(fp, 'utf8', cb);
  });

  app.asyncHelper('maybeInclude', function(name, helperName, cb) {
    if (typeof helperName === 'function') {
      cb = helperName;
      helperName = 'include';
    }

    var opts = utils.merge({}, this.options, this.context);
    if (opts[name]) {
      var fn = app.getAsyncHelper(helperName);
      return fn.apply(this, arguments);
    } else {
      cb(null, '');
    }
  });

  /**
   * sync helpers
   */

  app.helper('require', function(name) {
    try {
      return require(name);
    } catch (err) {}
    try {
      return require(path.resolve(name));
    } catch (err) {}
    return '';
  });

  // date helper
  app.helper('date', function() {
    return utils.date.apply(this, arguments);
  });

  app.helper('apidocs', function() {
    var fn = utils.apidocs(this.options);
    return fn.apply(null, arguments);
  });

  app.helper('copyright', function() {
    var fn = utils.copyright({linkify: true});
    return fn.apply(this, arguments);
  });

  app.helper('results', function(val) {
    var fn = require(utils.resolve.sync(app.cwd));
    var lines = util.inspect(fn(val)).split('\n');
    return lines.map(function(line) {
      return '//' + line;
    }).join('\n');
  });

  app.helper('previous', function(increment, v) {
    var segs = String(v).split('.');
    var version = '';
    switch (increment) {
      case 'major':
        version = (segs[0] - 1) + '.0.0';
        break;
      case 'minor':
      default: {
        version = segs[0] + '.' + (segs[1] - 1) + '.0';
        break;
      }
    }
    return version;
  });

  app.helper('issue', function(options) {
    var opts = utils.merge({}, this.context, options);
    opts.owner = opts.owner || opts.author && opts.author.username;
    opts.repo = opts.name;
    return utils.issue(opts);
  });

  debug('helpers finished');
  return plugin;
};
