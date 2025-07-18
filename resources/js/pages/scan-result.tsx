import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, User, Ticket, Clock, QrCode } from "lucide-react"
import { Head, Link } from '@inertiajs/react';
import type { ScanResult } from "@/types"
import BaseLayout from '@/layouts/base-layout';
import { cn } from '@/lib/utils';

const getStatusColor = (status: ScanResult["status"]) => {
    switch (status) {
        case "valid":
            return "bg-green-100 text-green-800 border-green-200"
        case "invalid":
            return "bg-red-100 text-red-800 border-red-200"
        case "expired":
            return "bg-orange-100 text-orange-800 border-orange-200"
        case "used":
            return "bg-gray-100 text-gray-800 border-gray-200"
        default:
            return "bg-gray-100 text-gray-800 border-gray-200"
    }
}

const getStatusLabel = (status: ScanResult["status"]) => {
    switch (status) {
        case "valid":
            return "Valide"
        case "invalid":
            return "Invalide"
        case "expired":
            return "Expiré"
        case "used":
            return "Déjà utilisé"
        default:
            return status
    }
}

export default function ScanResult({ data }: { data: ScanResult }) {
    return (
        <BaseLayout>
            <Head title="Scan du ticket" />

            <div className="mx-auto py-8 max-w-2xl">
                <div className="text-center mb-8 space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-green-600">Scan réussi !</h1>
                        <p className="text-muted-foreground">Le ticket a été scanné avec succès</p>
                    </div>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center space-x-2">
                                <QrCode className="w-5 h-5" />
                                <span>Statut du scan</span>
                            </CardTitle>
                            <Badge className={getStatusColor(data.status)}>{getStatusLabel(data.status)}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>
                                Scanné le{" "}
                                {new Date(data.scanned_at).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Ticket className="w-5 h-5" />
                            <span>Informations du billet</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{data.ticket.offer}</h3>
                            <p className="text-muted-foreground">{data.ticket.description}</p>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Prix</p>
                                <p className="text-lg font-semibold">{data.ticket.price}€</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Clé du ticket</p>
                            <p className="text-xs font-mono bg-muted p-2 rounded break-all">{data.ticket.ticket_key}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="w-5 h-5" />
                            <span>Informations du porteur</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Nom</p>
                            <p className="font-semibold">{data.user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <p className="font-semibold">{data.user.email}</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={route('home')} className={cn('flex-1', buttonVariants({ size: 'lg' }))}>
                        Autoriser l'accès
                    </Link>
                    <Link href={route('home')} className={cn('flex-1 bg-transparent', buttonVariants({ variant: 'outline', size: 'lg' }))}>
                        Scanner un autre ticket
                    </Link>
                </div>

                <Card className="mt-6 bg-muted/30">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <p className="text-sm font-medium">Ticket validé avec succès</p>
                            <p className="text-xs text-muted-foreground">
                                Ce ticket a été vérifié et est valide pour l'accès aux Jeux Olympiques de Paris 2024
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </BaseLayout>
    )
}
