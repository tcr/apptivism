#!/bin/bash

set -e

react-native bundle --platform android --dev false --entry-file index.android.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

cd android && ./gradlew assembleRelease

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore ../my-app-key.keystore \
  ./app/build/outputs/apk/app-release-unsigned.apk my-app-alias

adb install -r ./app/build/outputs/apk/app-release-unsigned.apk
