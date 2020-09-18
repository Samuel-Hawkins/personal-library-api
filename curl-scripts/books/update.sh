API="http://localhost:4741"
URL_PATH="/books/"
curl "${API}${URL_PATH}${ID}" \
--include \
--request PATCH \
  --header "Content-type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "book": {
      "title": "'"${TITLE}"'",
      "author":  "'"${AUTHOR}"'"
    }
  }'
echo
