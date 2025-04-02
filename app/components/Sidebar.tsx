import Link from "next/link";
import { Home, List, Plus, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <Home /> Dashboard
        </Link>
        <Link href="/add-blog" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <Plus /> Add Blog
        </Link>
        <Link href="/blog-list" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <List /> Blog List
        </Link>
        <Link href="/subscription" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <Users /> Subscriptions
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
