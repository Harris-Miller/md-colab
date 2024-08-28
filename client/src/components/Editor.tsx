import MonacoEditor from '@monaco-editor/react';
import { debounce, Typography } from '@mui/material';
import type { editor } from 'monaco-editor';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { MonacoBinding } from 'y-monaco';
import { Awareness } from 'y-protocols/awareness';
import { SocketIOProvider } from 'y-socket.io';
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
  const [provider, setProvider] = useState<SocketIOProvider | null>(null);
  const [binding, setBinding] = useState<MonacoBinding | null>(null);
  const [status, setStatus] = useState<string>('disconnected');
  const [clients, setClients] = useState<string[]>([]);

  // this effect manages the lifetime of the Yjs document and the provider
  useEffect(() => {
    console.log('connecting SocketIOProvider');
    const socketIOProvider = new SocketIOProvider('http://localhost:80/api', 'demo', yDoc, {
      autoConnect: true,
      awareness: new Awareness(yDoc),
      // disableBc: true,
      // auth: { token: 'valid-token' },
    });
    socketIOProvider.awareness.on('change', () => {
      setClients(Array.from(socketIOProvider.awareness.getStates().keys()).map(key => `${key}`));
    });
    socketIOProvider.awareness.setLocalState({ id: Math.random(), name: 'Perico' });
    socketIOProvider.on('sync', (isSync: boolean) => {
      console.log('websocket sync', isSync);
    });
    socketIOProvider.on('status', ({ status: _status }: { status: string }) => {
      console.log('socketIOProvider status change', status);
      if (_status) setStatus(_status);
    });

    setProvider(socketIOProvider);

    return () => {
      socketIOProvider.destroy();
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

    const instance = new MonacoBinding(yDoc.getText(), editor.getModel()!, new Set([editor]), provider.awareness);
    setBinding(instance);

    return () => {
      instance.destroy();
    };
  }, [yDoc, provider, editor]);

  return (
    <>
      <Typography>{status}</Typography>
      <MonacoEditor
        height="90vh"
        defaultValue="// some comment"
        defaultLanguage="javascript"
        onMount={e => {
          setEditor(e);
        }}
        theme="vs-dark"
      />
    </>
  );
};
