import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Order } from '@/types';

export default function Order({ order }: { order: Order }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tableau de bord',
            href: '/dashboard',
        },
        {
            title: `Commande ${order.order_number}`,
            href: `/order/${order.id}`,
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Commande ${order.order_number}`} />

            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold">Détails de la commande {order.order_number}</h1>
                <p className="text-muted-foreground">Voici les détails de votre commande passée le {new Date(order.created_at).toLocaleDateString("fr-FR")}</p>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Billets commandés</h2>
                    <ul className="space-y-4">
                        {order.items.map((item, index) => (
                            <li key={index} className="flex gap-4 items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-16 bg-muted rounded flex items-center justify-center border">
                                        <img
                                            src={route('qr.item', item.id)}
                                            alt={`QR code for ${item.title}`}
                                            className="size-full object-contain"
                                        />
                                    </div>
                                    <div className="mb-auto">
                                        <h3 className="font-medium">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Commandé le {new Date(item.created_at).toLocaleDateString("fr-FR")}
                                        </p>
                                    </div>
                                </div>
                                <span>{item.price}€</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Total de la commande</span>
                            <span className="text-xl font-bold">{order.amount_total}€</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
