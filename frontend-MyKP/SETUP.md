# MyKP — Setup Guide (Windows + macOS)

This monorepo contains:

- `backend-MyKP/` — Laravel 12 API (PHP 8.2+)
- `frontend-MyKP/` — Expo SDK 54 / React Native app (must be run as a **dev build**, not Expo Go, because it uses native Google Sign-In)

You will run **both** at the same time during development. The phone talks to the laptop's local IP.

---

## 1. Install prerequisites

### Common to both Windows and macOS

| Tool | Version | Why |
|---|---|---|
| Git | latest | clone the repo |
| Node.js | 20 LTS or newer | Expo SDK 54 |
| PHP | 8.2 or newer | Laravel 12 |
| Composer | 2.x | PHP deps |
| JDK | **17** (not 21, not 11) | Android Gradle Plugin |
| Android Studio | latest | provides the Android SDK + emulator |

You also need a Google account that can access the Google Cloud Console project that owns the OAuth credentials (see §5).

### Windows-specific install

1. **Node.js** — install LTS from https://nodejs.org
2. **PHP + Composer** — easiest is https://laragon.org or install PHP 8.2 manually, then https://getcomposer.org/Composer-Setup.exe
3. **JDK 17** — Microsoft OpenJDK 17 from https://learn.microsoft.com/en-us/java/openjdk/download
4. **Android Studio** — https://developer.android.com/studio
   - On first launch, accept the SDK install. Open *Settings → Languages & Frameworks → Android SDK* and make sure **Android SDK Platform 35** and **Android SDK Build-Tools** are checked.
5. **Set environment variables** (PowerShell, no admin needed — run once):
   ```powershell
   [Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Microsoft\jdk-17.0.14.7-hotspot", "User")
   [Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
   ```
   Adjust the JDK path to wherever you installed JDK 17. Close and reopen all terminals after.

### macOS-specific install

Use [Homebrew](https://brew.sh):

```sh
brew install node
brew install php
brew install composer
brew install --cask zulu@17     # JDK 17
brew install --cask android-studio
brew install watchman           # required by Metro on macOS
brew install cocoapods          # iOS native build
```

Open Android Studio once and let it install the SDK. Then add these to `~/.zshrc`:

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

Reload: `source ~/.zshrc`.

For iOS (macOS only):
- Install **Xcode** from the Mac App Store (large download).
- In Xcode → Settings → Locations → install the **Command Line Tools**.

---

## 2. Clone and install dependencies

```sh
git clone <repo-url> MyKP
cd MyKP
```

### Backend

```sh
cd backend-MyKP
composer install
cp .env.example .env       # macOS / Linux
# OR on Windows PowerShell:
# Copy-Item .env.example .env
php artisan key:generate
```

Open `.env` and set:

```
GOOGLE_CLIENT_ID=193433707669-v82q01sn5t3fqtbec7qu08afi0dcrukj.apps.googleusercontent.com
```

(Use the **Web** OAuth client ID — same one as `googleWebClientId` in the frontend.)

The DB is SQLite by default — file lives at `database/database.sqlite`. The repo includes one already, but to be safe:

```sh
php artisan migrate --seed
```

### Frontend

```sh
cd ../frontend-MyKP
npm install
```

---

## 3. Wire up the API URL to your laptop's IP

The phone needs to reach the laptop over the LAN. Find your laptop's WiFi IPv4:

- **Windows:** `ipconfig | Select-String "IPv4"` — pick the one matching your WiFi adapter (e.g. `192.168.1.13`). Ignore Hyper-V / WSL / vEthernet adapters.
- **macOS:** `ipconfig getifaddr en0` (en0 = WiFi). If empty, try `en1`.

Edit [`src/features/auth/services/authService.ts`](frontend-MyKP/src/features/auth/services/authService.ts):

```ts
const API_URL = 'http://YOUR_LAPTOP_IP:8000/api';
```

> Re-do this whenever your laptop's IP changes (it does — DHCP).

---

## 4. Set up your Android signing certificate (one-time per developer machine)

Each developer's laptop has a unique debug keystore. Google needs to know yours.

```sh
cd frontend-MyKP
npx expo prebuild               # generates android/ and ios/
cd android
./gradlew signingReport         # macOS / Linux
# OR on Windows:
# .\gradlew.bat signingReport
```

Find the section labeled `Variant: debug` — the **SHA1** line is what you need. It looks like `5E:8F:16:06:2E:A3:CD:2C:...`.

Then in Google Cloud Console (see next section), add this SHA-1 to the **Android OAuth client** alongside any existing fingerprints.

---

## 5. Google OAuth setup (one-time per project)

If the OAuth clients already exist for this project, ask the project owner to add your Android debug SHA-1 to the existing **Android** client and skip ahead to §6. Otherwise:

1. Go to https://console.cloud.google.com → select the project
2. **APIs & Services → OAuth consent screen** → configure if not already done
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID:**
   - **Web application** — used by the backend to verify tokens. Copy the client ID into `backend-MyKP/.env` as `GOOGLE_CLIENT_ID` and into `frontend-MyKP/app.json` under `extra.googleWebClientId`.
   - **Android** — package name `com.keaneken.frontendmykp`, SHA-1 = the value from §4. Copy the client ID into `frontend-MyKP/app.json` under `extra.googleAndroidClientId`.
   - **iOS** (macOS users wanting iOS sign-in) — bundle ID `com.keaneken.frontendmykp`. Copy the client ID into `extra.googleIosClientId`. Also reverse the client ID prefix into the iOS URL scheme: in `app.json`, replace `com.googleusercontent.apps.PLACEHOLDER_CREATE_IOS_CLIENT` with `com.googleusercontent.apps.<your-iOS-client-id-prefix>`.

---

## 6. Run the app

You need **two terminals**: one for the backend, one for the frontend.

### Terminal 1 — backend

```sh
cd backend-MyKP
php artisan serve --host=0.0.0.0 --port=8000
```

`--host=0.0.0.0` is **required** so your phone can reach the server. Default `php artisan serve` only listens on localhost.

### Terminal 2 — frontend dev build

Phone must be plugged in via USB with **USB debugging enabled**:
- Android: Settings → About → tap "Build number" 7 times → Settings → Developer options → enable USB debugging → tap "Allow" on the prompt that appears when you plug in.
- iOS: Settings → Privacy & Security → enable Developer Mode (after first run of `expo run:ios`).

**Android (Windows or macOS):**

```sh
cd frontend-MyKP
npx expo prebuild --clean       # only needed first time, or after app.json plugin changes
npx expo run:android
```

(Windows: prefix the `expo` commands with `$env:JAVA_HOME = "..."; $env:ANDROID_HOME = "..."` if you didn't set them permanently.)

**iOS (macOS only):**

```sh
cd frontend-MyKP
npx expo prebuild --clean
npx expo run:ios --device
```

First build is slow (5–15 min). When it's done, your phone has a new app icon called **frontend-MyKP**. Open *that*, not Expo Go.

---

## 7. Firewall — let your phone reach Laravel

Both phone and laptop must be on the same WiFi (not guest network, no AP isolation).

### Windows

In **admin** PowerShell:

```powershell
New-NetFirewallRule -DisplayName "Laravel Dev 8000" -Direction Inbound -LocalPort 8000 -Protocol TCP -Action Allow
```

### macOS

System Settings → Network → Firewall → either turn it off for dev, or add an allow rule for `php`. Most macOS dev setups have the firewall off by default.

### Verify reachability

In your phone's browser, open `http://YOUR_LAPTOP_IP:8000`. You should see something from Laravel — even an error page is fine, it proves the server is reachable.

---

## 8. Daily workflow (after first-time setup)

1. Terminal 1: `cd backend-MyKP; php artisan serve --host=0.0.0.0 --port=8000`
2. Terminal 2: `cd frontend-MyKP; npx expo start --dev-client`
3. Open the **frontend-MyKP** app on your phone — it'll hot-reload on JS changes.

You only need to re-run `npx expo run:android` / `run:ios` when you change native code or `app.json` plugin config.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `JAVA_HOME is set to an invalid directory` | JDK path wrong | Re-set JAVA_HOME to your actual JDK 17 install |
| `SDK location not found` (Android build) | `ANDROID_HOME` unset or `local.properties` missing | Set `ANDROID_HOME` env var, or create `frontend-MyKP/android/local.properties` with `sdk.dir=/path/to/sdk` (use double backslashes on Windows) |
| `Network request failed` in app | Backend unreachable from phone | Check (1) Laravel running with `--host=0.0.0.0`, (2) `API_URL` matches your current laptop IP, (3) firewall, (4) phone on same WiFi |
| `Access blocked: invalid_request` (Google) | App's debug SHA-1 isn't registered on the Android OAuth client | Run §4 again, paste your SHA-1 into the Google Cloud Console Android client (multiple SHA-1s allowed) |
| Google sign-in popup never reappears | Already signed in — Google SDK reuses cache | Already handled in code via `signOut()` before `signIn()` |
| `getTokens requires a user to be signed in` | `signIn()` was cancelled, code didn't check | Already handled — we check `isSuccessResponse()` before `getTokens()` |
| Build fails on macOS for iOS with "no such module" | CocoaPods out of date | `cd ios && pod install` then re-run `expo run:ios` |
| Phone shows "site can't be reached" for `http://laptop-ip:8000` | Firewall, AP isolation, or wrong IP | See §7 |
