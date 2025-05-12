export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date | undefined;
  gender: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  medicalHistory: string;
  allergies: string[];
  imageUrl: string;
  lastVisit: string;
  nextAppointment: string;
  status: string;
  startTime: string;
  endTime: string;
  createdAt: Date | undefined;
}

export interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  avatar: string;
  lastVisit: string;
  createdAt: string;
}


export interface Appointment {
  id: string;
  patientId: string;
  title: string;
  dentistName: string;
  date: string;
  type: any;
  notes?: string;
  completed: boolean;
}

export interface MedicationItem {
  id: string;
  patientId: string;
  title: string;
  schedule: string;
  dosage: string;
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  title: string;
  type: any;
  description: string;
  doctor: string;
  createdAt: string;
}

