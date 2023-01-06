import './app.scss';
import { AuthProvider } from './Context/AuthProvider';
import Homepage from './Pages/Homepage/Homepage';
import '@stripe/stripe-js';

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
