import {NoteState, NoteAttrs, NotesAttrs, ICONS, STATUS} from './notification.types';
import m from 'mithril';

//--- Variablen -----

// Zeit, bis die Meldung wieder ausgeblendet wird
// mit 100ms extra zur CSS Transition
const SHOWTIMER = 8100;

// Die Liste aller auszugebenden Notification-Objekte
export const notes = new Set();


//--- Komponenten -----

// Ausgabe einer Notification
export const Notification: m.Component<NoteAttrs, NoteState> = {

    oninit({attrs, state}) {
        if(!attrs.toggle || !attrs.text) {
            throw 'need at least toggle() and text!';
        }
        state.icon = (attrs.status === STATUS.error)
            ? ICONS.triangle
            : (attrs.status === STATUS.success)
                ? ICONS.check
                : ICONS.info;
    },

    oncreate({attrs}) {
        const {toggle} = attrs;

        setTimeout(() => {
            toggle();
            m.redraw();
        }, SHOWTIMER);
    },

    view({attrs}) {
        const {status, text, toggle} = attrs;

        return (
            <article class={`notification notification--${status || 'primary'}`}>
                <i class={`fas fa-${this.icon}`}></i>
                <span>{text}</span>
                <a href="javascript:" class="fas fa-times" onclick={() => {
                    toggle();
                    m.redraw();
                }}></a>
            </article>
        );
    }
};

// Ausgabe aller Notifications
export const Notifications: m.Component<NotesAttrs> = {

    view({attrs}) {
        const {list} = attrs;
        const NoteView = Notification as any;

        return ([
            Array.from(list).map((note: any) =>
                <NoteView
                    text={note.text}
                    status={note.status}
                    toggle={() => list.delete(note)}
                />
            ),
        ]);
    }
};