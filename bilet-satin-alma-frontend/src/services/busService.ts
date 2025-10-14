import { BusTrip, Ticket } from '@/types/BusTrip';

// Mock biletler
const mockTickets: Ticket[] = [
    {
        id: 1,
        tripId: 1,
        from: "İstanbul",
        to: "Ankara",
        departureDate: "2025-10-09",
        departureTime: "10:00",
        arrivalTime: "16:00",
        busCompany: "Metro Turizm",
        seatNumber: 15,
        price: 400,
        passengerName: "Ahmet Yılmaz",
        passengerTC: "12345678901",
        purchaseDate: "2025-10-08"
    },
    {
        id: 2,
        tripId: 2,
        from: "İstanbul",
        to: "İzmir",
        departureDate: "2025-10-09",
        departureTime: "11:00",
        arrivalTime: "19:00",
        busCompany: "Kamil Koç",
        seatNumber: 8,
        price: 550,
        passengerName: "Ayşe Demir",
        passengerTC: "12345678902",
        purchaseDate: "2025-10-08"
    }
];

// Mock veri
const mockBusTrips: BusTrip[] = [
    {
        id: 1,
        from: "İstanbul",
        to: "Ankara",
        departureDate: "2025-10-09",
        departureTime: "10:00",
        arrivalTime: "16:00",
        busCompany: "Metro Turizm",
        price: 400,
        availableSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        busType: "2+1",
        features: ["Wifi", "USB", "TV", "Kahvaltı"]
    },
    {
        id: 2,
        from: "İstanbul",
        to: "İzmir",
        departureDate: "2025-10-09",
        departureTime: "11:00",
        arrivalTime: "19:00",
        busCompany: "Kamil Koç",
        price: 550,
        availableSeats: [1, 2, 3, 4, 5, 6, 7],
        busType: "2+2",
        features: ["Wifi", "USB", "TV", "İkram", "Öğle Yemeği"]
    },
    {
        id: 3,
        from: "Ankara",
        to: "İzmir",
        departureDate: "2025-10-09",
        departureTime: "09:00",
        arrivalTime: "17:00",
        busCompany: "Pamukkale",
        price: 500,
        availableSeats: [1, 2, 3, 4, 5],
        busType: "2+1",
        features: ["Wifi", "USB", "TV", "Kahvaltı", "Öğle Yemeği"]
    },
    {
        id: 4,
        from: "İstanbul",
        to: "Antalya",
        departureDate: "2025-10-09",
        departureTime: "21:00",
        arrivalTime: "07:00",
        busCompany: "Ulusoy",
        price: 600,
        availableSeats: [1, 2, 3, 4, 5, 6, 7, 8],
        busType: "2+1",
        features: ["Wifi", "USB", "TV", "Akşam Yemeği", "Kahvaltı", "Masajlı Koltuk"]
    },
    {
        id: 5,
        from: "İzmir",
        to: "İstanbul",
        departureDate: "2025-10-09",
        departureTime: "20:00",
        arrivalTime: "06:00",
        busCompany: "Metro Turizm",
        price: 450,
        availableSeats: [1, 2, 3, 4],
        busType: "2+1",
        features: ["Wifi", "USB", "TV", "Akşam Yemeği"]
    }
];

// Bu kısım başka bir yerde tanımlandı

// API fonksiyonları
export const getBusTrips = async (from?: string, to?: string, date?: string): Promise<BusTrip[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredTrips = [...mockBusTrips];
            
            if (from) {
                filteredTrips = filteredTrips.filter(trip => 
                    trip.from.toLowerCase().includes(from.toLowerCase())
                );
            }
            
            if (to) {
                filteredTrips = filteredTrips.filter(trip => 
                    trip.to.toLowerCase().includes(to.toLowerCase())
                );
            }
            
            if (date) {
                filteredTrips = filteredTrips.filter(trip => 
                    trip.departureDate === date
                );
            }
            
            resolve(filteredTrips);
        }, 500);
    });
};

export const getMyTickets = async (): Promise<Ticket[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockTickets);
        }, 500);
    });
};

export const purchaseTicket = async (
    tripId: number,
    seatNumber: number,
    passengerName: string,
    passengerTC: string
): Promise<Ticket> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const trip = mockBusTrips.find(t => t.id === tripId);
            
            if (!trip) {
                reject(new Error('Sefer bulunamadı'));
                return;
            }
            
            if (!trip.availableSeats.includes(seatNumber)) {
                reject(new Error('Seçilen koltuk müsait değil'));
                return;
            }
            
            const newTicket: Ticket = {
                id: mockTickets.length + 1,
                tripId,
                from: trip.from,
                to: trip.to,
                departureDate: trip.departureDate,
                departureTime: trip.departureTime,
                arrivalTime: trip.arrivalTime,
                busCompany: trip.busCompany,
                seatNumber,
                price: trip.price,
                passengerName,
                passengerTC,
                purchaseDate: new Date().toISOString().split('T')[0]
            };
            
            mockTickets.push(newTicket);
            resolve(newTicket);
        }, 500);
    });
};