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
