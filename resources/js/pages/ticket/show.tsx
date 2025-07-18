import BaseLayout from '@/layouts/base-layout';
import { Head } from '@inertiajs/react';
import { Ticket } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Check } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Show({ ticket, tickets }: { ticket: Ticket, tickets: Ticket[] }) {
    console.log('tickets', tickets);
    return (
        <BaseLayout>
            <Head title={ticket.title} />

            <div className="container mx-auto py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-2">
                            <Badge className="bg-primary text-primary-foreground">{ticket.slug}</Badge>
                            <h1 className="text-3xl md:text-4xl font-bold">{ticket.title}</h1>
                            <p className="text-lg text-muted-foreground">{ticket.description}</p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Ce qui est inclus</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {ticket.features.map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-2">
                                            <Check className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-16">
                            <div className="mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">Autres offres disponibles</h2>
                                <p className="text-muted-foreground">Découvrez nos autres billets pour les Jeux Olympiques de Paris 2024</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {tickets.map((ticket) => (
                                    <Card key={ticket.id} className="hover:shadow-sm transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <CardTitle className="line-clamp-2">{ticket.title}</CardTitle>
                                                    <CardDescription className="line-clamp-2">{ticket.description}</CardDescription>
                                                </div>
                                                <Badge variant="outline">{ticket.slug}</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4 mt-auto">
                                            <div className="space-y-2">
                                                {ticket.features.map((feature, index) => (
                                                    <div key={index} className="flex items-start space-x-2">
                                                        <Check className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                                                        <span className="text-xs text-muted-foreground">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <Separator />

                                            <div className="flex items-center justify-between">
                                                <div className="text-xl font-bold">{ticket.price}€</div>
                                                <div className="flex space-x-2">
                                                    <Link href={route('tickets.show', ticket.slug)} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                                                        Voir
                                                    </Link>
                                                    <Button size="sm">
                                                        <ShoppingCart className="w-3 h-3" />
                                                        Ajouter
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    Ajouter au panier
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">{ticket.price}€</div>
                                    <p className="text-sm text-muted-foreground">par billet</p>
                                </div>

                                <div className="space-y-3">
                                    <Label>Quantité</Label>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm">
                                            -
                                        </Button>
                                        <Input type="number" value="1" className="text-center" min="1" max="8" />
                                        <Button variant="outline" size="sm">
                                            +
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Maximum 8 billets par commande</p>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>{ticket.price}€</span>
                                </div>

                                <Button className="w-full" size="lg">
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Ajouter au panier
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">Paiement sécurisé • Annulation gratuite</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}
