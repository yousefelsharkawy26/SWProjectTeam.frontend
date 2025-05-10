
export type UserRole = 'admin' | 'dentist' | 'staff' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface Patient {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  insuranceProvider?: string;
  insuranceId?: string;
  medicalHistory?: string;
  allergies?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Dentist {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
  phone: string;
  email: string;
  availability?: Record<string, string[]>;
}

export interface Appointment {
  id: string;
  patientId: string;
  dentistId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  treatmentType: string;
  notes?: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  dentistId: string;
  appointmentId: string;
  treatmentType: string;
  description: string;
  startDate: string;
  endDate?: string;
  cost: number;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  date: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  items: {
    treatmentId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod?: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minimumLevel: number;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
  notes?: string;
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  date: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export interface Follower {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  isFollowing: boolean;
}
