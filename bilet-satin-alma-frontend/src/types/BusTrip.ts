export interface BusTrip {
    id: number;
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
    id: number;
    tripId: number;
    from: string;
    to: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    busCompany: string;
    seatNumber: number;
    price: number;
    passengerName: string;
    passengerTC: string;
    purchaseDate: string;
}