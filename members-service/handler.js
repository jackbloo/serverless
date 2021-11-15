'use strict';
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Member = require('./models/Member');

// Fetch Members based on Organization
module.exports.getMembers = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if( !event.pathParameters || event?.pathParameters?.orgName === null || event?.pathParameters?.orgName === ''){
    Promise.reject(new Error('Please define organization'))
}
  connectToDatabase()
    .then(() => {
      Member.find({organization: event?.pathParameters?.orgName})
        .then(member => callback(null, {
          statusCode: 200,
          body: JSON.stringify(member)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the members.'
        }))
    });
};
