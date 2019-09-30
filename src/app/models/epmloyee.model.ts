export interface Employee {
    id: number;
    name: string;
    gender: string;
    email?: string;
    phone?: number;
    contactPreference: string;
    dateOfBirth: Date;
    department: string;
    isActive: boolean;
    photoPath?: string;
}
