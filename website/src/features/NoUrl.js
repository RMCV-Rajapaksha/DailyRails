import { useLocation, Link } from "react-router-dom";

const NoUrl = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-4 bg-gray-100">
      <h1 className="font-extrabold text-gray-800 text-9xl">404</h1>
      <h2 className="mt-4 text-2xl font-medium">
        Oops! The page{" "}
        <span className="text-red-500">
          http://localhost:5173{location.pathname}
        </span>{" "}
        was not found.
      </h2>
      <p className="mt-2 text-gray-500">
        It looks like nothing was found at this location.
      </p>
      <Link
        to="/"
        className="px-4 py-2 mt-6 text-white transition bg-blue-600 rounded-md hover:bg-blue-500"
      >
        Back to Home
      </Link>
      <div className="mt-8 text-gray-400">
        <p>Error Code: 404 | Page Not Found</p>
      </div>
    </div>
  );
};

export default NoUrl;
