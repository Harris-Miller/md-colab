import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    meta: {
      // <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },
  plugins: [pluginReact()],
});
