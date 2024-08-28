import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { debounce } from '@mui/material';
import { $getRoot, $getSelection } from 'lexical';
import type { ComponentProps, FC } from 'react';
import { useEffect } from 'react';
import * as Y from 'yjs';

type Document = {
  body: string;
  id: number;
  name: string;
};

type Temp = {
  data: string;
};

const persistToDb = debounce((md: string) => {
  console.log('persisting to db');
  console.log(md);
  // fetch('/api', {
  //   body: JSON.stringify({ data: md }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   method: 'POST',
  // });
}, 500);

const theme = {
  // Theme styling goes here
  // ...
};

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
const onChange: ComponentProps<typeof OnChangePlugin>['onChange'] = (editorState, editor, tags) => {
  console.log(editorState, editor, tags);
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot().getLatest();
    const selection = $getSelection();

    console.log(root, selection);
  });
};

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
const MyCustomAutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
const onError: ComponentProps<typeof LexicalComposer>['initialConfig']['onError'] = error => {
  console.error(error);
};

export const Editor: FC = () => {
  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
    namespace: 'MyEditor',
    onError,
    theme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
};
