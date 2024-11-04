# Readme

This is a personal school project for Haaga-Helia University of Applied Sciences, course Mobiiliohjelmointi - SOF008AS3A-3009, created by Ali Romar.

The aim of this project is to create a working mobile application by the end of the course. Some planned features may be left out due to time constraints but might be implemented at a later date.

## Application details

This section describes the idea of the application and the technologies and techniques utilized to make this idea into a working mobile application.

### Concept

An application for creating simple stories and the ability to view created stories at a later date. A story consists of one or more templated pages which have one image as a background and a textbox at the bottom. The initial usage of this app was inteded for a parent and a child to create their own stories together.

### Technologies

This project is created with React Native framework and it uses the Expo ecosystem as a base. The final product is intended to be usable on both Android and iOS. During developement the main tools for manual testing will be Android Studio and Expo Go. TypeScript has been selected as the programming language.

Firebase platform is intended to be used for data persistence and possibly to enable user profiles and authentication/authorization. 

Numerous other libraries and tools will also be utilized in this project but as the exact needs of the project will most likely change during developement, only the most essential components are listed above.

## *Pre-existing Expo documentation for new projects, these are left here for now*

### *Get started*

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

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### *Get a fresh project*

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### *Learn more*

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

### *Join the community*

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
