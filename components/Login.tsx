import React, { useState } from 'react';
import Logo from './Logo';
import type { Theme } from '../App';
import { auth } from '@/src/firebaseConfig';
// FIX: Replaced AuthError with FirebaseError for proper error handling with modern Firebase SDKs.
// FIX: The `FirebaseError` type is exported from `firebase/app`, not `firebase/auth`.
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Assume light for login page or detect, but keep it simple as theme is not yet in state
  const theme: Theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // On successful login, the onAuthStateChanged listener in App.tsx will handle the redirect.
    } catch (err) {
        // FIX: Casting to FirebaseError to correctly access the 'code' property for error handling.
        const error = err as FirebaseError;
        switch (error.code) {
            case 'auth/invalid-email':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                setError('Invalid email or password.');
                break;
            default:
                setError('An unexpected error occurred. Please try again.');
                break;
        }
        setPassword('');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200 font-sans p-4 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-slate-300/70 dark:border-gray-700/70 backdrop-blur-sm">
        <div className="text-center">
            <Logo className="h-12 mx-auto" showSuite={true} theme={theme} />
            <p className="mt-2 text-slate-500 dark:text-slate-400">Please sign in to continue</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full mt-1 p-3 bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full mt-1 p-3 bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors font-bold text-lg text-white disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Unlocking...' : 'Unlock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;