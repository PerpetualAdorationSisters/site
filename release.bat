@echo off

set releaseName=Release %1%
echo ---------------------------------------
echo Running release named "%releaseName%"...
echo ---------------------------------------

git checkout master
git pull
git checkout release
git pull
git merge master

cd ./src/site/
npm run generate

git add .
releaseName="Release ${1}"
git commit -m %releaseName%
git push

git checkout master

echo ---------------------------------------
echo Finished release named "%releaseName%"
echo ---------------------------------------