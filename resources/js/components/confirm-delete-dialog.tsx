import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { CircleAlertIcon, TicketIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Ticket } from '@/types';

type ConfirmDeleteDialogProps = {
    ticket: Ticket | null;
    open: boolean;
    onClose: () => void;
};

export function ConfirmDeleteDialog({ ticket, open, onClose }: ConfirmDeleteDialogProps) {
    const {
        data,
        setData,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm<{ title: string }>({
        title: '',
    });

    if (!ticket) return null;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('admin.tickets.destroy', ticket.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('title');
                onClose();
                toast.success(`L'offre : "${ticket.title}" a été supprimé·e avec succès`, {
                    description: `${ticket.title} a bien été supprimé·e.`,
                    icon: <TicketIcon />,
                });
            },
            onError: (errors) => {
                const allErrors = Object.values(errors).join('\n') || `Erreur lors de la suppression de l'offre : ${ticket.title}. Veuillez réessayer.`;
                toast.error("Erreur lors de la suppression de l'offre", {
                    description: allErrors,
                    icon: <TicketIcon />,
                });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
                        <CircleAlertIcon className="opacity-80" size={16} />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            Supprimer l'offre : <span className="text-foreground">{ticket.title}</span>
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            Cette action est irréversible. Pour confirmer, veuillez saisir le nom de l'offre : {" "}
                            <span className="text-foreground">{ticket.title}</span>.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={submit}>
                    <div className="*:not-first:mt-2">
                        <Label htmlFor="title">Confirmer le nom</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder={`Saisissez "${ticket.title}" pour confirmer`}
                            onChange={(e) => setData('title', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.title} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="flex-1">
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="flex-1" variant="destructive" disabled={data.title !== ticket.title || processing}>
                            Supprimer
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
