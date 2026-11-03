# VueQuintable – Maintainer-Handbuch (intern)

Wie man entwickelt, testet und Releases für v2 und v3 baut. Für Nutzer der Library ist die [README](README.md) da.

> Das Repo ist öffentlich auf GitHub. Keine Tokens, Passwörter oder Kundendaten in diese Datei schreiben.

## Überblick

| Linie | Branch    | Vue | Bootstrap | npm dist-tag | Build-Configs |
|-------|-----------|-----|-----------|--------------|---------------|
| v3    | `v3.0.0`  | 3.x | 5.x       | `latest`     | `vite.config.ts`, `vite.pack.config.ts`, `vite.build.config.ts` |
| v2    | `master`  | 2.7 | 5.x       | `v2-lts`     | `vite.build.config.js`, `vite.pack.config.js` |

- `master` ist der Default-Branch auf GitHub, enthält aber **v2**.
- Paket: [`@sensetence/vue-quintable`](https://www.npmjs.com/package/@sensetence/vue-quintable). Aktuelle Tags: `npm view @sensetence/vue-quintable dist-tags`.
- `dist/` ist **eingecheckt** und wird so veröffentlicht. Ins npm-Paket kommen nur `dist/`, `package.json` und `README.md` (`files` in `package.json`).

## Voraussetzungen

- Node 22 LTS (v3 braucht wegen Vite 7 mindestens Node 20.19). v2 läuft auch damit.
- yarn 1 (classic). `npm install` ist absichtlich gesperrt (`engines.npm` + `engine-strict` in `.npmrc`).
- Für Releases: npm-Login mit Publish-Rechten am Paket (`npm login`, Kontrolle: `npm whoami`, `npm owner ls @sensetence/vue-quintable`).
- Für E2E-Tests einmalig: `npx playwright install chromium`.

```shell
yarn install
```

## Dev-Server

Startet die Demo mit allen Beispielen aus `src/examples` (Einstieg `src/app.vue`).

| Linie | Befehl     | URL |
|-------|------------|-----|
| v3    | `yarn dev` | http://localhost:5173 |
| v2    | `yarn dev` | https://localhost:5173 (selbstsigniertes Zertifikat, Warnung im Browser bestätigen) |

`make dev` (nur v3) formatiert und lintet vorher.

## Tests, Lint, Format

```shell
yarn test           # Unit-Tests (vitest, tests/)
yarn test:watch     # vitest im Watch-Modus
yarn test:e2e       # Playwright (e2e/), startet den Dev-Server selbst
npx eslint          # Lint
make format         # prettier über src/ (v3)
make lint           # format + eslint (v3)
```

v2 hat dafür statt Make-Targets `run-eslint.sh`, `run-build.sh`, `run-pack.sh`, `run-start.sh`.

## Builds

| Zweck              | Befehl            | Ausgabe  |
|--------------------|-------------------|----------|
| Library (Release)  | `yarn prod`       | fragt nach dem Zielordner, **Enter = `dist/`** |
| Library ohne Frage | `yarn prod-local` | `dist/`  |
| Demo-Seite         | `yarn build`      | `built/` |

`make pack` (v3) = format + eslint + `yarn prod`.

## Demo-Seite deployen

Die Demo unter https://sensetence.com/vue-quintable-demo/ wird von Hand hochgeladen:

1. Im Branch der Linie, die online gehen soll: `yarn build`.
   Auf v3 bricht `yarn build` derzeit in `vue-tsc` ab (siehe [Stolpersteine](#stolpersteine)). Bis das behoben ist, ohne Typprüfung bauen: `npx vite build --config vite.build.config.ts`.
2. Den **Inhalt** von `built/` per FTP in das Verzeichnis der Demo hochladen. Die Asset-Pfade sind relativ (`base: ""`), der Unterordner funktioniert also ohne Anpassung.
3. Erst die Assets hochladen, `index.html` zuletzt. Sonst verweist die Seite während des Uploads auf Dateien, die noch fehlen.
4. Die Asset-Dateinamen enthalten Hashes, alte Dateien bleiben deshalb liegen. Ab und zu aufräumen.

FTP-Zugangsdaten nicht im Repo ablegen.

## Release v3 (`latest`)

1. Branch aktualisieren:
   ```shell
   git checkout v3.0.0 && git pull
   yarn install --frozen-lockfile
   ```
2. Tests: `yarn test` (und möglichst `yarn test:e2e`).
3. Version in `package.json` von Hand setzen (SemVer: Bugfix = Patch, neue Option = Minor, Breaking Change = Major).
   `yarn publish` und `npm version` nicht nehmen: Sie legen eigene Commits und Tags mit `v`-Präfix an, bisherige Tags haben keins (`2.4.1`).
4. Library bauen: `make pack` bzw. `yarn prod`, Enter für `dist/`.
5. Prüfen:
   ```shell
   git status                 # dist/ muss geändert sein
   npm publish --dry-run      # Inhalt, Version und "tag latest" kontrollieren
   ```
6. Committen, taggen, pushen:
   ```shell
   git add package.json dist
   git commit -m "release: 3.x.y"
   git tag 3.x.y
   git push && git push origin 3.x.y
   ```
7. Veröffentlichen und kontrollieren:
   ```shell
   npm publish
   npm view @sensetence/vue-quintable dist-tags   # latest = 3.x.y
   ```

Vorabversionen (`3.2.0-beta.1`) immer mit eigenem Tag veröffentlichen: `npm publish --tag next`. Sonst landen sie auf `latest`.

## Release v2 (`v2-lts`)

Wie v3, aber auf `master` und mit **anderem dist-tag**:

1. `git checkout master && git pull && yarn install --frozen-lockfile`
2. `yarn test`
3. Version in `package.json` setzen (2.x.y) und Eintrag in `CHANGELOG.md` ergänzen.
4. `yarn prod`, Enter für `dist/`.
5. `npm publish --dry-run --tag v2-lts`: In der letzten Zeile muss `with tag v2-lts` stehen.
6. Commit `release: 2.x.y`, `git tag 2.x.y`, pushen.
7. Veröffentlichen:
   ```shell
   npm publish --tag v2-lts
   npm view @sensetence/vue-quintable dist-tags   # latest muss weiter 3.x sein!
   ```

> **Wichtig:** Ohne `--tag v2-lts` wird die v2-Version `latest`. Dann bekommt jeder mit `yarn add @sensetence/vue-quintable` die Vue-2-Version.

## Fixes für beide Linien

Ein Fix, der v2 und v3 betrifft, kommt in beide Branches, z. B. `fix: drop restored filters before ajax request` (`9c7c2cc` auf `master`, `405f698` auf `v3.0.0`). `git cherry-pick` klappt selten, weil sich der Code stark unterscheidet:

| | v3 | v2 |
|-|----|----|
| Komponente | `src/components/table/vue-quintable.vue` (eine Datei) | `src/components/VueQuintable.vue` + `src/mixins/*.mixin.js` |

Also meist von Hand portieren und in beiden Linien je ein Release machen.

## Wenn ein Release schiefgeht

- **Falscher `latest`-Tag** (z. B. v2 ohne `--tag` veröffentlicht):
  ```shell
  npm dist-tag add @sensetence/vue-quintable@<letzte 3.x> latest
  npm dist-tag add @sensetence/vue-quintable@<die 2.x> v2-lts
  ```
- **Kaputte Version:** neue Patch-Version nachschieben und die kaputte markieren:
  `npm deprecate @sensetence/vue-quintable@3.x.y "broken, use 3.x.z"`.
  `npm unpublish` geht nur in den ersten 72 Stunden, und die Versionsnummer bleibt danach für immer gesperrt.

## Stolpersteine

- **`dist/` vergessen:** Code-Änderungen landen erst nach `yarn prod` im Paket. Vor jedem Publish bauen, sonst geht der alte Build raus.
- **Font Awesome (v3):** `@fortawesome/fontawesome-svg-core` und `@fortawesome/free-solid-svg-icons` sind Peer-Dependencies (`^6.7.2 || ^7`) und im Build als external gesetzt (`vite.pack.config.ts`). So teilen sich App und Tabelle dieselbe Icon-Library. Neue Laufzeit-Abhängigkeiten in `dependencies` werden automatisch external.
- **E2E auf v3:** `playwright.config.js` erwartet `https://localhost:5173`, der v3-Dev-Server läuft aber auf `http`. `yarn test:e2e` wartet dann vergeblich auf den Server (URL anpassen oder SSL im Dev-Server aktivieren).
- **`yarn build` auf v3** bricht in `vue-tsc` ab (Typfehler in `vite.pack.config.ts`). Der Library-Build (`yarn prod`) ist davon nicht betroffen.
- **`*.tgz`** aus `yarn pack`/`npm pack` nicht committen.
