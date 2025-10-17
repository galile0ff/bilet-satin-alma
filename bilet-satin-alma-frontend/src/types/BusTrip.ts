export interface BusTrip {
    id: string;
    from: string;
    to: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    busCompany: string;
    price: number;
    availableSeats: number[];
    busType: string; // "2+1" | "2+2"
    features: string[]; // ["Wifi", "USB", "TV", etc.]
}

export interface Ticket {
    id: string;
    trip_id: string;
    user_id: string;
    status: string;
    total_price: number;
    created_at: string;
    departure_city: string;
    destination_city: string;
    departure_time: string;
    arrival_time: string;
    company_name: string;
    seat_number: number;
}
