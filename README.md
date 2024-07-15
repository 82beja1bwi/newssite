# Mock Service for End-to-End Testing and Showcasing

This repository holds the mock service designed for end-to-end testing and showcasing purposes. The service is built using Pug (formerly known as Jade) and Express.js, rendering pages on the server side. It sends negotiation headers, expects specific headers in return, and detects deviations, throwing errors when necessary.

## Overview

The service operates as a stateful entity, accessible via HTTP requests. It maintains an interaction state using a count variable to mimick negotiation headers and render different pages. For a broader context refer to https://github.com/82beja1bwi/consent_agent.git.

## Video Demonstration

For a visual demonstration of the service's functionality, a video is available at https://github.com/82beja1bwi/consent_agent.git.

## Usage

To utilize this mock service:

1. Clone this repository to your local machine.
2. Install NodeJS https://nodejs.org/en/download/package-manager/current
3. Install dependencies using `npm install`.
4. Start the service with `npm start`.
5. Access the service through HTTP requests, utilizing the provided endpoints.

## Structure

- `models`: Contains the data models used by the service.
- `node_modules`: Directory where npm installs the project dependencies.
- `public/pics`: Directory for storing images and other public assets.
- `view`: Contains pug templates
- `server.js`: Entry point for the application, where the Express server is configured and started.
- `responses.js`: Static data for rendering, response generation and end-to-end testing
- `package.json` and `package-lock.json`: Configuration files for npm, containing metadata about the project and its dependencies.
