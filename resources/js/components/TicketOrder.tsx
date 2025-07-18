import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function TicketOrder({ order }) {
    return (
        <Card key={order.id} className="hover:shadow-sm transition-shadow">
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                            Commande {order.id}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            {new Date(order.date).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir détails
                        </Button>
                        {order.status === "confirmed" && (
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Billets commandés</h4>
                    <div className="space-y-2">
                        {order.tickets.map((ticket, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{ticket.title}</p>
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

                {/* Total */}
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Total de la commande</span>
                    <span className="text-xl font-bold">{order.total}€</span>
                </div>
            </CardContent>
        </Card>
    )
}
