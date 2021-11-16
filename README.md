# Serverless

## Installation
        npm install

For Running

        sls offline start --skipCacheinvalidation

For Testing

        sls invoke test
or

        sls invoke test -t 30000

if it tooks a long time to connect with MongoDB

## Routing

Complete Routing of this App

## Comment Routes

GET, POST, and DELETE

## POST /dev/orgs/{orgName}/comments

        url: 'http://localhost:3000/dev/orgs/{orgName}/comments,
        body: { comments: {type: string}, 
        response status:
        { success:
        { statusCode: 200, comment:string }}

## GET /dev/orgs/{orgName}/comments

        url: 'http://localhost:3000/dev/orgs/{orgName}/comments,
        body: { comments: {type: string}, 
        response status:{ success:{ statusCode: 200, body: [{
        comment:String,
        organization: String,
        deleted: {
        type: Boolean,
        index: true,
        default: false
        }
        }] }}

## DELETE /dev/orgs/{orgName}/comments

        url: 'http://localhost:3000/dev/orgs/{orgName}/comments, 
        response status:
        { success:
        { statusCode: 200, body: Removed All Comments }}

## Member Routes

GET

## GET /dev/orgs/{orgName}/members

        url: 'http://localhost:3000/dev/orgs/{orgName}/members,
        response status:
        { success:{ statusCode: 200, body: [login: String,
        avatar: String,
        followers: Number,
        following: Number] }}
