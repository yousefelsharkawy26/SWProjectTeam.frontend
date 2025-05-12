import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Building,
  Bell,
  Lock,
  CreditCard,
  UsersRound,
} from "lucide-react";
import PersonalInfo from "./PersonalInfo";
import ClinicInfo from "./ClinicInfo";
import NotificationInfo from "./NotificationInfo";
import SecurityInfo from "./SecurityInfo";
import BillingInfo from "./BillingInfo";
import { useEffect, useState } from "react";
import UserProvider from "@/context/UserContext";

const Settings = () => {
  const context = UserProvider.useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(context.user);
  }, [context]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                <TabsTrigger value="profile" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" /> Profile
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start"
                >
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="w-full justify-start">
                  <Lock className="mr-2 h-4 w-4" /> Security
                </TabsTrigger>
                <TabsTrigger value="clinic" className="w-full justify-start">
                  <Building className="mr-2 h-4 w-4" /> Clinic Information
                </TabsTrigger>
                <TabsTrigger value="billing" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" /> Billing & Subscription
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <PersonalInfo />
              </TabsContent>

              <TabsContent value="clinic" className="mt-0">
                <ClinicInfo />
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <NotificationInfo />
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <SecurityInfo />
              </TabsContent>

              <TabsContent value="billing" className="mt-0">
                <BillingInfo />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
