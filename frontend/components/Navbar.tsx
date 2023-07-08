import Link from 'next/link';

const Navbar = () => {
  return (
    <header>
    <nav className="bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-white text-2xl font-bold">Clients Management</h1>
            </Link>
          </div>
          <div className="flex">
            <Link href="/Pages/HomePage">
              <h1 className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</h1>
            </Link>
            <Link href="/Pages/Dashboard">
              <h1 className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</h1>
            </Link>
            <Link href="/Pages/ListeClients">
              <h1 className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Clients</h1>
            </Link>
            <Link href="/Pages/AjouterClient">
              <h1 className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">New Client</h1>
            </Link>

       
          </div>
        </div>
      </div>
    </nav>
    </header>
  );
};

export default Navbar;
