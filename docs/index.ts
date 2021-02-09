import Notification from './notification.demo';
import m from 'mithril';

const Root: m.Component<{}> = {
    view() {
        return m(Notification);
    },
};

const container = document.querySelector('.example-app');
container && m.mount(container, Root);