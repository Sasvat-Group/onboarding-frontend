export interface SubscriberFormData {
    name: string;
    contact_firstName: string;
    contact_lastname: string;
    contact_email: string;
    contact_phone: string;
}
  
export interface SubscriberFormDataWithID extends SubscriberFormData {
    id: number;
}
