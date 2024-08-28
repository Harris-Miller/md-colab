import MonacoEditor from '@monaco-editor/react';
import { debounce } from '@mui/material';
import type { editor } from 'monaco-editor';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { IndexeddbPersistence } from 'y-indexeddb';
import { MonacoBinding } from 'y-monaco';
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

export const Editor: FC = () => {
  const yDoc = useMemo(() => new Y.Doc(), []);
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(null);
  const [provider, setProvider] = useState<IndexeddbPersistence | null>(null);
  const [binding, setBinding] = useState<MonacoBinding | null>(null);

  // this effect manages the lifetime of the Yjs document and the provider
  useEffect(() => {
    const instance = new IndexeddbPersistence('demo', yDoc);

    setProvider(instance);

    return () => {
      instance.destroy();
      yDoc.destroy();
    };
  }, [yDoc]);

  // this effect manages the lifetime of the editor binding
  useEffect(() => {
    if (provider == null || editor == null) {
      return () => {
        // no-op
      };
    }

    console.log('reached', provider);

    const instance = new MonacoBinding(yDoc.getText(), editor.getModel()!, new Set([editor]));
    setBinding(instance);

    return () => {
      instance.destroy();
    };
  }, [yDoc, provider, editor]);

  return (
    <MonacoEditor
      height="90vh"
      defaultValue="// some comment"
      defaultLanguage="javascript"
      onMount={e => {
        setEditor(e);
      }}
      theme="vs-dark"
    />
  );
};
