# Beptune :headphones:

> ### *Search for albums on Spotify from your digital music library*
<br>

Beptune is an CLI album parser for your locally stored music albums.
It searches spotify for desired album from your collection
and opens it in default browser. 
## :wrench: Install
```shell 
npm install beptune -g
```
## :guitar: Usage

### Navigate to folder
```shell
cd ~/Music
beptune
```
### or provide path
You can provide relative or absolute path to music directory
```shell
beptune --path ~/Music
```
Ran by NodeJS, written in TypeScript, with help of a few lovely open-source dependencies.

## :rocket: Run 
In order to run app locally, you'll have to place your spotify client credentials. <br>
Create file in `src/secure/spotify.ts` and add credentials constants `CLIENT_SECRET`and`CLIENT_ID`.<br><br>
Learn more at: [Authorization - Client Credentials](https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/)
```shell
yarn install
yarn start
```
## :hammer: Build
```shell
yarn build
```
