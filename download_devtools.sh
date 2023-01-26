
EXT_ID=fmkadmapgofadopljbjfkapdkoienihi
PROD_VERSION=60

URL="https://clients2.google.com/service/update2/crx?response=redirect&prodversion=${PROD_VERSION}&acceptformat=crx2,crx3&x=id%3D${EXT_ID}%26uc"
echo "URL=$URL"

curl -v "${URL}"
