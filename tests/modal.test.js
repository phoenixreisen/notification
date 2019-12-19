global.m = require('mithril');
const mq = require("mithril-query");
const test = require("ospec");

test.spec('#1 - Das Modal', () => {
    const ModalView = require('../test/modal.view.js');
    const state = { show: true };
    const Modal = mq(m(ModalView, {
        title: "Test Modal",
        withCloseText: true,
        content: m('div', 'content'),
        footer: m('div', 'footer'),
        toggle: () => state.show = false,
    }));

    test('sollte sichtbar sein', () => {
        test(Modal.should.have('.modal.modal--visible')).equals(true);
        test(Modal.should.contain('Test Modal')).equals(true);
    });

    test('sollte bestimmte Gerüstklassen enthalten', () => {
        test(Modal.should.have('.modal__bg')).equals(true);
        test(Modal.should.have('.modal__header')).equals(true);
        test(Modal.should.have('.modal__content')).equals(true);
        test(Modal.should.have('.modal__footer')).equals(true);
    });

    test('sollte durch ein X wieder ausblendbar sein', () => {
        test(Modal.should.have('.modal__toggle')).equals(true);
        test(Modal.should.contain('schließen')).equals(true);
        Modal.click('.modal__toggle');
        test(state.show).equals(false);
    });

    test('sollte den übergebenen Content enthalten', () => {
        test(Modal.should.contain('content')).equals(true);
    })
    test('sollte den übergebenen Footer enthalten', () => {
        test(Modal.should.contain('footer')).equals(true);
    });
});

test.spec('#2 - Das Modal', () => {
    const ModalView = require('../test/modal.view.js');
    const Modal = mq(m(ModalView, {
        title: "Zweites Modal",
        content: m('div', 'content'),
    }));

    test('sollte nicht "schließen" enhalten', () => {
        test(Modal.should.not.contain('schließen')).equals(true);
    });
    test('sollte nicht über die Titelleiste togglebar sein', () => {
        test(Modal.should.not.have('.modal__toggle')).equals(true);
        test(Modal.should.have('.modal__headline')).equals(true);
        test(Modal.should.have('.modal__header')).equals(true);
    });
    test('sollte keinen Footer enthalten', () => {
        test(Modal.should.not.have('.modal__footer')).equals(true);
    });
    test('sollte den übergebenen Content enthalten', () => {
        test(Modal.should.have('.modal__content')).equals(true);
        test(Modal.should.contain('content')).equals(true);
    });
});

test.spec('#3 - Das Modal', () => {
    const ModalView = require('../test/modal.view.js');

    test('sollte ohne Content nicht aufrufbar sein', () => {
        let error = null;
        try {
            mq(m(ModalView, { title: "Zweites Modal" }));
        } catch(e) {
            error = e;
        }
        test(error).notEquals(null)
    });

    test('sollte mit einer unbekannte Größe nicht aufrufbar sein', () => {
        let error = null;
        let error2 = null;
        try {
            mq(m(ModalView, {
                size: 'modal--35-32',
                content: m('div', 'content'),
            }));
        } catch(e) {
            error = e;
        }
        try {
            mq(m(ModalView, {
                size: 's9090',
                content: m('div', 'content'),
            }));
        } catch(e) {
            error2 = e;
        }
        test(error).notEquals(null);
        test(error2).equals(null);
    });
});