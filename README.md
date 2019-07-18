# NearbyMessaging
Creates a react native project with Google's Nearby Messaging API already set up and integrated

## Google Nearby Messaging
Learn more about [Google's Nearby Messaging API] (https://developers.google.com/nearby/messages/overview)

## Get started

### Android
1. Clone repo `git clone https://github.com/carillem/NearbyMessaging.git`
2. `cd nearbymessaging_reactnative`
3. `yarn reverse` or `adb reverse tcp:8081 tcp:8081`
4. `yarn` or `npm install`
5. `yarn start` or `npm start`
6. MetroBundler will start up on a tab on your default browser
7. Open Android Studio and import `rootFolder/android/`
8. Update to Gradle version as suggested
9. Start and run on Android device

### iOS :soon:
 Coming soon.

## How it's made aka How to add Google's Nearby Messaging to your ejected Expo Application
**Note:** Only works if your project is fully ejected as a React Native project from expo

### A. If you don't have a project yet, clone my TypeScriptExpoTemplate repo from [here] (https://github.com/carillem/TypescriptExpoTemplate) using
`git clone https://github.com/carillem/TypescriptExpoTemplate`

### B. Bye, Expo :open_hands:
[Source:] (https://medium.com/reactbrasil/being-free-from-expo-in-react-native-apps-310034a3729)

#### 1. Eject from expo
`expo eject`
**What should your app appear as on a user’s home screen?** `NearbyMessaging`
**What should your Android Studio and XCode projects be called?** `NearbyMessaging`

#### 2. Remove other expo dependencies from project
- Uninstall the following packages: `yarn remove <package_name>` or `npm un <package_name>`
  - `@types/expo`
  - `babel-preset-expo`
- Install metro-react-native-babel-preset library for Metro Bundler: `yarn add metro-react-native-babel-preset` or `npm install metro-react-native-babel-preset`
- Delete `.expo/` library
- Update `babel.config.js` to:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'];
  };
};
```

#### 3. Install dependencies: `yarn` or `npm install`
#### 4. Run `adb reverse tcp:8081 tcp:8081`
#### 5. Run on Android device
- Open Android Studio
- Import the `root_project/android` folder and sync Gradle(**Note:Allow Gradle to be updated to the latest version**)
- Add minSdk to the project level `build.gradle`: `build.gradle(Project:<projectName>)`
  - minSdkVersion = 21
- Run on android device or emulator

### C. Add the Nearby Messaging module to your project
1. In the root folder of your project
 1. Install the `react-native-nearby-messaging-library-with-notifications` package:
     `yarn add react-native-nearby-messaging-library-with-notifications` or `npm install -i react-native-nearby-messaging-library-with-notifications`
    (**Note:** This library is a react native wrapper for the newest version Google’s Nearby Messaging API)
 2. Link the library with your react native project with: `react-native link react-native-nearby-messaging-library-with-notifications`
2. In `root_project/android` via Android Studio
 - Check that `react-native link` installed properly
  - In `settings.gradle`
    ```
    rootProject.name = 'NearbyMessaging'
    include ':react-native-nearby-messaging-library-with-notifications'
    project(':react-native-nearby-messaging-library-with-notifications').projectDir =
            new File(rootProject.projectDir, '../node_modules/react-native-nearby-messaging-library-with-notifications/android')

    include ':app'
    ```
  - In `build.gradle (Module:app)`, add to the list of dependencies
   ```
   implementation project(':react-native-nearby-messaging-library-with-notifications')
   ```
  - In app > java > com.projectname > MainApplication, `new RNNearbyMessagingLibraryPackage()` should be inside the `getPackages()` function
   ```
   public class MainApplication extends Application implements ReactApplication {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
              new RNNearbyMessagingLibraryPackage()
        );
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
    }

    @Override
    public void onCreate() {
      super.onCreate();
      SoLoader.init(this, /* native exopackage */ false);
    }
  }
   ```
 - Update `app/manifests/AndroidManifest.xml`
  - Permission requests
   ```
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    <uses-permission android:name="android.permission.WAKE_LOCK" />
   ```
  - API Key
   ```
   <meta-data
          android:name="com.google.android.nearby.messages.API_KEY"
          android:value="YOURAPIKEYHERE" />
   ```
 - Run on Android device to make sure it's all up and running

 ### D. Call Nearby Messaging from React Native project
 1. For typescript, create a declaration file (d.ts) inside the root folder (eg. `declarations.d.ts`)
    `declare module 'react-native-nearby-messaging-library-with-notifications’`
2. Import package and call library
 ```
 import RNNearbyMessagingLibrary from ‘react-native-messaging-library-with-notifications
 RNNearbyMessagingLibrary.checkLibraryConnection()
 ```
3. Add changes to the RNNearbyMessagingLibraryModule as needed. :)
