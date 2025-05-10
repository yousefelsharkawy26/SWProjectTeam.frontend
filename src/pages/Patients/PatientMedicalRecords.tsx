import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MedicalRecord } from "@/types/patients";
import { FileImage, FileText, FileAudio } from "lucide-react";

interface PatientMedicalRecordsProps {
  medicalRecords: MedicalRecord[];
  onAddRecordClick: () => void;
}

export function PatientMedicalRecords({
  medicalRecords,
  onAddRecordClick,
}: PatientMedicalRecordsProps) {
  const getRecordIcon = (type: string) => {
    switch (type) {
      case "scan":
        return <FileImage className="h-5 w-5 text-medical-blue" />;
      case "examination":
        return <FileAudio className="h-5 w-5 text-medical-blue" />;
      default:
        return <FileText className="h-5 w-5 text-medical-blue" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-medium">Medical Records</h2>
      </CardHeader>
      <CardContent>
        {medicalRecords.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              No medical records found for this patient.
            </p>
            <Button onClick={onAddRecordClick}>
              Add First Medical Record
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {medicalRecords.map((record, index) => (
              <div key={record.id}>
                <div className="flex items-start justify-between py-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getRecordIcon(record.type)}</div>
                    <div>
                      <h3 className="font-medium">{record.title}</h3>
                      <p className="text-sm text-gray-500">
                        Doctor: {record.doctor}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-2">{record.description}</p>
                      {record.fileName && (
                        <p className="text-sm text-medical-blue mt-1">
                          File: {record.fileName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {index < medicalRecords.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
