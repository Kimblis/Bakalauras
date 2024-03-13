import './scss/main.scss';
import { Outlet } from 'react-router-dom';
import { locale } from 'primereact/api';

import TrpcProvider from './TrpcProvider';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App: React.FC = () => {
  locale('en');

  return (
    <ErrorBoundary>
      <TrpcProvider>
        <div className="App">
          <Outlet />
        </div>
      </TrpcProvider>
    </ErrorBoundary>
  );
};

export default App;
