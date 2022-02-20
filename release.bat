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

npm run generate

git add *
releaseName="Release ${1}"
git commit -m 
git push

echo ---------------------------------------
echo Finished release named "%releaseName%"
echo ---------------------------------------