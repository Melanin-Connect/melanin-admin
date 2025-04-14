// app/layout.tsx
import './globals.css';
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
      <body className="min-h-screen">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar Component */}
          
          {/* Main Content Area */}
          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}