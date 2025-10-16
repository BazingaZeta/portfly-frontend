import Link from "next/link";

const ConeIcon = () => (
  <svg
    className="w-20 h-20 text-orange-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 1.5L3 21.5h18L12 1.5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 15.5h8"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 11.5h6"
    />
  </svg>
);

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-14">
      <div className="flex items-center gap-8 mb-8">
        <p className="text-8xl font-bold text-white">404</p>
      </div>
      <ConeIcon />
      <p className="text-4xl font-bold mb-4 pt-8">Page Under Construction</p>
      <p className="text-xl text-gray-300 mb-8 max-w-lg">
        Oops! It seems you&apos;ve stumbled upon a page that&apos;s still being
        built. Our team is hard at work on it!
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
