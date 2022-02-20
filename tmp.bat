git add .
releaseName="Release ${1}"
git commit -m %releaseName%
git push

git checkout master

echo ---------------------------------------
echo Finished release named "%releaseName%"
echo ---------------------------------------