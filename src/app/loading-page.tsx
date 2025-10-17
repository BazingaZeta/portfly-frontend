import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="flex items-center gap-4 mb-8">
        <Image src="/globe.svg" alt="Portfly Logo" width={60} height={60} />
        <h1 className="text-5xl font-bold">Portfly</h1>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-30 w-30 border-t-4 border-b-4 border-blue-500" />
        <p className="absolute text-l font-semibold">Loading...</p>
      </div>
    </div>
  );
}
