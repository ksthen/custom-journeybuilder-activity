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

yarn add concurrently
package.json
"start:client": "nx serve client",
"start:server": "nx serve server",
"dev": "concurrently -p=\"{name}\" -n=\"Angular,NestJS\" -c=\"green,blue\" \"npm run start:client\" \"npm run start:server\""

yarn add @nestjs/serve-static

server app.module

// Static hosting of angular app
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),

//https://dev.to/hendrikfoo/building-full-stack-web-applications-with-angular-nestjs-and-nx-a-match-made-in-heaven-5fh7

build the client:
nx build client

package.json

"files": ["dist/apps/client", "dist/apps/api"],

    "serve": "node dist/apps/api/main.js"

## Netlify

addd netlify.toml
[build]
command = "npm run build"
publish = "dist/"
functions = "dist/server"

.node-version
12.20.0



### Create a new cloud function

https://docs.netlify.com/functions/build-with-typescript/

yarn add @nrwl/node
yarn add @netlify/functions
