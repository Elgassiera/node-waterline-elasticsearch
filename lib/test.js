"use strict";

var es = require('elasticsearch');
var _ = require('lodash');
var Q = require('q');

var connections = {};

module.exports = (function () {

  return {
    syncable: false,

    defaults: {
      host: 'localhost:9200',
      database: 'sails',
      port: 9200,
      user: null,
      password: null,
      schema: false,

      url: null,

      autoPK: false,
      pkFormat: 'string'

    },


    /**
     * Register A Connection
     *
     * Will open up a new connection using the configuration provided and store the DB
     * object to run commands off of. This creates a new pool for each connection config.
     *
     * @param {Object} connection
     * @param {Object} collections
     * @param {Function} cb
     */
    registerConnection: function (connection, collections, cb) {
      console.log("registerConnection");

      /**
       *
       * @type {{}}
       */
      var elasticConfig = {

      };

      connections[connection.identity] = {
        config: connection,
        collections: {},
        client: new es.Client((function (connection) {
          return connection;
        }(connection)))
      };

      Object.keys(collections).forEach(function(key) {
        connections[connection.identity].collections[key] = collections[key];
      });

      cb();
    },

    /**
     * Teardown
     *
     * Closes the connection pool and removes the connection object from the registry.
     *
     * @param {String} connectionName
     * @param {Function} cb
     */
    teardown: function (connectionName, cb) {
      console.log("teardown");
      connections[connectionName].client.close();
      delete connections[connectionName];
      process.nextTick(cb);
    },

    /**
     * Describe
     *
     * Return the Schema of a collection after first creating the collection
     * and indexes if they don't exist.
     *
     * @param {Object} connection
     * @param {String} collectionName
     * @param {Function} cb
     */
    describe: function (connection, collectionName, cb) {
      console.log("describe");
      var connectionObject = connections[connection];
      var collection = connectionObject.collections[collectionName];
      var client = connectionObject.client.indices;

      client.exists({
        index: connectionObject.config.database
      }).then(function (exists) {
        if (exists) {
          cb(null, collection.definition);
          return;
        }
        return client.create({
          index: connectionObject.config.database
        }).then(function (response) {
          if (response.acknowledged) {
            cb(null, collection.definition);
          }
        });
      });
    },

    /**
     * Define
     *
     * Create a new Collection and set Index Values
     *
     * @param {Object} connection
     * @param {String} collectionName
     * @param {Object} definition
     * @param {Function} cb
     */

    define: function (connection, collectionName, definition, cb) {
      console.log("define");
    },

    /**
     * Drop
     *
     * Drop a Collection
     *
     * @param {String} connection
     * @param {String} collectionName
     * @param {Array} relations
     * @param {Function} cb
     */
    drop: function (connection, collectionName, relations, cb) {
      console.log("drop");
      cb();
      var connectionObject = connections[connection];
      var collection = connectionObject.collections[collectionName];
      var client = connectionObject.client.indices;
      client.delete({
        index: connectionObject.config.database,
        type: collectionName
      });
    },

    /**
     * Create
     *
     * Insert a single document into a collection.
     *
     * @param {String} connection
     * @param {String} collectionName
     * @param {Object} data
     * @param {Function} cb
     */
    create: function (connection, collectionName, data, cb) {
      console.log("create");
      var connectionObject = connections[connection];

      connectionObject.client.index({
        index: connectionObject.config.database,
        type: collectionName,
        body: data
      }, function() {
        console.log(arguments);
      });
    },

    /**
     * Create Each
     *
     * Insert an array of documents into a collection.
     *
     * @param {String} collectionName
     * @param {Object} data
     * @param {Function} cb
     */

    createEach: function (collectionName, data, cb) {
      console.log("createEach");
      cb();
    },

    /**
     * REQUIRED method if users expect to call Model.find(), Model.findOne(), or related.
     *
     * You should implement this method to respond with an array of instances.
     * Waterline core will take care of supporting all the other different
     * find methods/usages.
     *
     * @param {String} connectionName
     * @param {String} collectionName
     * @param {Object} criteria
     * @param {Function} cb
     * @return {[type]}
     */
    find: function (connectionName, collectionName, criteria, cb) {
//      console.log("find");
//      console.log(criteria);
      var connectionObject = connections[connectionName];

      var query = {
        "query": {}
      };

      if (criteria.where) {
        query.query = _.cloneDeep(criteria.where);
      } else {
        query.query = {
          query_string: {
            query: "*:*"
          }
        };
      }

      connectionObject.client.search({
        index: connectionObject.config.database,
        type: collectionName,
        body: query
      }, function (err, response, errCode) {
        if (err) {
          cb(err);
          return;
        }
        cb(null, response.hits.hits);
      });
    },

    /**
     * Update
     *
     * Update all documents matching a criteria object in a collection.
     *
     * @param {String} collectionName
     * @param {Object} options
     * @param {Object} values
     * @param {Function} cb
     */

    update: function (collectionName, options, values, cb) {
      console.log("update");
      cb();
    },

    /**
     * Destroy
     *
     * Destroy all documents matching a criteria object in a collection.
     *
     * @param {String} collectionName
     * @param {Object} options
     * @param {Function} cb
     */

    destroy: function (collectionName, options, cb) {
      console.log("destroy");
      cb();
    },

    /**
     * Count
     *
     * Return a count of the number of records matching a criteria.
     *
     * @param {String} collectionName
     * @param {Object} options
     * @param {Function} cb
     */

    count: function (collectionName, options, cb) {
      console.log("count");
      cb();
    },

    identity: 'elasticsearch'

  };
}());


