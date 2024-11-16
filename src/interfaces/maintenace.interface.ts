export interface Maintenance {
  id?: string; // ID del mantenimiento
  type: string; // Tipo de mantenimiento
  date: string; // Fecha del mantenimiento
  mileage: number; // Kilometraje del vehículo
  notes: string; // Notas sobre el mantenimiento
}
