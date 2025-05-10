import { Stethoscope } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from './Login';
import Register from './Register';



const AuthMainLayout = () => {


  return (
    <div className="min-h-screen bg-dental-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-dental-light-blue/10 p-3 rounded-full mb-2">
              <Stethoscope className="h-8 w-8 text-dental-blue" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">DentalCare</h1>
            <p className="text-gray-500 text-sm">Clinic Management System</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="login" className="w-1/2">Login</TabsTrigger>
              <TabsTrigger value="register" className="w-1/2">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Login />
            </TabsContent>

            <TabsContent value="register">
              <Register />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <a href="#" className="hover:text-gray-700">Contact</a>
          </div>
          <p className="mt-4">© 2024 DentalCare. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthMainLayout;
