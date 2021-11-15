'use strict';
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Comment = require('./models/Comment');


// Create comments based on organization
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    .then(() => {
        const parsedBody = JSON.parse(event.body)
        if(parsedBody.comment === ''){
            Promise.reject(new Error('Please write a comment'))
        }
        if( !event.pathParameters || event?.pathParameters?.orgName === null || event?.pathParameters?.orgName === ''){
            Promise.reject(new Error('Please define organization'))
        }
        Comment.create({organization: event?.pathParameters?.orgName, ...parsedBody})
        .then(comment => callback(null, {
          statusCode: 200,
          body: JSON.stringify(comment)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not add the comment.'
        }));
    });
};

// Fetch comments based on organization
module.exports.getComments = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if( !event.pathParameters || event?.pathParameters?.orgName === null || event?.pathParameters?.orgName === ''){
    Promise.reject(new Error('Please define organization'))
}
  connectToDatabase()
    .then(() => {
      Comment.find({deleted:false, organization: event?.pathParameters?.orgName})
        .then(comment => callback(null, {
          statusCode: 200,
          body: JSON.stringify(comment)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the Comments.'
        }));
    });
};

// Soft delete comments based on Organization
module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if( !event.pathParameters || event?.pathParameters?.orgName === null || event?.pathParameters?.orgName === ''){
    Promise.reject(new Error('Please define organization'))
}
  connectToDatabase()
    .then(() => {
      Comment.updateMany({organization: event?.pathParameters?.orgName},{deleted: true})
        .then(comment => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed All Comments' })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not remove the comments.'
        }));
    });
};