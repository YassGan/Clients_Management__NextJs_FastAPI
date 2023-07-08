import Link from 'next/link';

const RedirectButton = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <Link href="/Pages/HomePage">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to HomePage
        </button>
      </Link>
    </main>
  );
};

export default RedirectButton;
