import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import React, { useState } from "react";
import AddEditSessionDialog from "./AddEditSessionDialog";
import axios from "axios";
import UserProvider from "@/context/UserContext";
import { toast } from "sonner";

const SessionRow = ({ treatmentId, session, index, onSave }) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { token } = UserProvider.useUser();
  const [open, setOpen] = useState(false);

  const handleSession = () => {
    new Date(session.date) <= new Date()
      ? markCompleteSession()
      : setOpen(true);
  };

  const handleCancel = async () => {
    await axios
      .delete(`${apiUrl}/api/clinic/delete-session?sessionId=${session?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Session canceled.");
        onSave(true);
      })
      .catch((err) => {
        toast.error("Something is wrong please call service provider");
        console.error(err);
      });
  };

  const markCompleteSession = async () => {
    await axios
      .put(
        `${apiUrl}/api/clinic/complete-session?sessionId=${session.id}`,
        {
          completed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Session completed");
        onSave(true);
      })
      .catch((err) => {
        toast.success("Something is wrong please call service provider");
        console.error(err);
      });
  };

  return (
    <div
      className={`border p-4 rounded-md ${
        session.completed
          ? "bg-green-50 border-green-100"
          : "bg-white border-gray-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays
            className={`h-5 w-5 ${
              session.completed ? "text-green-600" : "text-gray-400"
            }`}
          />
          <div>
            <h4 className="font-medium">Session {index + 1}</h4>
            <p className="text-sm text-gray-500">{session.date}</p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={
            session.completed
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-gray-100 text-gray-800 border-gray-200"
          }
        >
          {session.completed ? "Completed" : "Scheduled"}
        </Badge>
      </div>

      <div className="mt-2 ml-8 text-sm">
        <p>{session.notes}</p>
      </div>

      {!session.completed && (
        <div className="mt-3 ml-8">
          <Button
            className="mr-2"
            variant="outline"
            size="sm"
            onClick={handleSession}
          >
            {new Date(session.date) <= new Date()
              ? "Mark as Complete"
              : "Update Session"}
          </Button>
          <Button onClick={handleCancel} variant="destructive" size="sm">
            Cancel Session
          </Button>
          <AddEditSessionDialog
            open={open}
            onOpenChange={setOpen}
            mode={false}
            treatmentId={treatmentId}
            onSave={onSave}
            defaultValue={session}
          />
        </div>
      )}
    </div>
  );
};

export default SessionRow;
