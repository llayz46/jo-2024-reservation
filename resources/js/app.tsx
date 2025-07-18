import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { CartProvider } from '@/contexts/cart-context';
import { Cart } from '@/types';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const cart = (props.initialPage.props as unknown as { cart: Cart | null }).cart;

        root.render(
            <CartProvider initialCart={cart}>
                <App {...props} />
            </CartProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
