import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tags, LoaderCircle, Plus, TicketIcon, Minus } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import InputError from '@/components/input-error';
import { toast } from 'sonner';
import { Ticket } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

type TicketForm = {
    title: string;
    description: string;
    price: number;
    popular: boolean;
    features: string[];
};

interface TicketDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    ticket: Ticket | null;
}

export function TicketDialog({ open, setOpen, ticket }: TicketDialogProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm<TicketForm>({
        title: '',
        description: '',
        price: 0,
        popular: false,
        features: [],
    });

    useEffect(() => {
        if (ticket) {
            setData({
                title: ticket.title || '',
                description: ticket.description || '',
                price: ticket.price || 0,
                popular: ticket.popular || false,
                features: ticket.features || [],
            });
        } else {
            reset();
        }
    }, [ticket]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!ticket) {
            post(route('admin.tickets.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setOpen(false);
                    toast.success('Offre créée avec succès', {
                        description: data.title + ' a bien été créée.',
                        icon: <TicketIcon className="size-4" />,
                    });
                },
                onError: (errors) => {
                    const allErrors = Object.values(errors).join('\n') || 'Veuillez vérifier les informations saisies.';

                    toast.error('Erreur lors de la création de la marque.', {
                        description: allErrors,
                        icon: <Tags className="size-4" />,
                    });
                },
            })
        } else {
            put(route('admin.tickets.update', ticket.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setOpen(false);
                    toast.success('Offre modifiée avec succès', {
                        description: data.title + ' a bien été modifiée.',
                        icon: <TicketIcon className="size-4" />,
                    });
                },
                onError: (errors) => {
                    const allErrors = Object.values(errors).join('\n') || 'Veuillez vérifier les informations saisies.';

                    toast.error('Erreur lors de la modification de l\'offre.', {
                        description: allErrors,
                        icon: <Tags className="size-4" />,
                    });
                },
            })
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus /> Créer une nouvelle offre
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-xl max-h-[calc(100vh-32px)] [&>button:last-child]:top-3.5">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">{ticket ? `Modifier l'offre : ${ticket.title}` : 'Créer une nouvelle offre'}</DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    {ticket ? 'Modifier les détails de l\'offre' : 'Créer une nouvelle offre pour les Jeux Olympiques de Paris 2024.'}
                </DialogDescription>
                <div className="overflow-y-auto">
                    <div className="pt-4">
                        <form className="space-y-4 *:not-last:px-6" onSubmit={submit}>
                            <div className="*:not-first:mt-2">
                                <Label htmlFor="title">Nom</Label>
                                <Input
                                    id="title"
                                    placeholder="Offre duo"
                                    type="text"
                                    required
                                    tabIndex={1}
                                    onChange={(e) => setData('title', e.target.value)}
                                    value={data.title}
                                    disabled={processing}
                                />
                                <InputError message={errors.title} />
                            </div>
                            <div className="*:not-first:mt-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Description de l'offre"
                                    required
                                    tabIndex={2}
                                    onChange={(e) => setData('description', e.target.value)}
                                    value={data.description}
                                    disabled={processing}
                                />
                                <InputError message={errors.description} />
                            </div>
                            <div className="*:not-first:mt-2">
                                <Label htmlFor="price">Prix</Label>
                                <Input
                                    type="number"
                                    id="price"
                                    placeholder="45"
                                    required
                                    tabIndex={3}
                                    onChange={(e) => setData('price', parseFloat(e.target.value))}
                                    value={data.price || ''}
                                    disabled={processing}
                                />
                                <InputError message={errors.price} />
                            </div>
                            <div className="*:not-first:mt-2 flex flex-col">
                                <Label htmlFor="popular">Populaire</Label>
                                <Switch
                                    id="popular"
                                    checked={data.popular}
                                    onCheckedChange={(checked) => setData('popular', checked)}
                                    disabled={processing}
                                    tabIndex={4}
                                />
                                <InputError message={errors.popular} />
                            </div>
                            <div className="*:not-first:mt-2">
                                <Label htmlFor="features">Features</Label>
                                <div className="mt-2 flex items-center gap-2">
                                    <Input
                                        id="features-input"
                                        placeholder="Ajouter une feature"
                                        type="text"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                                                e.preventDefault();
                                                setData('features', [...data.features, e.currentTarget.value.trim()]);
                                                e.currentTarget.value = '';
                                            }
                                        }}
                                        disabled={processing}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            const input = document.querySelector<HTMLInputElement>('#features-input');
                                            if (input && input.value.trim() !== '') {
                                                setData('features', [...data.features, input.value.trim()]);
                                                input.value = '';
                                            }
                                        }}
                                        disabled={processing}
                                    >
                                        <Plus className="size-4" />
                                    </Button>
                                </div>
                                <ul className="text-sm text-muted-foreground list-disc ml-4">
                                    {data.features.map((f, i) => (
                                        <li key={i}>
                                            {f}
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="ml-2 p-1"
                                                onClick={() => {
                                                    setData('features', data.features.filter((_, index) => index !== i));
                                                }}
                                                disabled={processing}
                                            >
                                                <Minus className="size-2" />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                                <InputError message={errors.features} />
                            </div>
                            <DialogFooter className="border-t px-6 py-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline" tabIndex={3}>
                                        Annuler
                                    </Button>
                                </DialogClose>
                                <Button tabIndex={4} type="submit" disabled={processing}>
                                    {processing && <LoaderCircle className="size-4 animate-spin" />}
                                    Enregistrer
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
