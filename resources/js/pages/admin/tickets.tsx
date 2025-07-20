import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Ticket } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Ellipsis, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { TicketDialog } from '@/components/ticket-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
    },
    {
        title: 'Gérer les billets',
        href: '/admin/tickets',
    }
];

export default function Tickets({ tickets }: { tickets: Ticket[] }) {
    const [search, setSearch] = useState<string>('');
    const [deleteTicket, setDeleteTicket] = useState<Ticket | null>(null);
    const [openTicketDialog, setOpenTicketDialog] = useState<boolean>(false);
    const [editTicket, setEditTicket] = useState<Ticket | null>(null);

    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket =>
            ticket.title.toLowerCase().includes(search.toLowerCase()) ||
            ticket.description.toLowerCase().includes(search.toLowerCase())
        );
    }, [tickets, search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gérer les offres" />

            <div className="p-6 space-y-6 min-h-screen">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Gérer les billets</h1>
                    <p className="text-muted-foreground">
                        Gérez les billets pour les Jeux Olympiques de Paris 2024. Vous pouvez consulter les billets, en créer de nouveaux, les modifier ou les supprimer.
                    </p>
                </div>
                <Card>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col md:flex-row gap-3">
                                <div className="w-full relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Rechercher..."
                                        className="pl-10"
                                    />
                                </div>
                                <div className="w-full md:w-auto">
                                    <TicketDialog
                                        open={openTicketDialog}
                                        setOpen={() => {
                                            setOpenTicketDialog(!openTicketDialog);
                                            setEditTicket(null);
                                        }}
                                        ticket={editTicket}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                    {filteredTickets.map((ticket) => (
                        <Card key={ticket.id} className="flex flex-row items-center p-4 gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-lg font-semibold">{ticket.title}</h2>
                                    <span className="text-xl font-semibold">{ticket.price}€</span>
                                </div>
                                <p className="my-2 text-sm text-muted-foreground">{ticket.description}</p>
                                <ul className="text-sm text-muted-foreground list-disc ml-4">
                                    {ticket.features.map((f, i) => (
                                        <li key={i}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button size="icon" variant="ghost">
                                        <Ellipsis />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Gérer l'offre</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => {
                                        setEditTicket(ticket);
                                        setOpenTicketDialog(true)
                                    }}>
                                        Modifier
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setDeleteTicket(ticket)}>Supprimer</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Card>
                    ))}
                </div>
            </div>

            <ConfirmDeleteDialog
                ticket={deleteTicket}
                open={!!deleteTicket}
                onClose={() => setDeleteTicket(null)}
            />
        </AppLayout>
    );
}
