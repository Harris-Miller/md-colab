import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { App } from './App';
import { ThemeWrapper } from './components/ThemeWrapper';

import './socket';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ThemeWrapper>
      <CssBaseline />
      <App />
    </ThemeWrapper>
  </StrictMode>,
);
