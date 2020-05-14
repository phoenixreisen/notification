export const enum ICONS {
    check = 'check',
    info = 'info-circle',
    triangle = 'exclamation-triangle',
}

export const enum STATUS {
    success = 'success',
    error = 'error',
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
    list: Set<{text: string, status?: STATUS}>
}