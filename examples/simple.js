"use strict";

var adapter = require('../lib/test');
var Waterline = require('waterline');

var orm = new Waterline();

var config = {
  adapters: {
    elasticsearch: adapter
  },
  connections: {
    con1: {
      adapter: 'elasticsearch'
    }
  }
};

var User = Waterline.Collection.extend({

  adapter: 'elasticsearch',
  connection: 'con1',
  identity: 'users',

  //tableName: 'users',
  //schema: false,

//  autoCreatedAt: false,
//  autoUpdatedAt: false,
//  autoPK: false,

  attributes: {
    title: 'string',
    body: 'array'
  }
});

orm.loadCollection(User);
orm.initialize(config, function (err, response) {
  console.log("ORM initialized");
  if (!err) {
    //console.log(response.collections.users);
  }
});

//
//var model = new User({
//  tableName: 'users',
//  adapters: {
//    elasticsearch: adapter
//  }
//});
//
//model.create({
//    type: "moderator",
//    body: ["Name", "Surname", "Something"]
//  },
//  function () {
//    console.log(arguments);
//  }
//);