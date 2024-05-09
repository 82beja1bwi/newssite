# Mock Service for Integration Testing and Showcasing

This repository hosts a mock service designed for integration testing and showcasing purposes. The service is built using Pug (formerly known as Jade) and Express.js, rendering pages on the server-side. It sends negotiation headers, expects specific headers in return, and detects deviations, throwing errors when necessary.

## Overview

The service operates as a stateful entity, accessible via HTTP requests. It maintains interaction state using a count variable, which influences the negotiation headers and the rendering of different pages. For a broader context refer to https://github.com/82beja1bwi/consent_agent.git.

## Video Demonstration

For a visual demonstration of the service's functionality, a video is available at https://github.com/82beja1bwi/consent_agent.git.

## Usage

To utilize this mock service:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the service with `npm start`.
4. Access the service through HTTP requests, utilizing the provided endpoints.

## Further Details

For additional details on implementation or customization, refer to the codebase. Further information beyond what's outlined here may not be relevant for typical usage scenarios.
