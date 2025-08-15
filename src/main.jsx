import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import CounterContextProvider from './Context/Counter.context.jsx'
import AuthContextProvider from './Context/Auth.context.jsx'
import ModeContextProvider from './Context/Mode.context.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />  
      <Toaster/>   
  <ModeContextProvider>
  <AuthContextProvider>
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
  </AuthContextProvider>
  </ModeContextProvider> 
  </QueryClientProvider>,
)
