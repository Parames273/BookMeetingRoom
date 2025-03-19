import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import configStore from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/reusable/Loader.tsx';
const store = configStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store.store}>
      <PersistGate loading={<Loader />} persistor={store.persistor}>
      <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
