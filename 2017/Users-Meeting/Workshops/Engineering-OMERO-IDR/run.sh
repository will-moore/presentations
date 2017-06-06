#!/bin/bash
# Run the node server on http://localhost:8000
# Hit <s> to bring up the presenter view
[ "$(ls -A node_modules)" ] || npm install
npm start
