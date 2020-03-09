const SHOWTIMER = 8100; // 100ms extra

// Die Liste aller auszugebenden Notification-Objekte
export const notes = new Set();

// Ausgabe aller Notifications
export const Notifications = {
    view({attrs}) {
        const { list } = attrs;
        return (
            Array.from(list).map(note =>
                <Notification
                    text={note.text}
                    status={note.status}
                    toggle={() => list.delete(note)}
                />,
            )
        );
    },
};

// Ausgabe einer Notification
export const Notification = {
    oninit({state, attrs}) {
        if(!attrs.toggle || !attrs.text) {
            throw 'need at least toggle() and text!';
        }
        state.icon = (attrs.status === 'error')
            ? 'exclamation-triangle'
            : (attrs.status === 'success')
                ? 'check'
                : 'info-circle';
    },

    oncreate({attrs}) {
        const { toggle } = attrs;
        setTimeout(() => {
            toggle();
            m.redraw();
        }, SHOWTIMER);
    },

    view({state, attrs}) {
        const { status, text, toggle } = attrs;

        return (
            <article class={`notification notification--${status || 'primary'}`}>
                <i class={`fas fa-${state.icon}`}></i>
                <span>{text}</span>
                <a href="javascript:" class="fas fa-times" onclick={() => {
                    toggle();
                    m.redraw();
                }}></a>
            </article>
        );
    },
};