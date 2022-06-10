# 🚇 TfL Discovery

A React web application that allows users to find out more about London’s transportation system. 

[Launch 🚀](https://master.dj6kvpnja6tj9.amplifyapp.com)

This app is using the [TfL Unified API](https://api.tfl.gov.uk/).

## Stack
- React
- TypeScript
- UI5 Web Components for React
- React Router DOM v6
- TailwindCSS (PostCSS, Autoprefixer)
- AWS (Deployed with Amplify)

## Routes
- `/` - Homepage
- `/lines/:id` - ServiceStatus
- `/bikes` - Bikes

## Usage

Visit the [deployed version](https://master.dj6kvpnja6tj9.amplifyapp.com) or `git clone https://github.com/stbodurov/tfl`.

The following commands are available:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
Learn more about running tests [here](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Future plans
- Enable global light/dark mode switch (ThemeContext)
- Extend test coverage