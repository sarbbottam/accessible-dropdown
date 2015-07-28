#!/bin/sh

rm -rf dist || exit 0;
mkdir dist;
( cd dist
 git init
 git config user.name "sarbbottam"
 git config user.email "sarbbottam@gmail.com"
 cp ../example/index.html ./index.html
 cp ../example/main.css ./main.css
 cp ../example/country.css ./country.css
 cp ../example/flags.css ./flags.css
 cp ../example/flags.png ./flags.png
 cp ../example/main.js ./main.js
 git add .
 git commit -m "initial commit"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
