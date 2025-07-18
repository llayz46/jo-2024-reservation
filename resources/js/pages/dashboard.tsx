import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TicketOrder } from '@/components/TicketOrder';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
    },
];

const orders = [
    {
        id: "ORD-2024-001",
        date: "2024-01-15",
        status: "confirmed",
        total: 465,
        tickets: [
            { id: 1, title: "Pass Premium - Finale Natation", price: 150, quantity: 2 },
            { id: 2, title: "Pass Journée - Athlétisme", price: 85, quantity: 1 },
            { id: 4, title: "Pass VIP - Cérémonie d'ouverture", price: 350, quantity: 1 },
        ],
    },
    {
        id: "ORD-2024-002",
        date: "2024-01-10",
        status: "completed",
        total: 240,
        tickets: [{ id: 3, title: "Pass Famille - Gymnastique", price: 120, quantity: 2 }],
    },
    {
        id: "ORD-2024-003",
        date: "2024-01-08",
        status: "pending",
        total: 170,
        tickets: [{ id: 2, title: "Pass Journée - Athlétisme", price: 85, quantity: 2 }],
    },
    {
        id: "ORD-2024-004",
        date: "2024-01-05",
        status: "cancelled",
        total: 350,
        tickets: [{ id: 4, title: "Pass VIP - Cérémonie d'ouverture", price: 350, quantity: 1 }],
    },
    {
        id: "ORD-2024-005",
        date: "2024-01-02",
        status: "confirmed",
        total: 300,
        tickets: [{ id: 1, title: "Pass Premium - Finale Natation", price: 150, quantity: 2 }],
    },
]

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />

            <div className="p-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Mes commandes</h1>
                    <p className="text-muted-foreground">Gérez vos commandes de billets pour les Jeux Olympiques de Paris 2024</p>
                </div>

                <Card>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input placeholder="Rechercher par numéro de commande..." className="pl-10" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-sm text-muted-foreground">Total commandes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-green-600">3</div>
                            <p className="text-sm text-muted-foreground">Confirmées</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-yellow-600">1</div>
                            <p className="text-sm text-muted-foreground">En attente</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold">1,525€</div>
                            <p className="text-sm text-muted-foreground">Total dépensé</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <TicketOrder key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
