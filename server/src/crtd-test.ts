/* eslint-disable no-console */
import * as Y from 'yjs';

const doc = new Y.Doc();

const bodyText = doc.getText('body');

bodyText.insert(0, 'World', { bold: true });
bodyText.insert(0, 'Hello ');

console.log(bodyText.toDelta());
