# Student Timer

<p align="center">
  <img src="./student-timer-frontend/assets/images/adaptive-icon.png" alt="Logo" width="300">
</p>
A React Native application for Android and iOS to monitor and manage your own learning behaviour during your studies

## Setup
To build the app and send push notifications, the project has to be uploaded to [expo.dev](https://expo.dev/). Therefore you need to create an account.

You also need the [eas-cli](https://docs.expo.dev/eas-update/getting-started/), to manage the project and create builds:

`npm install -g eas-cli`

After installation you need to login inside your terminal with your created account:

`eas login`

Then you can upload the project to [expo.dev](https://expo.dev/). First remove the "extra" and "owner" field from the [app.json](./student-timer-frontend/app.json). Then run the following command:

`eas project:init`

To facilitate development, the app can run on a local emulator on the PC. For installation check the [Android](https://docs.expo.dev/workflow/android-studio-emulator/) and [iOS](https://docs.expo.dev/workflow/ios-simulator/) instructions. Alternatively you can also run the application directly on your own real smartphone via [Expo Go](https://docs.expo.dev/get-started/expo-go/).

### Frontend
Go inside the student-timer-frontend folder and install the node modules:

```
cd ./student-timer-frontend
npm install
```
Create a .env with all environment variables. See [.env.example](./student-timer-frontend/.env.example) for reference. All environment variables must be in the following form ([docs](https://docs.expo.dev/guides/environment-variables/)): 

`EXPO_PUBLIC_[NAME]=value`

| variable name                        | description                                    | example                                            |
|--------------------------------------|------------------------------------------------|----------------------------------------------------|
| EXPO_PUBLIC_BACKEND_URL              | URL of the production backend server           | https://student-timer-backend.onrender.com/        |
| EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID     | Googe client ID for authentication in web      | 1234567890-abc123def456.apps.googleusercontent.com |
| EXPO_PUBLIC_GOOGLE_WEB_CLIENT_KEY    | Google client secret for authentication in web | abcdefgh1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ       |
| EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID     | Googe client ID for authentication on iOS      | 1234567890-abc123def456.apps.googleusercontent.com |
| EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID | Googe client ID for authentication on Android  | 1234567890-abc123def456.apps.googleusercontent.com |

### Backend
The backend is build with Java Spring Boot and a PostgreSQL database. Both is dockerized to make local development easier. Start docker and then run the following commands:

```
cd ./student-timer-backend
docker-compose up -d
```

The container will now always automatically start when you start docker.

Then create a .env with all environment variables. See [.env.example](./student-timer-backend/.env.example) for reference.

| variable name            | description                                                                               | example                                            |
|--------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------|
| DB_USERNAME              | Username for the database                                                                 | example_user                                       |
| DB_PASSWORD              | Password for the database                                                                 | SecurePassword123                                  |
| ACCESS_TOKEN_SECRET      | Secret for hashing the access token                                                       | AccessTokenSecret123!                              |
| REFRESH_TOKEN_SECRET     | Secret for hashing the refresh token                                                      | RefreshTokenSecret456@                             |
| TOKEN_ISSUER             | Name who created and signed the token                                                     | HSD                                                |
| ACCESS_TOKEN_EXPIRATION  | Time in milliseconds at which the access token expires                                    | 86400000                                           |
| REFRESH_TOKEN_EXPIRATION | Time in milliseconds at which the refresh token expires                                   | 2592000000                                         |
| GOOGLE_CLIENT_ID         | Google client id for authentication. Same as EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID in Frontend | 1234567890-abc123def456.apps.googleusercontent.com |

## Development
Start docker and the container and run the application inside the student-timer-frontend folder:

```
cd ./student-timer-frontend
npm start
```

To use the emulator press `a` for Android and `i` for iOS inside the terminal. It will start the emulator and open up the app. You can also scan the QR-Code from the terminal with Expo Go to use your real smartphone. After that it will show in recently opened so you only have to scan the QR-Code once.

Changes are shown immediately after saving, but sometimes its good to refresh the app. To refresh the app quickly, you can press `r` twice on your PC keyboard while in the emulator or press `r` once inside the terminal. This makes it faster as you dont have to keep opening the Expo Go Dev Tools.

The backend has a swagger documenation, which is available at http://localhost:8080/documentation. You can see and test all endpoints there.

## Building
You can create different types of builds with profiles that are defined in [eas.json](./student-timer-frontend/eas.json). Check the [docs](https://docs.expo.dev/build/eas-json/) for configuration. When creating a build the current git project with the latest commit will be uploaded. Since the .env is inside the .gitignore it will not be uploaded. To use environment variables in the builds you need to configure them inside the [eas.json](./student-timer-frontend/eas.json) with an `env` field. Since the file is visible inside the repository there should not be variables with sensitive data like api keys. For those you can create secrets in [expo.dev]() for an account or a specific project. They still have to be in the same format like in the .env:

`EXPO_PUBLIC_[NAME]`

You can build an APK for Android or a simulator build for the iOS simulator. To build it for real iOS phones you need an apple developer account.

Swap NAME with the profile name from the [eas.json](./student-timer-frontend/eas.json):
### Android (APK)
```
cd ./student-timer-frontend
eas build -p android --profile [NAME]
```

### iOS simulator build
```
cd ./student-timer-frontend
eas build -p ios --profile [NAME]
```