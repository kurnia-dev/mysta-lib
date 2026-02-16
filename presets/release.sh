cp package.json dist
cd dist


TAG=$1

if [ -z "$TAG" ]; then
  npm publish --access public
else
  npm publish --access public --tag $TAG
fi

cd ../
