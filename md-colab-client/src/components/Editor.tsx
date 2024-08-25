import '@mdxeditor/editor/style.css';

import { MDXEditor } from '@mdxeditor/editor';
import { isNil } from 'ramda';
import { useEffect, useState } from 'react';

import { ALL_PLUGINS } from './mdxPlugins';

type Document = {
  body: string;
  id: number;
  name: string;
};

export const Editor = () => {
  const [contents, setContents] = useState<string | null>(null);

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
      onChange={md => {
        console.log('change', { md });
      }}
      plugins={ALL_PLUGINS}
    />
  );
};
