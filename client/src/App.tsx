import Documents from '@/pages/Documents';
import DocumentsLayout from '@/pages/DocumentsLayout';
import SingleDocument from './pages/SingleDocument.tsx';
// import SingleDocument from '@/pages/SingleDocument';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import HomePage from '@/pages/HomePage';
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react';
import Login from '@/pages/Login';
import FullScreenLoader from '@/components/Auth/FullScreenLoader';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <NuqsAdapter>
        {/* Auth Loading State */}
        <AuthLoading>
          <FullScreenLoader label='Auth Loading...' />
        </AuthLoading>

        {/* Authenticated Users can access below routes */}
        <Authenticated>
          <Toaster />
          <Routes>
            {/* Authentication required */}
            <Route path='/' element={<HomePage />} />

            {/* prettier-ignore */}
            <Route path="documents" element={<DocumentsLayout/>}>
            <Route index element={<Documents />} />
            <Route path=":id" element={<SingleDocument />} />
            </Route>
          </Routes>
        </Authenticated>

        {/* Unauthenticated Users sent to Login page */}
        <Unauthenticated>
          <Routes>
            <Route path='*' element={<Login />} />
          </Routes>
        </Unauthenticated>
      </NuqsAdapter>
    </BrowserRouter>
  );
}

export default App;
