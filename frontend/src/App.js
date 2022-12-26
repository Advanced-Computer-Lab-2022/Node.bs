import { dividerClasses } from '@mui/material';
import './app.scss';
import { AuthProvider } from './Context/AuthProvider';
import Homepage from './Pages/Homepage/Homepage';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Homepage />
      </AuthProvider>
    </div>
  );
}

export default App;
