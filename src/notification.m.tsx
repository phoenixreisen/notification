import m from 'mithril';

//--- Types -----

export interface NoteObject {
    text: string,
    status?: STATUS,
}

export interface NoteAttrs {
    text: string,
    status?: STATUS,
    toggle: () => void,
}

export interface NoteState {
    icon: string,
}

export interface NotesAttrs {
    list: Set<NoteObject>
}

//--- Variablen -----

// Zeit, bis die Meldung wieder ausgeblendet wird
// mit 100ms extra zur CSS Transition
const SHOWTIMER = 8100;

// Die Liste aller auszugebenden Notification-Objekte
export const notes = new Set<NoteObject>();

// Namen der FontAwesome Icons für versch. Stati
export const enum ICONS {
    check = 'check',
    info = 'info-circle',
    triangle = 'exclamation-triangle',
}

// Mögliche Stati
export const enum STATUS {
    error = 'error',
    success = 'success',
}

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
            Array.from(list).map((note: NoteObject) =>
                <NoteView
                    text={note.text}
                    status={note.status}
                    toggle={() => list.delete(note)}
                />
            ),
        ]);
    }
};

export default Notifications;