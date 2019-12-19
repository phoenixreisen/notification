import Sizes from './modal.sizes';

let $body = null;

const Modal = {

    oninit(vnode) {
        const { attrs, children } = vnode;
        if(!attrs.content && !children.length) {
            throw 'Modal Content missing. Inject through "content" attribute/parameter or as children.';
        }
        if(attrs.size && !Sizes[attrs.size]) {
            throw 'Invalid modal size given. See Readme or modal.sizes.js for more information.'
        }
        document.addEventListener('keydown', (e) => {
            const { toggle } = attrs;
            if((e.keyCode === 27) && (typeof toggle === 'function')) {
                toggle();
                m.redraw();
            }
        });
    },

    oncreate() {
        $body = document.querySelector('body');
        if($body) {
            $body.style.overflow='hidden';
        }
    },

    onremove() {
        if($body) {
            $body.style.overflow='';
        }
    },

    view(v) {
        const { attrs } = v;
        const { content, footer } = attrs;
        const { toggle, title, size, withCloseText } = attrs;

        return ([
            <article class={`modal modal--visible ${size ? size:''}`}>
                <div class="modal__header">
                    <span class="modal__headline">
                        {title || ''}
                    </span>
                    {toggle &&
                        <a class="modal__toggle" href="javascript:" onclick={toggle}>
                            {withCloseText && <span class="desktop-only">schließen</span>}
                            <i class="fas fa-times-circle"></i>
                        </a>
                    }
                </div>

                <div class="modal__content">
                    { content || v.children }
                </div>

                {footer &&
                <div class="modal__footer tr">
                    {footer}
                </div>
                }
            </article>,
            <article class="modal__bg"></article>,
        ]);
    },
};

if(typeof module !== 'undefined') {
    module.exports = Modal;
}