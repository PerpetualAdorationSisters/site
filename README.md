# Website for Perpetual Adoration Sisters
Find the files for the perpetual adoration sisters website here

### Components
 - Website
   - Technologies: Vue + Nuxt.js, static rendering for deployment
   - Hosting: Github pages, custom domain via google domains
 - Email Api
   - Technologies: .NET Azure Function, SendGrid for email
   - Hosting: Azure (Under Isaac's azure subscription)

# Development

## Dependencies
To build the website, you will need
- npm: https://nodejs.org/en/download/
- vue cli: https://cli.vuejs.org/guide/installation.html

To build the email api, you will need
- .NET 6.0 SDK: https://dotnet.microsoft.com/en-us/download/visual-studio-sdks
- Azure function core tools: https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Cwindows%2Ccsharp%2Cportal%2Cbash

## Building the website
For local development
 - In a terminal, navigate to the /src/site directory
 - Run `npm run serve` to start a hot-reloading session locally
 - Open localhost:3000 in a web browser

# Releasing

## Releasing updates to the website
For a production release
- In a terminal, navigate to the root of the repository
- Run `./release.bat YYYYMMDDNN` and replace the release date with the current date (this is just a convention, not exactly necesary)
- Check the live website in a few minutes to see changes show up