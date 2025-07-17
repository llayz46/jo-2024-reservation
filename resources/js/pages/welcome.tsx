import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Trophy, Users, Ticket } from "lucide-react"
import { Head, Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';

const OFFERS = [
    {
        title: "Offre Solo",
        description: "Parfait pour vivre l’événement en solo, à son rythme.",
        price: "À partir de 45€",
        features: [
            "Accès à 3-5 épreuves",
            "Emplacement standard en tribune",
            "Transport inclus",
            "Guide officiel"
        ]
    },
    {
        title: "Offre Duo",
        description: "L’expérience olympique à deux, idéale pour partager un moment fort.",
        price: "À partir de 69€",
        features: [
            "Accès pour 2 personnes à la même épreuve",
            "Placement côte à côte garanti",
            "Restauration incluse",
            "Accès à une épreuve supplémentaire",
        ],
        popular: true
    },
    {
        title: "Offre Familiale",
        description: "Parfait pour toute la famille, jusqu’à 4 personnes incluses.",
        price: "À partir de 129€",
        features: [
            "Accès pour 4 personnes à la même épreuve",
            "Activités enfants",
            "Zone famille dédiée",
            "Réductions boutique"
        ]
    }
]

export default function Welcome() {
    return (
        <>
            <Head title="Accueil" />

            <div className="min-h-screen bg-background">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto flex h-16 items-center justify-between">
                        <Link href="/">
                            <AppLogoIcon className="size-8" />
                        </Link>
                        <nav className="hidden md:flex items-center">
                            <a href="#tickets" className={buttonVariants({ variant: 'link' })}>
                                Offres
                            </a>
                        </nav>
                        <Button>
                            <Ticket className="size-4" />
                            Billets
                        </Button>
                    </div>
                </header>

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
                            {OFFERS.map((offer, index) => (
                                <Card key={index} className={cn("bg-card text-card-foreground shadow-sm", offer.popular && "border border-yellow-400")}>
                                    <CardHeader>
                                        {offer.popular ? (
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-2xl">{offer.title}</CardTitle>
                                                <Badge className="bg-yellow-500 text-black">Populaire</Badge>
                                            </div>
                                        ) : (
                                            <CardTitle className="text-2xl">{offer.title}</CardTitle>
                                        )}
                                        <CardDescription className="text-muted-foreground">{offer.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-3xl font-bold">À partir de {offer.price}€</div>
                                        <ul className="space-y-2 text-sm">
                                            {offer.features.map((feature, idx) => (
                                                <li key={idx}>• {feature}</li>
                                            ))}
                                        </ul>
                                        <Button className="w-full">
                                            <Ticket className="size-4" />
                                            Réserver maintenant
                                        </Button>
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
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Actualités
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Sports
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Programme
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Billetterie</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Acheter des billets
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Offres spéciales
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Pass famille
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Accessibilité
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Contact</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Support
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Presse
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            Partenaires
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition-colors">
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
        </>
    )
}
