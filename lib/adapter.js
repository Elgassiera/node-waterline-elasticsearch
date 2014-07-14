"use strict";

var elasticsearch = require('elasticsearch');

/**
 * Waterline ElasticSearch Adapter
 *
 * @param options
 * @returns {*}
 * @constructor
 */
function Adapter(options) {

  // Force Instantiation.
  if (!( this instanceof Adapter )) {
    return Adapter.create(options || {});
  }

  // Configure dynamic settings.
  Object.defineProperties(this, {
    defaults: {
      value: {
        host: 'localhost',
        database: 'default'
      },
      enumerable: true,
      writable: true
    },
    options: {
      value: options || {},
      enumerable: true,
      writable: true
    },
    syncable: {
      value: true,
      enumerable: true,
      writable: true
    }
  });

  // @chainable
  return this;

}

/**
 * Adapter Instance methods.
 *
 */
Object.defineProperties(Adapter.prototype, {

  /**
   * Administrative.
   *
   */
  registerCollection: {
    /**
     * One of the earliest methods called when a type is added.
     *
     * @param type
     * @param callback
     * @returns {*}
     */
    value: function registerCollection(type, callback) {
      Adapter.debug('registerCollection [identity:%s]', type.identity);

      // Configure dynamic settings.
      Object.defineProperties(this, {
        connection: {
          value: undefined,
          enumerable: false
        },
        defaults: {
          value: {
            host: 'localhost',
            database: 'default'
          },
          enumerable: true,
          writable: true
        },
        identity: {
          value: '_identity',
          enumerable: true,
          writable: true
        },
        client: {
          value: this.options.client ? this.options.client : new elasticsearch.Client({}),
          enumerable: true,
          writable: true
        }
      });

      callback(null);

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  utility: {
    value: require('./common/utility'),
    enumerable: false
  },

  /**
   * CRUD Related.
   *
   */
  define: {
    /**
     * Define Collection Schema.
     *
     * Creates the database if it does not already exist
     *
     * @param path {String} Name taken from tableName, it seems.
     * @param definition {Object} Schema.
     * @param cb
     * @returns {*}
     */
    value: function define(path, definition, cb) {
      Adapter.debug('define( %s )', path);

      cb(null, {});

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  create: {
    /**
     * Creates only if there isn't already a document there.
     *
     * @param type
     * @param data
     * @param callback
     * @returns {*}
     */
    value: function create(type, data, callback) {
      Adapter.debug('create [type:%s]', type);

      this.client.create(data, function (error, response) {
        if (error) {
          return callback(error);
        }

        console.log(response);

        return callback(null, response);
      });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//      this.client.request('post', '/icbl-mtaa-pqbp-hgdt-sgtu/user', data, function (error, body) {
//
//        if (error) {
//          return callback(error);
//        }
//
//        if (body && !body.ok) {
//          return callback(new Error('Could not save.'));
//        }
//
//        // Not sure if this should be done...
//        data._id = data._id = body._id;
//        data._version = data._version = body._version;
//        data._type = data._type = body._type;
//        data._index = data._index = body._index;
//
//        callback(null, data);
//
//      });

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  update: {
    /**
     * Updates Existing.
     *
     * @param path
     * @param options
     * @param values
     * @param cb
     * @returns {*}
     */
    value: function update(path, options, values, cb) {
      Adapter.debug('update( %s )', path);

      var type = data.type;
      var body = data.body[0];
      var options = data.body[1];

      this.connection.index(type, type, body, options, function (error, response) {
        if (error) return cb(error, null);
        cb(null, response);
      });

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  destroy: {
    /**
     * Delete one or more models from the type
     *
     * @param path
     * @param options
     * @param cb
     * @returns {*}
     */
    value: function destroy(path, options, cb) {
      Adapter.debug('destroy( %s )', path);

      var opts = options.where;

      var index = path;
      var type = opts.type;
      var id = opts.id;
      var options = opts.options ? opts.options : null;

      this.connection.delete(index, type, id, options, function (error, response) {
        if (error) cb(error, null);

        console.log(response);

        cb(null, response);
      });

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  drop: {
    value: function drop(path, cb) {
      Adapter.debug('drop( %s )', path);

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  describe: {
    /**
     * Simply returns the schema of the given type.
     *
     * - Required by Waterline.
     *
     * @param path
     * @param cb
     * @returns {*}
     */
    value: function describe(path, cb) {
      Adapter.debug('describe( %s )', path);

      // this.connection.getMapping( '_all', function( error, data ) { cb( null, data.properties ) });

      cb(null, {});

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },

  /**
   * Search Related.
   *
   */
  find: {
    /**
     * Search Documents.
     *
     * Example of what we get from Waterline:
     *  { "where":{ "_id": "orEXdQEj274Do1OLiTqU32oW" }, "limit":1 }
     *
     * ### ElasticSearch Exceptions
     * IndexMissingException[[%INDEX_NAME%] missing]
     *
     * @param type {string}
     * @param query {object}
     * @param callback {function}
     * @returns {*}
     */
    value: function find(type, query, callback) {
      Adapter.debug('find: [%s] [%s]', type, JSON.stringify(query));

      var _utility = require('./common/utility');

      this.client.search(query.where, function (error, data) {

        // Request Error.
        if (error || !data) {
          return callback(error || new Error('No response.'));
        }

        // ElasticSearch returned actual error.
        if (data.error) {
          return callback(new Error(data.error));
        }

        // Valid Index but no results.
        // @todo Should this return an error if no results are found?
        if (data.hits.total === 0) {
          return callback(null, []);
        }

        // Have Result.
        return callback(null, _utility.map(data.hits.hits, function single(data, index) {

          // @todo Need to verify this.
          if (data.facets) {
            return data.facets;
          }

          // Return "fields" if set.
          if (data.fields) {
            return data.fields;
          }

          // Return full source.
          return data._source;

        }));

      });

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  findOne: {
    /**
     * Find Single Model.
     *
     * Notice, this is not recognized by Waterline and is only used when called programatically
     * by other Adapter methods, such as from findOrCreate.
     *
     * Also be advised, the native findOne method only accepts two arguments.
     *
     * @param type
     * @param query
     * @param callback
     * @returns {*}
     */
    value: function findOne(type, query, callback) {
      Adapter.debug('findOne [type:%s]', type);

      console.log('findOne');

      var _query = {
        query: {},
        from: 0,
        size: 10
      };

      if (query.where && query.where.id) {

        _query.query.bool = {
          "must": [
            {
              "query_string": {
                "default_field": [ type, query.where.id ].join('.'),
                "query": query.where.id
              }
            }
          ],
          "must_not": [],
          "should": []
        }

      }

      this.client.request('post', '/_search', _query, function response(error, body) {

        if (error) {
          return callback(error, body);
        }

        if (body.hits && body.hits.total > 0) {
          return callback(null, body.hits.hits);
        }

        // No results.
        return callback(null);

      });

      //return callback( null );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  findOrCreate: {
    /**
     *
     * @param type
     * @param criteria
     * @param values
     * @param callback
     * @returns {*}
     */
    value: function findOrCreate(type, criteria, values, callback) {
      Adapter.debug('findOrCreate: [type:%s]', type);

      this.findOne(type, criteria, function (error, result) {

        // Request Failure.
        if (error) {
          return callback(error);
        }

        // Have Results.
        if (result) {
          return calback(null, result);
        }

        // Nothing found, create.
        this.create(type, values, callback);

        // @chainable
        return this;

      }.bind(this));

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  query: {
    /**
     *
     * @param path
     * @param query
     * @param data
     * @param cb
     */
    value: function query(path, query, data, cb) {
      Adapter.debug('query( %s )', path);

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  facets: {
    /**
     * Facet Query.
     *
     * @param path
     * @param query
     * @param data
     * @param cb
     */
    value: function facets(path, query, cb) {
      Adapter.debug('facets( %s )', query);

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },

  /**
   * Not Used / Not Supported.
   *
   */
  teardown: {
    value: function teardown(cb) {
      Adapter.debug('teardown()');

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  native: {
    value: function _native(type, cb) {
      Adapter.debug('native()');

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  createEach: {
    value: function createEach(path, data, cb) {
      Adapter.debug('createEach( %s )', path);

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  stream: {
    /**
     * Streams models to ES.
     *
     * @param path
     * @param options
     * @param stream
     */
    value: function stream(path, options, stream) {
      Adapter.debug('stream( %s )', path);

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  addAttribute: {
    value: function addAttribute(path, attrName, attrDef, cb) {
      Adapter.debug('addAttribute( %s )', path);

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  removeAttribute: {
    value: function removeAttribute(path, attrName, cb) {
      Adapter.debug('removeAttribute( %s )', path);

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  }

});

/**
 * Adapter Constructor methods.
 */
Object.defineProperties(module.exports = Adapter, {
  create: {
    /**
     * Instantiation helper.
     *
     * @param options
     * @returns {Adapter}
     */
    value: function create(options) {
      return new Adapter(options || {});
    },
    enumerable: true
  },
  debug: {
    value: require('debug')('waterline:elasticsearch'),
    writable: true
  },
  defaults: {
    value: require('../package').config,
    enumerable: true,
    writable: true
  }
});
