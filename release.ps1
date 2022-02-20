param(
    [Parameter(Mandatory)]
    [String]$name
)

$websiteUrl = "www.perpetualadorationsisters.org"
$releaseName = "Release " + $name 

Write-Output "---------------------------------------"
Write-Output "Running release '$releaseName' ..."
Write-Output "---------------------------------------"

Write-Output "Updating release branch..."
git checkout master | Out-Null
git pull | Out-Null
git checkout release | Out-Null
git pull | Out-Null
git merge master | Out-Null

Write-Output "Generating site files..."
cd ./src/site/
npm run generate | Out-Null
cd ../../

Write-Output "Generating CNAME..."
$websiteUrl | Out-File -FilePath docs/CNAME

git add . *> $null
git commit -m $releaseName | Out-Null

Write-Output "Pushing Changes..."
git push | Out-Null

git checkout master
Write-Output "Check the site at https://$websiteUrl in a few minutes to view the changes"

Write-Output "---------------------------------------"
Write-Output "Finished release '$releaseName'"
Write-Output "---------------------------------------"