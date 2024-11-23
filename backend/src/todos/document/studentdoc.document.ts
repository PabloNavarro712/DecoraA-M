export class StudentDocDocument {
  static collectionName = 'StudentDocDocument';
  id: string;
  aspiranteId: string;
  name: string;
  lastName1: string;
  lastName2: string;
  email: string; // Asegúrate de tener esta propiedad
  curp: string; // Asegúrate de tener esta propiedad
  enrollmentPeriod: string;
  enrollmentStatus: boolean;
  convocatoriaId: string;
  Documents: {
    name: string;
    type: string;
    link: string;
    date: Date;
    status: 'approved' | 'rejected' | 'uploaded';
  }[];
  comments?: {
    id: string;
    comment: string;
    createdAt: Date;
    createdBy: string;
  }[];
  constructor(partial: Partial<StudentDocDocument>) {
    Object.assign(this, partial);
  }
}
