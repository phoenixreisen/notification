# Phoenix Status Notification

JS-/[Mithril](https://mithril.js.org/)-Komponente für die Darstellung von Status Notification.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Installation

[Mithril](https://mithril.js.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/notification
```

#### Mehrere Notifications rendern

Nach einem Benutzerereignis (z.B. Speichern oder Löschen) wird ein Notification-Objekt zum  `Set()` auszugebender Notifications hinzugefügt. Das `Set` ist von der aufrufenden View zu deklarieren und der `Notifications`-Komponente als
Parameter zu übergeben.

`Notifications` iteriert über die Liste und rendert entsprechend oft die `Notification`-Komponente mit den jeweiligen Objektdaten. Danach, nach ca. 5 Sekunden, ruft `Notification` die als Parameter übergebene `toggle()`-Funktion auf, die dafür sorgt, dass das jeweilige Notification-Objekt aus der Liste gelöscht wird.

Falls ein Benutzer potentiell mehrere Ereignisse hintereinander provozieren kann.

```js
const notifications = new Set();
const save = () => Promise.resolve('saved!');

const submit = () => {
    save().then(() => {
        notifications.add({
            status: 'success',
            text: 'Erfolgreich gespeichert!',
        });
    });
}

const ExampleView = {
    view() {
        // entweder ES6+
        <Notifications list={notifications} />;

        // oder Hyperscript
        m(Notifications, { list: notifications });
    }
};
```

#### Nur eine spezielle Notification rendern

```js
const ExampleView = {
    view() {

        showNotification &&
        <Notification
            status="success"
            text="Erfolgreich gespeichert!"
            toggle={() => (showNotification = false)}
        />

        showNotification &&
        m(Notification, {
            status: "success",
            text: "Erfolgreich gespeichert!"
            toggle: () => (showNotification = false)
        });
    }
}
```

## Test

```bash
npm install
npm test
```

## Deployment

Mit `npm publish` wird automatisch auch `npm test` aufgerufen.

```bash
npm version [major|minor|patch]     # increase version x.x.x => major.minor.patch
npm publish                         # upload to npm
git push
```