global.m = require('mithril');
const mq = require("mithril-query");
const test = require("ospec");

test.spec('#1 - Die Komponente', () => {
    const NotificationView = require('../test/notification.m.js').Notification;
    const state = { show: true };

    const Success = mq(m(NotificationView, {
        toggle: () => (state.show = false),
        text: 'Erfolgreich gespeichert!',
        status: 'success',
    }));
    const Failure = mq(m(NotificationView, {
        toggle: () => (state.show = false),
        text: 'Vorgang konnte nicht durchgeführt werden!',
        status: 'error',
    }));
    const Info = mq(m(NotificationView, {
        toggle: () => (state.show = false),
        text: 'Ich bin ein Bibabutzemann!',
    }));

    test('sollte "success" wie erwartet rendern', () => {
        test(Success.should.have('.fas.fa-check')).equals(true);
        test(Success.should.have('.notification.notification--success')).equals(true);
        test(Success.should.not.have('.notification.notification--error')).equals(true);
        test(Success.should.contain('Erfolgreich gespeichert!')).equals(true);
    });
    test('sollte "error" wie erwartet rendern', () => {
        test(Failure.should.have('.fas.fa-exclamation-triangle')).equals(true);
        test(Failure.should.have('.notification.notification--error')).equals(true);
        test(Failure.should.not.have('.notification.notification--success')).equals(true);
        test(Failure.should.contain('Vorgang konnte nicht durchgeführt werden!')).equals(true);
    });
    test('sollte ohne Statusangabe eine Info rendern', () => {
        test(Info.should.have('.fas.fa-info-circle')).equals(true);
        test(Info.should.have('.notification.notification--info')).equals(true);
        test(Info.should.contain('Ich bin ein Bibabutzemann!')).equals(true);
    });
});

test.spec('#2 - Die Komponente', () => {
    const NotificationView = require('../test/notification.m.js').Notification;
    const state = { show: true };

    test('sollte ohne Parameter "test" nicht renderbar sein', () => {
        let error = null;
        try {
            mq(m(NotificationView, {
                toggle: () => (state.show = false),
            }));
        } catch(e) {
            error = e;
        }
        test(error).notEquals(null)
    });

    test('sollte ohne "toggle()"-Funktion nicht renderbar sein', () => {
        let error = null;
        try { mq(m(NotificationView, { text: 'Ich bin ein Bibabutzemann!' })); }
        catch(e) { error = e; }
        test(error).notEquals(null)
    });
});

test.spec('#3 - Die Liste', () => {
    const notifications = new Set([
        { text: "Note 1", status: "success" },
        { text: "Note 2", status: "error" },
        { text: "Note 3", status: "success"}
    ]);
    const NotificationsView = require('../test/notification.m.js').Notifications;
    const Notes = mq(m(NotificationsView, { list: notifications }));

    test('sollte alles durchrendern', () => {
        test(Notes.should.have('.notification--error')).equals(true);
        test(Notes.should.have('.notification--success')).equals(true);
        test(Notes.should.contain('Note 1')).equals(true);
        test(Notes.should.contain('Note 2')).equals(true);
        test(Notes.should.contain('Note 3')).equals(true);
    });
});