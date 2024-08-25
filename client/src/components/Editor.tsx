import '@mdxeditor/editor/style.css';

import { MDXEditor } from '@mdxeditor/editor';
import { debounce } from '@mui/material';
import { isNil } from 'ramda';
import { useCallback, useEffect, useState } from 'react';

import { ALL_PLUGINS } from './mdxPlugins';

type Document = {
  body: string;
  id: number;
  name: string;
};

const persistToDb = debounce((md: string) => {
  console.log('persisting to db');
  console.log(md);
  fetch('http://localhost:3001/', {
    body: JSON.stringify({ data: md }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}, 500);

export const Editor = () => {
  const [contents, setContents] = useState<string | null>(null);

  const updateMd = useCallback((md: string) => {
    persistToDb(md);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then((obj: Document) => {
        console.log(obj);
        setContents(obj.body);
      });
  }, []);

  if (isNil(contents)) {
    return <div>Loading...</div>;
  }

  return (
    <MDXEditor
      className="dark-theme dark-editor"
      markdown={contents}
      onChange={(md: string) => {
        console.log('change', { md });
        updateMd(md);
      }}
      plugins={ALL_PLUGINS}
    />
  );
};
