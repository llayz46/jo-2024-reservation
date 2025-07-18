import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Order } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TicketOrder } from '@/components/TicketOrder';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
    },
];

export default function Dashboard({ orders }: { orders: Order[] }) {
    const [search, setSearch] = useState<string>('');

    const total = orders.reduce((sum, order) => sum + order.amount_total, 0);
    const filteredOrders = orders.filter(order => order.order_number.toString().toLowerCase().includes(search.toLowerCase()))

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
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Rechercher par numéro de commande..."
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold">{orders.length}</div>
                            <p className="text-sm text-muted-foreground">Total commandes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold">{total}€</div>
                            <p className="text-sm text-muted-foreground">Total dépensé</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <TicketOrder key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
