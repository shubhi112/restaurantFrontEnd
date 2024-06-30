export interface MenuItem {
    name: string;
    desc: string;
    price: number;
}

export interface Restaurant {
    name: string;
    desc: string;
    location: string;
    ratings: number;
    timeToDeliver: string;
    deliveryFee: number;
    cuisine: string[];
    menu: MenuItem[];
    createdAt?: Date;
    updatedAt?: Date;
}