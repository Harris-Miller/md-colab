import * as Y from 'yjs';

export const doc = new Y.Doc();

export const nameText = doc.getText('name');
export const bodyText = doc.getText('body');

bodyText.insert(0, '# Header 1');
