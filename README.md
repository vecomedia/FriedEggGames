# FriedEggGames Twitch Extension

A minimal SvelteKit and TypeScript Twitch Extension panel for checking that the same panel can be shown to a broadcaster and viewers. The panel displays the role Twitch reports in its extension context.

## Run locally

1. Install dependencies with `npm install`.
2. Install `mkcert` and Firefox's NSS tools for your Linux distribution. For Debian/Ubuntu, install NSS tools with `sudo apt install libnss3-tools`; install the `mkcert` binary using its official installation instructions.
3. From this folder, create and trust a local CA, then generate a localhost certificate:

   ```sh
   mkcert -install
   mkdir -p certs
   mkcert -cert-file certs/localhost.pem -key-file certs/localhost-key.pem localhost 127.0.0.1 ::1
   ```

4. Start the server with `npm run dev`.
5. Open `https://localhost:8001/panel.html` for a local preview.

## Connect it to Twitch's local test

1. In Firefox, open `https://localhost:8001/panel.html` and confirm there is no certificate warning.
2. In the Twitch Developer Console, open **Asset Hosting** and set the base URI to `https://localhost:8001`.
3. Enable the **Panel** view. Set the viewer panel path to `/panel.html`; if Twitch provides a separate broadcaster path, set it to `/panel.html` too.
4. Set the **Configuration View** path to `/config.html`.
5. Save the settings and open the extension using Twitch's testing tools as both broadcaster and viewer.

The local preview message appears when the page is opened outside Twitch. Role detection works when Twitch loads the panel in its extension context.

On the channel, open the extension's configuration page and click **Save and finish setup**. This stores an empty broadcaster configuration through the Twitch Extension Helper; no extension secret or backend is needed.
