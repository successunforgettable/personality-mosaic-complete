import { Link } from "wouter";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
              <span className="material-icons">psychology</span>
            </div>
            <h1 className="ml-3 text-xl font-display font-semibold text-gray-800">Personality Mosaic</h1>
          </a>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/about">
            <a className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">How it works</a>
          </Link>
          <Link href="/about">
            <a className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">About</a>
          </Link>
          <button className="px-4 py-2 bg-primary-100 text-primary-700 rounded-md text-sm font-medium hover:bg-primary-200 transition-all">Sign In</button>
        </div>
        <button className="md:hidden text-gray-500">
          <span className="material-icons">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
