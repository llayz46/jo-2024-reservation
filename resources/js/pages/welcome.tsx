import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Trophy, Users, Ticket } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import BaseLayout from '@/layouts/base-layout';
import type { Ticket as TicketType } from '@/types';

export default function Welcome({ tickets }: { tickets: TicketType[] }) {
    return (
        <BaseLayout>
            <Head title="Accueil" />

            <div className="min-h-screen bg-background">
                <section className="relative py-20 md:py-32 overflow-hidden bg-background">
                    <div className="container mx-auto relative">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Badge className="bg-secondary text-secondary-foreground">26 Juillet - 11 Août 2024</Badge>
                                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                        Jeux Olympiques
                                        <span className="block text-primary">Paris 2024</span>
                                    </h1>
                                    <p className="text-xl text-muted-foreground max-w-lg">
                                        Vivez l'excellence sportive au cœur de Paris. Découvrez les plus grands athlètes du monde dans la
                                        Ville Lumière.
                                    </p>
                                </div>

                                <Button size="lg">
                                    <Ticket className="size-4" />
                                    Acheter des billets
                                </Button>

                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Paris, France</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4" />
                                        <span>10,000+ Athlètes</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Trophy className="w-4 h-4" />
                                        <span>32 Sports</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="hero-image-olympic-games.jpg"
                                    alt="Paris 2024 Olympics"
                                    width={800}
                                    height={600}
                                    className="rounded-md shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-muted/30 text-foreground" id="tickets">
                    <div className="container mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Offres de Billets</h2>
                            <p className="text-xl opacity-80 max-w-2xl mx-auto">
                                Réservez vos places pour vivre l'émotion des Jeux Olympiques de Paris 2024
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {tickets.map((ticket) => (
                                <Card key={ticket.id} className={cn("bg-card text-card-foreground shadow-sm", ticket.popular && "border border-yellow-400")}>
                                    <CardHeader>
                                        {ticket.popular ? (
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-2xl">{ticket.title}</CardTitle>
                                                <Badge className="bg-yellow-500 text-black">Populaire</Badge>
                                            </div>
                                        ) : (
                                            <CardTitle className="text-2xl">{ticket.title}</CardTitle>
                                        )}
                                        <CardDescription className="text-muted-foreground">{ticket.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-3xl font-bold">À partir de {ticket.price}€</div>
                                        <ul className="space-y-2 text-sm">
                                            {ticket.features.map((feature, idx) => (
                                                <li key={idx}>• {feature}</li>
                                            ))}
                                        </ul>
                                        <Link href={route('tickets.show', ticket.slug)} className={cn(buttonVariants(), "w-full")}>
                                            <Ticket className="size-4" />
                                            Réserver maintenant
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="bg-background py-12">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold">Paris 2024</span>
                                </div>
                                <p className="text-muted-foreground">Les Jeux Olympiques et Paralympiques de Paris 2024</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Navigation</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Actualités
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Sports
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Programme
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Billetterie</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Acheter des billets
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Offres spéciales
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Pass famille
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Accessibilité
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Contact</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Support
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Presse
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Partenaires
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground transition-colors">
                                            Mentions légales
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-muted mt-8 pt-8 text-center text-primary">
                            <p>&copy; 2024 Paris 2024. Tous droits réservés.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </BaseLayout>
    )
}
