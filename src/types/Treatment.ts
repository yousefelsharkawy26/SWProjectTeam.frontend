export interface ITreatment {
  id: number;
  patientName: string;
  patientId: number;
  dentistName: string;
  treatmentType: string;
  startDate: Date;
  endDate: Date;
  cost: number;
  status: string;
  sessions: ISession[];
  notes: string;
}

export interface ISession {
  id: number;
  date: Date;
  notes: string;
  completed: boolean;
}
