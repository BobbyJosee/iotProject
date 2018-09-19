'use strict';

var util = require('util');
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'iotroom' });


module.exports = {
  iotOperation
};


function iotOperation(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var tableName = req.body.tableName;
  var col1 = req.body.col1;
  var col2 = req.body.col2;
  var col3 = req.body.col3;
  var val1 = req.body.val1;
  var val2 = req.body.val2;
  var val3 = req.body.val3;
  var q1="CREATE TABLE IF NOT EXISTS "+tableName+"("+col1+" text PRIMARY KEY,"+col2+" text);";
  var q2="insert into "+tableName+" ("+col1+") values('"+val1+"');";
  console.log("q1->"+q1);
  console.log("q2->"+q2);
  client.execute(q1)
  .then(res10=>{
    console.log("client.execute(q1)");
    client.execute(q2)
      .then(res10=>{
        console.log("client.execute(q2)")
        res.json("success")
      })



  })
  .catch(err=>{
    console.log("Error in table->"+err);
    res.json("error");
  })








}
