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

interface AddMedicalRecordDialogProps {
  patientId: string;
  onAddRecord: (record: MedicalRecord) => void;
}

export const AddMedicalRecordDialog = forwardRef<
  HTMLButtonElement,
  AddMedicalRecordDialogProps
>(({ patientId, onAddRecord }, ref) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("test");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [doctor, setDoctor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !type || !description || !doctor) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newRecord: MedicalRecord = {
      id: `REC${Math.floor(Math.random() * 10000000)}`,
      patientId,
      title,
      type,
      description,
      fileName: fileName || "No file uploaded",
      doctor,
      createdAt: new Date().toISOString(),
    };

    onAddRecord(newRecord);
    toast.success("Medical record added successfully");
    setOpen(false);

    // Reset form
    setTitle("");
    setType("test");
    setDescription("");
    setFileName("");
    setDoctor("");
  };

  const handleLoadFile = (file) => {

  }

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
        <form onSubmit={handleSubmit}>
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
                  <SelectItem value="examination">
                    Medical Examination
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">
                Doctor*
              </Label>
              <UploadButton handleChange={handleLoadFile}>{getIcon()} Upload</UploadButton>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fileName" className="text-right">
                File
              </Label>
              <Input
                id="fileName"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="col-span-3"
                placeholder="File name (upload not functional in demo)"
              />
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
            <Button type="submit">
              {getIcon()}
              Add Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});

AddMedicalRecordDialog.displayName = "AddMedicalRecordDialog";
