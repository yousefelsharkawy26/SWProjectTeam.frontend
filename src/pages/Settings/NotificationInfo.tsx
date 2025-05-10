import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const NotificationInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure how you receive notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Email Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailAppointments" className="flex-1">
                Appointment reminders
                <p className="text-sm font-normal text-gray-500">
                  Receive emails about upcoming appointments
                </p>
              </Label>
              <Switch id="emailAppointments" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailPatients" className="flex-1">
                New patient registrations
                <p className="text-sm font-normal text-gray-500">
                  Notifications when new patients register
                </p>
              </Label>
              <Switch id="emailPatients" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailReports" className="flex-1">
                Daily reports summary
                <p className="text-sm font-normal text-gray-500">
                  Receive daily report summaries via email
                </p>
              </Label>
              <Switch id="emailReports" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">SMS Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="smsAppointments" className="flex-1">
                Appointment alerts
                <p className="text-sm font-normal text-gray-500">
                  SMS reminders for upcoming appointments
                </p>
              </Label>
              <Switch id="smsAppointments" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsEmergency" className="flex-1">
                Emergency notifications
                <p className="text-sm font-normal text-gray-500">
                  Urgent alerts and emergency notifications
                </p>
              </Label>
              <Switch id="smsEmergency" defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationInfo;
