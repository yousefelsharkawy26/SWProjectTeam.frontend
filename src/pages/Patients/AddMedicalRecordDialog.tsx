import React, { useState, forwardRef } from "react";
import { Button, UploadButton } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileImage, FileText, FileAudio } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { MedicalRecord } from "@/types/patients";
import DentistProvider from "@/context/DentistContext";
import axios from "axios";
import UserProvider from "@/context/UserContext";

interface AddMedicalRecordDialogProps {
  patientId: string;
  onAddRecord: (record: MedicalRecord) => void;
}

export const AddMedicalRecordDialog = forwardRef<
  HTMLButtonElement,
  AddMedicalRecordDialogProps
>(({ patientId, onAddRecord }, ref) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { token } = UserProvider.useUser();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("test");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [doctor, setDoctor] = useState("");
  const { dentists } = DentistProvider.useDentist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !type || !description || !doctor) {
      toast.error("Please fill in all required fields");
      return;
    }

    const data = new FormData();
    data.append('patientId', patientId);
    data.append('title', title);
    data.append('type', type);
    data.append('description', description);
    data.append('file', file);
    data.append('doctor', doctor);

    await axios
      .post(`${apiUrl}/api/patients/add-medical-examination`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      })
      .then(() => {
        toast.success(`${title} added successfully.`);
        setOpen(false);

        // Reset form
        setTitle("");
        setType("test");
        setDescription("");
        setFile(null);
        setDoctor("");
      })
      .catch((err) => {
        toast.error(`Something is wrong.`);
        console.error(err);
      });

    
  };

  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);
  };

  const getIcon = () => {
    switch (type) {
      case "scan":
        return <FileImage className="mr-2 h-4 w-4" />;
      case "examination":
        return <FileAudio className="mr-2 h-4 w-4" />;
      default:
        return <FileText className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button ref={ref} data-testid="add-record">
          <FileText className="mr-2 h-4 w-4" />
          Add Medical Record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Medical Record</DialogTitle>
            <DialogDescription>
              Add test results, scans, or medical examinations for this patient.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title*
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">
                Doctor*
              </Label>
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select dentist" />
                </SelectTrigger>
                <SelectContent>
                  {dentists?.map((dentist, i) => (
                    <SelectItem key={i} value={`${dentist?.id}`}>
                      {dentist?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type*
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test">Test Results</SelectItem>
                  <SelectItem value="scan">Scan/Image</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fileName" className="text-right">
                File
              </Label>
              <UploadButton handleChange={handleLoadFile}>
                {getIcon()} Upload
              </UploadButton>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description*
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              {getIcon()}
              Add Record
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

AddMedicalRecordDialog.displayName = "AddMedicalRecordDialog";
