const SHOWTIMER = 10100; // 100ms extra

export const NOTIFICATIONLIST = new Set();

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
        const { status, text } = attrs;

        return (
            <article class={`notification notification--${status || 'primary'}`}>
                <i class={`fas fa-${state.icon} mr2`}></i>
                {text}
            </article>
        );
    },
};