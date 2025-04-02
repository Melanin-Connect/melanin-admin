// app/layout.tsx
import './globals.css';
import Sidebar from './components/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage blogs and subscriptions efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen flex">
          {/* Sidebar Component */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
