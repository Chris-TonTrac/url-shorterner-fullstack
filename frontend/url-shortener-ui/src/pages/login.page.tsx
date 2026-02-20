import React from 'react'
import { IoLinkSharp } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const Login = () => {
  const [activeTab, setActiveTab] = React.useState("login");
  
  return (
    <div className='min-h-screen bg-indigo-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <div className='flex items-center flex-col text-center mb-8'>
          <IoLinkSharp className='text-5xl text-blue-600' />
          <p className='text-3xl font-bold'>Welcome to ShortLinks</p>
          <p className='pt-3 text-gray-500'>Create an account or sign in to continue.</p>
        </div>

        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="relative">
            <TabsList className="relative grid w-full grid-cols-2 bg-muted p-1 rounded-full">
          
              {/* Sliding pill */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow"
                style={{
                  left: activeTab === "login" ? "4px" : "50%",
                }}
              />

              <TabsTrigger
                value="login"
                className="relative z-10 rounded-full"
              >
                Login
              </TabsTrigger>

              <TabsTrigger
                value="signup"
                className="relative z-10 rounded-full"
              >
                Sign Up
              </TabsTrigger>

            </TabsList>
          </div>

          <TabsContent value="login" className="mt-6 text-center">
            <div>Login Form Here</div>
          </TabsContent>

          <TabsContent value="signup" className="mt-6 text-center">
            <div>Signup Form Here</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Login