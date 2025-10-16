import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { SignInButton } from "./components/authButtons";
import Image from "next/image";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen font-sans bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-y-auto">
      <div className="container mx-auto px-8 py-8 h-full flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center gap-3">
          <Image src="/globe.svg" alt="Portfly Logo" width={40} height={40} />
          <span className="text-2xl font-bold">Portfly</span>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left">
            {/* Branding Content */}
            <div className="md:w-3/5 mb-12 md:mb-0">
              <h1 className="text-6xl font-extrabold tracking-tight mb-4">Welcome to Portfly</h1>
              <p className="text-2xl text-gray-300 max-w-xl mx-auto md:mx-0">
                The modern dashboard to track your investments and analyze the market with confidence.
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-sm w-full">
              <h2 className="text-4xl font-bold text-white mb-3">Get Started</h2>
              <p className="text-gray-300 mb-10">Sign in to access your dashboard.</p>
              <SignInButton className="inline-flex items-center justify-center gap-4 py-4 px-6 bg-blue-600 text-white text-lg font-semibold rounded-xl cursor-pointer transition-all hover:bg-blue-700 w-full shadow-md hover:shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
