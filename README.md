# Phoenix Modal

JS-/[Mithril](https://mithril.js.org/)-Komponente für das Phoenix Modal.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Installation

[Mithril](https://mithril.js.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/modal
```

## Anwendung

```js
// entweder CommonJS
const Modal = require('@phoenixreisen/modal');

// oder ES6+
import Modal from '@phoenixreisen/modal';
```

#### Aufruf

Das Modal selbst kümmert sich **nicht** um seinen Geöffnet-/Geschlossen-Status. Das muss außerhalb entschieden werden, indem eine Statusvariable dafür sorgt, ob das Modal gerendert wird oder nicht.

Wenn keine Größe angegeben ist, passt sich das Modal bis zu seiner `max-width` und `max-height` an seinen Content an. Folgende **fixe Größen für Tablets und Desktops** können aber auch festgelegt werden:

- s7590 - 75% breit, 90% hoch
- s9090 - 90% breit, 90% hoch
- s5050 - 50% breit, 50% hoch
- s5075 - 50% breit, 75% hoch

Auf Smartphones nimmt das Modal immer 90% der Breite ein und wird bis zu 90% hoch.

```js
// Hyperscript bzw. Javascript
m(Modal, {
    size: 's9090',                      // optional
    title: "Mein Modal",                // optional
    withCloseText: false,               // optional
    content: m('div', 'CONTENT'),       // pflicht
    footer: m('div', 'FOOTER'),         // optional
    toggle: () => state.show = false,   // optional
});

// JSX
<Modal title="Mein Modal" withCloseText={false}
    toggle={() => state.show = false}
    content={<div>CONTENT</div>}
    footer={<div>FOOTER</div>}>
</Modal>
```

## Test

```bash
npm install
npm run test
```

## Deployment

```bash
npm version [major|minor|patch]     # increase version x.x.x => major.minor.patch
npm publish                         # upload to npm
git push
```