import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Eye } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/types';
import { Link } from '@inertiajs/react';

export function TicketOrder({ order }: { order: Order }) {
    const groupedItems = Object.values(
        order.items.reduce((acc, item) => {
            if (!acc[item.ticket_id]) {
                acc[item.ticket_id] = { ...item, quantity: 0 };
            }
            acc[item.ticket_id].quantity += 1;
            return acc;
        }, {} as Record<number, Order['items'][number]>)
    );

    return (
        <Card className="hover:shadow-sm transition-shadow">
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                            Commande {order.order_number}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            {new Date(order.created_at).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('order', order.id)} className={buttonVariants({ variant: "outline", size: "sm" })}>
                            <Eye className="size-4" />
                            Voir détails
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Billets commandés</h4>
                    <div className="space-y-2">
                        {groupedItems.map((ticket, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                                <div className="flex-1">
                                    <Link href={route('tickets.show', ticket.ticket?.slug)} className="font-medium text-sm hover:underline">
                                        {ticket.title}
                                    </Link>
                                    <p className="text-xs text-muted-foreground">Quantité: {ticket.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{ticket.price * ticket.quantity}€</p>
                                    <p className="text-xs text-muted-foreground">
                                        {ticket.price}€ × {ticket.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                    <span className="font-semibold">Total de la commande</span>
                    <span className="text-xl font-bold">{order.amount_total}€</span>
                </div>
            </CardContent>
        </Card>
    )
}
