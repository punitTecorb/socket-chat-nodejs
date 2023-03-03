# Socket-chat-nodejs

## Introduction
    Chat using nodejs with TypeScript. we are using socket.io library for chat.

    Socket.io is a JavaScript library that allows real-time communication between clients and servers. It's built on top of the Websockets API.  The most common use cases for Websockets and socket.io are chat applications or social media feeds in which a user's page receives messages or posts from other users without needing the user to refresh the page. 

## Setup Steps:
### Required details for setup this project
   1. Add your mongodb database string in env file.
   2. Add your jwt token in env file.
### Install project dependency
`npm install`
### local server
`npm run start:dev`
### prod build
`npm run build`
### prod build run
`node dist/index.js`