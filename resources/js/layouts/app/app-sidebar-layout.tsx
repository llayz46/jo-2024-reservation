import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { useAppearance } from '@/hooks/use-appearance';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { appearance } = useAppearance();

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>

            <Toaster
                theme={appearance}
                toastOptions={{
                    classNames: {
                        toast: '!bg-background !border !border-border !text-sm !font-medium !font-sans',
                        description: '!text-sm !text-muted-foreground !font-sans',
                    },
                }}
            />
        </AppShell>
    );
}
