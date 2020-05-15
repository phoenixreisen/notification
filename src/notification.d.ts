import {STATUS} from './notification.m';

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