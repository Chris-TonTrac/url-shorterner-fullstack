import React from "react"
import { IoLinkSharp } from "react-icons/io5"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const Login = () => {
  const [activeTab, setActiveTab] = React.useState("login")
  const [loginEmail, setLoginEmail] = React.useState("")
  const [loginPassword, setLoginPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(true)

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!loginEmail || !loginPassword) {
      setError("Please enter both email and password.")
      return
    }

    // TODO: Wire to API login endpoint.
    console.log({ loginEmail, loginPassword, rememberMe })
  }

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all signup fields.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    // TODO: Wire to API registration endpoint.
    console.log({ name, email, password })
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <IoLinkSharp className="text-5xl text-blue-600" />
          <p className="text-3xl font-bold">Welcome to ShortLinks</p>
          <p className="pt-3 text-gray-500">
            Create an account or sign in to continue.
          </p>
        </div>

        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="relative">
            <TabsList className="relative grid w-full grid-cols-2 rounded-full bg-gray-300 p-1">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow"
                style={{
                  left: activeTab === "login" ? "4px" : "50%",
                }}
              />

              <TabsTrigger value="login" className="relative z-10 rounded-full">
                Login
              </TabsTrigger>

              <TabsTrigger value="signup" className="relative z-10 rounded-full">
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="login" className="mt-6 text-center">
            <form
              onSubmit={handleLoginSubmit}
              className="space-y-4 rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="space-y-2 text-left">
                <label
                  htmlFor="login-email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 text-left">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label
                  htmlFor="remember-me"
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  Remember me
                </label>
                <Link to="#" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {error && activeTab === "login" ? (
                <p className="text-left text-sm text-red-600">{error}</p>
              ) : null}

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-6 text-center">
            <form
              onSubmit={handleRegisterSubmit}
              className="space-y-4 rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="space-y-2 text-left">
                <label
                  htmlFor="signup-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  id="signup-name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 text-left">
                <label
                  htmlFor="signup-email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 text-left">
                <label
                  htmlFor="signup-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="At least 8 characters"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 text-left">
                <label
                  htmlFor="signup-confirm-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && activeTab === "signup" ? (
                <p className="text-left text-sm text-red-600">{error}</p>
              ) : null}

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Login
