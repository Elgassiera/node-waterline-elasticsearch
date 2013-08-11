/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['utils.js']) {
  _$jscoverage['utils.js'] = [];
  _$jscoverage['utils.js'][7] = 0;
  _$jscoverage['utils.js'][8] = 0;
  _$jscoverage['utils.js'][15] = 0;
  _$jscoverage['utils.js'][26] = 0;
  _$jscoverage['utils.js'][28] = 0;
  _$jscoverage['utils.js'][29] = 0;
  _$jscoverage['utils.js'][30] = 0;
  _$jscoverage['utils.js'][32] = 0;
  _$jscoverage['utils.js'][33] = 0;
  _$jscoverage['utils.js'][35] = 0;
  _$jscoverage['utils.js'][36] = 0;
  _$jscoverage['utils.js'][37] = 0;
  _$jscoverage['utils.js'][38] = 0;
  _$jscoverage['utils.js'][39] = 0;
  _$jscoverage['utils.js'][41] = 0;
  _$jscoverage['utils.js'][42] = 0;
  _$jscoverage['utils.js'][44] = 0;
  _$jscoverage['utils.js'][45] = 0;
  _$jscoverage['utils.js'][46] = 0;
  _$jscoverage['utils.js'][47] = 0;
  _$jscoverage['utils.js'][48] = 0;
  _$jscoverage['utils.js'][52] = 0;
  _$jscoverage['utils.js'][55] = 0;
  _$jscoverage['utils.js'][56] = 0;
  _$jscoverage['utils.js'][57] = 0;
  _$jscoverage['utils.js'][58] = 0;
  _$jscoverage['utils.js'][59] = 0;
  _$jscoverage['utils.js'][62] = 0;
  _$jscoverage['utils.js'][80] = 0;
  _$jscoverage['utils.js'][81] = 0;
  _$jscoverage['utils.js'][82] = 0;
  _$jscoverage['utils.js'][83] = 0;
  _$jscoverage['utils.js'][84] = 0;
  _$jscoverage['utils.js'][86] = 0;
  _$jscoverage['utils.js'][87] = 0;
  _$jscoverage['utils.js'][88] = 0;
  _$jscoverage['utils.js'][89] = 0;
  _$jscoverage['utils.js'][95] = 0;
  _$jscoverage['utils.js'][96] = 0;
  _$jscoverage['utils.js'][97] = 0;
  _$jscoverage['utils.js'][98] = 0;
  _$jscoverage['utils.js'][99] = 0;
  _$jscoverage['utils.js'][100] = 0;
  _$jscoverage['utils.js'][101] = 0;
  _$jscoverage['utils.js'][102] = 0;
  _$jscoverage['utils.js'][103] = 0;
  _$jscoverage['utils.js'][105] = 0;
  _$jscoverage['utils.js'][115] = 0;
  _$jscoverage['utils.js'][116] = 0;
  _$jscoverage['utils.js'][117] = 0;
  _$jscoverage['utils.js'][120] = 0;
}
_$jscoverage['utils.js'][7]++;
function Utility() {
  _$jscoverage['utils.js'][8]++;
  return Object.keys(arguments)? require("lodash").pick.apply(null, [Utility, Array.prototype.slice.call(arguments)]): Utility;
}
_$jscoverage['utils.js'][15]++;
Object.defineProperties(module.exports = Utility, {convert_to_elastic: {value: (function convert_to_elastic(values, collection, db, cb) {
  _$jscoverage['utils.js'][26]++;
  var schema = collection.schema;
  _$jscoverage['utils.js'][28]++;
  async.forEach(Object.keys(schema), (function (key, callback) {
  _$jscoverage['utils.js'][29]++;
  if (! values[key]) {
    _$jscoverage['utils.js'][30]++;
    return callback();
  }
  else {
    _$jscoverage['utils.js'][32]++;
    if (schema[key].required) {
      _$jscoverage['utils.js'][33]++;
      return callback("Required field missing");
    }
    else {
      _$jscoverage['utils.js'][35]++;
      if (schema[key].type === "date") {
        _$jscoverage['utils.js'][36]++;
        var date = new Date(values[key]).toISOString().split("T");
        _$jscoverage['utils.js'][37]++;
        date = date[0].split("-").concat(date[1].split(":"));
        _$jscoverage['utils.js'][38]++;
        for (var i = 0; i < date.length; ++i) {
          _$jscoverage['utils.js'][39]++;
          date[i] = parseInt(date[i]);
}
        _$jscoverage['utils.js'][41]++;
        values[key] = date;
        _$jscoverage['utils.js'][42]++;
        return callback();
      }
      else {
        _$jscoverage['utils.js'][44]++;
        if (schema[key].autoIncrement === true && key != "id") {
          _$jscoverage['utils.js'][45]++;
          exports.getAutoIncrement(collection.identity, key, db, (function (err, value) {
  _$jscoverage['utils.js'][46]++;
  if (err) {
    _$jscoverage['utils.js'][46]++;
    return callback(err);
  }
  _$jscoverage['utils.js'][47]++;
  values[key] = value;
  _$jscoverage['utils.js'][48]++;
  return callback();
}));
        }
        else {
          _$jscoverage['utils.js'][52]++;
          return callback();
        }
      }
    }
  }
}), (function (err) {
  _$jscoverage['utils.js'][55]++;
  if (values.id && values.rev) {
    _$jscoverage['utils.js'][56]++;
    values._id = values.id.toString();
    _$jscoverage['utils.js'][57]++;
    values._rev = values.rev.toString();
    _$jscoverage['utils.js'][58]++;
    delete values.id;
    _$jscoverage['utils.js'][59]++;
    delete values.rev;
  }
  _$jscoverage['utils.js'][62]++;
  return cb(err, values);
}));
}), enumerable: true, writable: true, configurable: true}, from_elastic: {value: (function from_elastic(models, schema) {
  _$jscoverage['utils.js'][80]++;
  var results = [];
  _$jscoverage['utils.js'][81]++;
  _.each(Object.keys(schema), (function (key) {
  _$jscoverage['utils.js'][82]++;
  if (typeof schema[key] === "function") {
    _$jscoverage['utils.js'][83]++;
    _.each(models, (function (model) {
  _$jscoverage['utils.js'][84]++;
  model[key] = schema[key];
}));
  }
  else {
    _$jscoverage['utils.js'][86]++;
    if (schema[key].type === "date") {
      _$jscoverage['utils.js'][87]++;
      _.each(models, (function (model) {
  _$jscoverage['utils.js'][88]++;
  if (model.doc[key]) {
    _$jscoverage['utils.js'][89]++;
    model.doc[key] = new Date(Date.UTC(model.doc[key][0], model.doc[key][1] - 1, model.doc[key][2], model.doc[key][3], model.doc[key][4], model.doc[key][5]));
  }
}));
    }
  }
}));
  _$jscoverage['utils.js'][95]++;
  _.each(models, (function (model) {
  _$jscoverage['utils.js'][96]++;
  var result = model.doc;
  _$jscoverage['utils.js'][97]++;
  result.id = result._id;
  _$jscoverage['utils.js'][98]++;
  delete result._id;
  _$jscoverage['utils.js'][99]++;
  result.rev = result._rev;
  _$jscoverage['utils.js'][100]++;
  delete result._rev;
  _$jscoverage['utils.js'][101]++;
  result.createdAt = new Date(result.createdAt);
  _$jscoverage['utils.js'][102]++;
  result.updatedAt = new Date(result.updatedAt);
  _$jscoverage['utils.js'][103]++;
  results.push(result);
}));
  _$jscoverage['utils.js'][105]++;
  return results;
}), enumerable: true, writable: true, configurable: true}, merge: {value: (function merge(a, b) {
  _$jscoverage['utils.js'][115]++;
  if (a && b) {
    _$jscoverage['utils.js'][116]++;
    for (var key in b) {
      _$jscoverage['utils.js'][117]++;
      a[key] = b[key];
}
  }
  _$jscoverage['utils.js'][120]++;
  return a;
}), enumerable: true, writable: true, configurable: true}, parse_url: {value: require("url").parse, enumerable: true, writable: true, configurable: true}, extend: {value: require("extend"), enumerable: false, writable: true, configurable: true}, pluck: {value: require("pluck"), enumerable: true, configurable: true, writable: true}});
_$jscoverage['utils.js'].source = ["/**"," * Helper Utility Collection"," *"," * @author potanin@UD"," * @date 6/17/13"," */","function Utility() {","  return Object.keys( arguments ) ? require( 'lodash' ).pick.apply( null, [ Utility, Array.prototype.slice.call( arguments ) ] ) : Utility;","}","","/**"," * SelectableConstructor Properties."," *"," */","Object.defineProperties( module.exports = Utility, {","  convert_to_elastic: {","    /**","     * Converts a Waterline model to ElasticSearch document.","     *","     * @param values","     * @param collection","     * @param db","     * @param cb","     */","    value: function convert_to_elastic( values,collection,db,cb ){","      var schema = collection.schema;","","      async.forEach(Object.keys(schema), function(key,callback){","          if (!values[key]){","            return callback();","          }","          else if (schema[key].required){","            return callback(\"Required field missing\");","          }","          else if (schema[key].type === 'date'){","            var date = new Date(values[key]).toISOString().split(\"T\");","            date = date[0].split(\"-\").concat(date[1].split(\":\"));","            for (var i = 0; i &lt; date.length; ++i){","              date[i] = parseInt(date[i]);","            }","            values[key] = date;","            return callback();","          }","          else if (schema[key].autoIncrement === true &amp;&amp; key != \"id\"){","            exports.getAutoIncrement(collection.identity,key,db,function(err,value){","              if (err) return callback(err);","              values[key] = value;","              return callback();","            });","          }","          else{","            return callback();","          }","        },function(err){","        if (values.id &amp;&amp; values.rev){","          values._id = values.id.toString();","          values._rev = values.rev.toString();","          delete values.id;","          delete values.rev;","        }","","        return cb(err,values);","      });","","    },","    enumerable: true,","    writable: true,","    configurable: true","  },","  from_elastic: {","    /**","     * Converts ElasticSearch document to Waterline Model","     *","     * @param models","     * @param schema","     * @returns {Array}","     */","    value: function from_elastic( models, schema ){","","      var results = [];","      _.each(Object.keys(schema),function(key){","        if (typeof schema[key] === 'function'){","          _.each(models,function(model){","            model[key] = schema[key];","          });","        }else if (schema[key].type === 'date'){","          _.each(models,function(model){","            if (model.doc[key]){","              model.doc[key] = new Date(Date.UTC(model.doc[key][0],model.doc[key][1]-1,model.doc[key][2],","                model.doc[key][3],model.doc[key][4],model.doc[key][5]));","            }","          });","        }","      });","      _.each(models,function(model){","        var result = model.doc;","        result.id = result._id;","        delete result._id;","        result.rev = result._rev;","        delete result._rev;","        result.createdAt = new Date(result.createdAt);","        result.updatedAt = new Date(result.updatedAt);","        results.push(result);","      });","      return results;","","","    },","    enumerable: true,","    writable: true,","    configurable: true","  },","  merge: {","    value: function merge (a, b){","      if (a &amp;&amp; b) {","        for (var key in b) {","          a[key] = b[key];","        }","      }","      return a;","    },","    enumerable: true,","    writable: true,","    configurable: true","  },","  parse_url: {","    value: require( 'url' ).parse,","    enumerable: true,","    writable: true,","    configurable: true","  },","  extend: {","    value: require( 'extend' ),","    enumerable: false,","    writable: true,","    configurable: true","  },","  pluck: {","    value: require( 'pluck' ),","    enumerable: true,","    configurable: true,","    writable: true","  }","})"];
