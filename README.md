# devon4ng Application Template

This project is a sampleData collection Template.the user can search for sampleData and add them to their collection also edit and delete,This application utilizes @ngrx/store to manage the state of the app,@angular/router to manage navigation between routes, @ngrx/effects to isolate side effects. This project has been updated to **Angular 7** and uses the [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.


**Ngrx State Management**

This application uses [@ngrx/store](https://github.com/ngrx/platform/blob/master/docs/store/README.md) to manage application state, and [@ngrx/effects](https://github.com/ngrx/platform/blob/master/docs/effects/README.md) to manange side effects, It also uses ngrx 7 fractal state management to leverage lazy loading of reducers and effects.


### Ngrx Store:
@ngrx/store is a controlled state container designed to help write performant, consistent applications on top of Angular. Core tenets:

1. State is a single, immutable data structure.
2. Actions describe state changes.
3. Pure functions called reducers take the previous state and the next action to     compute the new state.
4. State accessed with the Store, an observable of state and an observer of actions.
`These core principles enable building components`

Installation

Run `npm install @ngrx/store` or `yarn add @ngrx/store`
for install @ngrx/store from npm

### Ngrx Effects

@ngrx/effects provides an API to model event sources as actions. Effects:

1. Listen for actions dispatched from @ngrx/store.
2. Isolate side effects from components, allowing for more pure components that select state and dispatch actions.
3. Provide new sources of actions to reduce state based on external interactions such as network requests, web socket messages and time-based events.

Installation

Run `npm install @ngrx/effects --save` OR `yarn add @ngrx/effects`

### Ngrx router-store

Bindings to connect the Angular Router with @ngrx/store [@ngrx router-store README]
(https://github.com/ngrx/platform/blob/master/docs/router-store/README.md)

Installation

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
