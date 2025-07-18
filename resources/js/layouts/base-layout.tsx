import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Ticket, UserIcon } from 'lucide-react';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between">
                    <Link href="/">
                        <AppLogoIcon className="size-8" />
                    </Link>
                    <nav className="hidden md:flex items-center">
                        <Link href={route('tickets.show', 'solo')} prefetch className={buttonVariants({ variant: 'link' })}>
                            Solo
                        </Link>
                        <Link href={route('tickets.show', 'duo')} prefetch className={buttonVariants({ variant: 'link' })}>
                            Duo
                        </Link>
                        <Link href={route('tickets.show', 'familiale')} prefetch className={buttonVariants({ variant: 'link' })}>
                            Familiale
                        </Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Button>
                            <Ticket className="size-4" />
                            Billets
                        </Button>

                        <Link href={route('dashboard')} className={buttonVariants({ variant: 'secondary', size: 'icon' })}>
                            <UserIcon size={20} />
                        </Link>
                    </div>
                </div>
            </header>

            {children}
        </div>
    )
}
