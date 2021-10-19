# Setup

## Create workspace

npx create-nx-workspace@latest <NAME>

### Create angular app

yarn add -D @nrwl/angular
nx g @nrwl/nest:application <CLIENT_NAME>

### Create Nest.js app and setup proxy to client

yarn add -D @nrwl/nest
nx generate @nrwl/nest:application <SERVER_NAME> --frontendProject <CLIENT_NAME>

### Test that everything is running

Terminal 1: nx serve client
Terminal 2: nx serve server

In browser:
localhost:4200
localhost:3333/api
localhost:4200/api

### Add library for shared interfaces

npx nx g @nrwl/workspace:lib data

libs/data

data.ts
export interface ApiTest {
message: string;
}

### Connect the client to the server

#### app.module

Add HTTPClient to app.module

import { HttpClientModule } from '@angular/common/http';
imports: [BrowserModule, HttpClientModule],

#### app.component

Create interface
interface ApiTest {
message: string;
}

Add server request to component
constructor(private http: HttpClient) {}

public apiTest$!: Observable<ApiTest>;

ngOnInit() {
this.apiTest$ = this.http
.get('./api')
.pipe(map((response) => response as ApiTest));
}

Display message

<h1>{{ (apiTest$ | async)?.message }}</h1>

## Add environmental variables

Install config service dependency
yarn add @nestjs/config

app.module
import { ConfigModule } from '@nestjs/config';
...
imports: [ConfigModule.forRoot({ envFilePath: '.env' })],

app.service
constructor(private configService: ConfigService ) {}
return { message: `Welcome to server! ${this.configService.get('JWT')}` };

add .env to project root
JWT='TEST'

.gitignore

add .env to .gitignore

### Init GIT

git init
git add \*
git commit -m 'init'
git remote add origin https://github.com/ksthen/custom-journeybuilder-activity

Add keys
https://stackoverflow.com/questions/68775869/support-for-password-authentication-was-removed-please-use-a-personal-access-to

git push -u origin master

### Build and serve both apps

yarn add @nestjs/serve-static

server app.module

// Static hosting of angular app
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),

build the client:
nx build client

package.json

"files": ["dist/apps/client", "dist/apps/api"],

    "build": "nx build client; nx build server",
    "start": "node dist/apps/server/main.js"

## Heroku

.node-version
12.20.0

Create new pipeline
Link to github master branch to production

Heroku will run:
npm run build
npm run serve

Add environmental variables
Settings - config vars - this will populate the ConfigService

## SLDS

yarn add

angular.json / workspace.json

client - assets
{
"glob": "\*_/_",
"input": "node_modules/@salesforce-ux/design-system/assets/",
"output": "/assets"
}

"node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css",

Restart server

## Front-end

https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/custom-activity-ui.htm

config.json in client/src folder

{
"workflowApiVersion": "1.1",
"metaData": {
"icon": "images/icon.png"
},
"type": "REST",
"lang": {
"en-US": {
"description": "Custom Activity"
}
},
"arguments": {
"execute": {
"url": "https://$DOMAIN/api/execute",
      "verb": "POST",
      "body": "",
      "header": "",
      "format": "json",
      "useJwt": true,
      "timeout": 10000
    }
  },
  "configurationArguments": {
    "save": {
      "url": "https://$DOMAIN/api/save",
"verb": "POST",
"useJwt": true
},
"publish": {
"url": "https://$DOMAIN/api/publish",
      "verb": "POST",
      "useJwt": true
    },
    "stop": {
      "url": "https://$DOMAIN/api/stop",
"verb": "POST",
"useJwt": true
},
"validate": {
"url": "https://$DOMAIN/api/validate",
"verb": "POST",
"useJwt": true
}
},
"userInterfaces": {
"configInspector": {
"hideHeader": true,
"size": "scm-sm"
}
}
}

add config.json to build
assets: ["apps/client/src/config.json"

## Postmonger

yarn add postmonger

since no types
add file globals.d.ts
declare module "postmonger"

## Setup activity in SFMC

APps install package
Journey builder activity
Add component
