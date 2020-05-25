## Beispiel-Repository zum Artikel MyReact - Teil 3

Dieses Repository enthält die Weiterentwicklung des Beispieles aus Artikel 2. Dies umfasst die Einbindung von React Router sowie Firebase. Per Firebase erfolgt die Datenhaltung und die Nutzerverwaltung bzw. -authentifizierung, React Router verbindet die Hauptanwendung mit einer Registrierungs- bzw. Login-Seite.

### Überblick über Branches:

Die Branches des Repositories enthalten die verschiedenen Arbeitsstände in der Reihenfolge, wie sie im Artikel beschrieben sind.

#### master: Anwendungs-Grundgerüst, entspricht dem abschließenden Stand der Bookmarks-Applikation aus Teil 2
#### 01_ReactRouter,-Login--und-Registrierungsseite: Einführung von React Router, Erstellung der Login- und Registrierungsseite
#### 02_Nutzer-Funktionalitäten-in-Firebase,-Kontext-und-ein-eigener-Hook: Einbindung von Firebase-Authentifizierung, Nutzung des Kontext-Hooks, Implementierung eines eigenen useUser-Hooks
#### 03_Firebase-CloudStore-Service-anbindung: Einbindung der Funktionalitäten zur Datenhaltung im Firebase Cloud Store, Ablösung der Datenhaltung in Local Data Stor des Browsers
#### 04_Komponententest_Komponente_Bookmark: Ein JEST-basierter React-Komponententest für die Komponente <Bookmark> hinzugefügt

Die Branches können einzeln geklont werden und mit den folgenden Kommandos ausgeführt werden:

### `npm start`

Startet die App im Entwicklungsmodus.<br />
Um die Seite anzuschauen, [http://localhost:3000](http://localhost:3000) im Browser öffnen.

Die Seite lädt neu, wenn Änderungen am Quellcode vorgenommen werden.<br />
Fehler werden von ESLint auf der Konsole angezeigt.

### `npm run build`

Erstellt die Anwendung für ein produktives Deployment.

### Deployment per Vercel (ehemals zeit.co)

Den eigenen Quellcode oder den Inhalt des letzten Branches dieses Repositories in einem eigenen Github-Repository bereitstellen.<br/>
Unter https://vercel.com einen Accout erstellen und einloggen. Dort das Github-Repository binden und ohne eine zusätzliche Konfiguration
deployen.