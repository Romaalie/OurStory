# Readme

This is a personal school project for Haaga-Helia University of Applied Sciences, course Mobiiliohjelmointi - SOF008AS3A-3009, created by Ali Romar.

## Application details

This section describes the idea of the application and the technologies and techniques utilized to make this idea into a working mobile application.

### Concept

An application for creating simple stories and the ability to view created stories at a later date. A story consists of one or more templated pages which have one image as a background and a textbox at the bottom. The initial usage of this app was inteded for a parent and a child to create their own stories together.

### Technologies

This project is created utilizing [React Native](https://reactnative.dev/) and  [Expo](https://expo.dev/) with TypeScript as the programming language.

[Firebase](https://firebase.google.com/) and it's [Realtime Database](https://firebase.google.com/docs/database) are used for general data persistence. However storage of images is handled mainly via [Dropbox](https://www.dropbox.com/), with Firebase database saving the links to images saved in dropbox.

Images are currently also saved locally when taking a picture with the camera, but not used. The images used to view stories later are retrieved via Firebase and Dropbox.

The application currently utilizes [Dropbox API v2](https://www.dropbox.com/developers/documentation/http/documentation) and [OAuth 2.0](https://oauth.net/2/) to authenticate and subsequently authorize API requests. PKCE flow is utilized in the OAuth 2.0 authorization flow. Once the user has manually authenticated and authorized the app, a token is retrieved programmatically to be sent with subsequent API requests to dropbox.

The application is still in development and does not currently include any authentication other than the dropbox authentication for access to a restricted folder on the project creator's personal account. Multiple users were/are a planned feature but not currently implemented.

[Expo Go](https://expo.dev/go) and [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) have been the main ways of testing this application so far. No testing has been done on iOS.

#### Noteworthy libraries used in this app, in the context of learning new things:
- **axios**, for calls to get a temporary image link to dropbox.
- **depcheck**, for finding and cleaning out unused dependencies
- **expo-camera**, for taking the pictures (used in course materials)
- **expo-crypto**, for creating the code verifier and code challenge in the pkce flow
- **expo-file-system**, for saving the camera pictures locally
- **expo-secure-store**, for storing the dropbox token securely
- **react-native-webview**, for dropbox AA functionality


## Getting Started

Currently the project can only be run by [cloning](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) it locally from the GitHub repository. After successfully creating a local copy navigate to the root of the project to install the necessary dependencies and start the development server for the Expo project.:

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

Select your preferred method and enjoy.

## Licence

TBD