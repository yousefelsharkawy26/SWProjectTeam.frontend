import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientDetail } from "@/pages/Patients/PatientDetail";
import { AddMedicalRecordDialog } from "@/pages/Patients/AddMedicalRecordDialog";
import { PatientMedicalRecords } from "@/pages/Patients/PatientMedicalRecords";
import { ArrowLeft, FileText } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { usePatientData } from "@/hooks/usePatientData";
import NotFound from "../NotFound";
import { Skeleton } from "@/components/ui/skeleton";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const {
    patient,
    appointments,
    medications,
    medicalRecords,
    handleAddMedicalRecord,
    loading,
  } = usePatientData(id);
  const [dialogTriggerRef, setDialogTriggerRef] =
    useState<HTMLButtonElement | null>(null);

  // Show loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/patients">
                <Button variant="ghost" size="icon" className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Skeleton className="h-8 w-48" />
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-40 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!patient) {
    return <NotFound />;
  }

  const handleAddRecordButtonClick = () => {
    dialogTriggerRef?.click();
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/patients">
              <Button size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Patient Details</h1>
          </div>
          <AddMedicalRecordDialog
            patientId={patient.id}
            onAddRecord={handleAddMedicalRecord}
            ref={setDialogTriggerRef}
          />
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PatientDetail
              patient={patient}
              appointments={appointments}
              medications={medications}
              medicalRecords={medicalRecords}
            />
          </TabsContent>

          <TabsContent value="records">
            <PatientMedicalRecords
              medicalRecords={medicalRecords}
              onAddRecordClick={handleAddRecordButtonClick}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PatientProfile;
