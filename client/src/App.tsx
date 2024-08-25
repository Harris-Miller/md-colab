import { AppWrapper } from './components/AppWrapper';
import { Editor } from './components/Editor';

export const App = () => {
  return (
    <AppWrapper>
      <div className="content">
        <h1>Rsbuild with React</h1>
        <p>Start building amazing things with Rsbuild.</p>
      </div>
      <Editor />
    </AppWrapper>
  );
};
