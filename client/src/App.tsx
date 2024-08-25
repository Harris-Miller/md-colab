import { AppWrapper } from './components/AppWrapper';
import { Editor } from './components/Editor';
import { socket } from './socket';

export const App = () => {
  const ping = () => {
    console.log('Pinging ws');
    socket.emit('message', 'ping');
  };

  return (
    <AppWrapper>
      <div className="content">
        <h1>Rsbuild with React</h1>
        <p>Start building amazing things with Rsbuild.</p>
      </div>
      <div>
        <button onClick={ping}>Socket Ping</button>
      </div>
      <Editor />
    </AppWrapper>
  );
};
