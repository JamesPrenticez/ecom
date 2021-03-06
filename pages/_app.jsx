import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { useStore } from '../redux/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <Toaster />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}