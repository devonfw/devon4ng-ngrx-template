# devon4ng Application Template

This application utilizes @ngrx/store to manage the state of the app,@angular/router to manage navigation between routes, @ngrx/effects to isolate side effects. This project has been updated to **Angular 11** and uses the [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.

**Ngrx State Management**

This application uses [@ngrx/store](https://github.com/ngrx/platform/blob/master/docs/store/README.md) version 9.0.0 to manage application state, [@ngrx/effects](https://github.com/ngrx/platform/blob/master/docs/effects/README.md) version 11.0.1 to manage side effects, and [@ngrx/router-store]
(https://github.com/ngrx/platform/blob/master/docs/router-store/README.md) version 11.0.1 to connect the Angular Router with @ngrx/store.

### Ngrx Store

@ngrx/store is a controlled state container designed to help write performance, consistent applications on top of Angular.

Installation:

Run `npm install @ngrx/store` or `yarn add @ngrx/store`

### Ngrx Effects

@ngrx/effects provides an API to model event sources as actions.

Installation:

Run `npm install @ngrx/effects --save` OR `yarn add @ngrx/effects`

### Ngrx router-store

Bindings to connect the Angular Router with @ngrx/store.

Installation:

Run `npm install @ngrx/router-store --save` OR `yarn add @ngrx/router-store`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
