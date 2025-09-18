import React from "react"
import { Helmet } from "react-helmet-async"
import { useAuth } from "../contexts/AuthContext"

export const LoginForm: React.FC = () => {
  const { signIn, loading } = useAuth()

  return (
    <>
      <Helmet>
        <title>Sign In - UpAhead Task Manager</title>
        <meta
          name="description"
          content="Sign in to your UpAhead Task Manager account to start organizing your tasks efficiently."
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to UpAhead Task Manager
            </h1>
          </div>

          <button
            onClick={signIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
              fontSize: "14px",
              fontWeight: "500",
              letterSpacing: "0.25px",
              borderRadius: "4px",
              border: "1px solid #dadce0",
              backgroundColor: "#fff",
              color: "#3c4043",
              boxShadow: "none",
              transition:
                "background-color 0.218s, border-color 0.218s, box-shadow 0.218s",
            }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Secure authentication powered by Firebase
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
