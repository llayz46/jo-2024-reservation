import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    private_key: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Ticket {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    popular: boolean;
    features: string[];
}

export interface CartItem {
    id: number;
    cart_id: number;
    ticket_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    ticket: Ticket;
}

export interface Cart {
    id: number;
    user_id?: User | null;
    session_id?: string | null;
    created_at: string;
    updated_at: string;
    items: CartItem[];
    total: number;
}

export interface Order {
    id: number;
    order_number: number;
    amount_total: number;
    user_id: number;
    user?: User;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    ticket_id: number;
    title: string;
    description: string;
    price: number;
    quantity: number;
    amount_total: number;
    ticket_key: string;
    qr_signature: string;
    created_at: string;
    updated_at: string;
    ticket?: Ticket;
}

export interface ScanResult {
    status: "valid" | "invalid" | "expired" | "used"
    user: {
        name: string
        email: string
    }
    ticket: {
        offer: string
        description: string
        price: number
        ticket_key: string
    }
    scanned_at: string
}
