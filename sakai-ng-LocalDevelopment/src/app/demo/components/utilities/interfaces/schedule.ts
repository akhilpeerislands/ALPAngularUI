export interface Schedule { 
    title: string; 
    appointmentType: string | undefined; 
    appointmentWith: string | undefined; 
    appointmentWithCRID: string | undefined; 
    btName: any; 
    btCRID: any; 
    timezone: any; 
    date: string; 
    startTime: string; 
    endTime: string; 
    supervisorName: any; 
    supervisorCRID: any; 
    supervisorEmail: any; 
    createdDate: Date; 
    updatedDate: Date; 
    recordedToBot: string; 
    requestedSupervisor: string | undefined; 
}
