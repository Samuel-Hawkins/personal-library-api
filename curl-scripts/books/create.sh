#!/bin/bash
API="http://localhost:4741"
URL_PATH="/books"
curl "${API}${URL_PATH}" \
--include \
--request POST \
  --header "Content-type: application/json" \
  --data '{
    "book": {
      "title": "'"${TITLE}"'",
      "author":  "'"${AUTHOR}"'",
      "owner": "'"${OWNER}"'"
    }
  }'
echo
