import React from 'react';
import { User } from '../../types';

export function SettingsPanel() {
  const [user, setUser] = React.useState<User | null>(null);

  const handleGoogleSignIn = () => {
    // Simulate Google Sign-in
    setUser({
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User',
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">Account</h3>
        {user ? (
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Sign in with Google</span>
          </button>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded text-indigo-600" />
            <span>Enable real-time updates</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded text-indigo-600" />
            <span>Show column statistics</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">Theme</h3>
        <select className="w-full rounded-md border border-gray-300 px-3 py-2">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  );
}