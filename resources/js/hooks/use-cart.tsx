import { useEffect, useState } from 'react';
import axios from 'axios';
import { Page } from '@inertiajs/core'
import { Cart, CartItem, Ticket } from '@/types';
import { router } from '@inertiajs/react';

export function useCart({ initialCart }: { initialCart?: Cart | null } = {}) {
    const [optimisticCart, setOptimisticCart] = useState<Cart | null>(initialCart || null);
    const [loading, setLoading] = useState(!initialCart);

    useEffect(() => {
        if (initialCart) {
            setOptimisticCart(initialCart);
        } else {
            fetchCart();
        }
    }, []);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/cart');
            setOptimisticCart(data.cart);
        } catch (error) {
            console.error('Erreur fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (ticket: Ticket, quantity: number = 1) => {
        if (!optimisticCart) return;

        const cart = optimisticCart;

        const existingItem = optimisticCart.items?.find(item => item.ticket.id === ticket.id);
        let updatedItems: CartItem[] = [];

        if (existingItem) {
            updatedItems = optimisticCart.items.map(item =>
                item.ticket.id === ticket.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            const newItem: CartItem = {
                id: Date.now(),
                cart_id: optimisticCart.id,
                ticket_id: ticket.id,
                ticket,
                quantity,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            updatedItems = [...(optimisticCart.items || []), newItem];
        }

        setOptimisticCart(prev => ({ ...prev!, items: updatedItems }));

        router.post(
            route('cart.add'),
            { ticket_id: ticket.id, quantity },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const cart = (page as Page<{ cart: Cart }>).props.cart;
                    setOptimisticCart(cart);
                },
                onError: () => {
                    setOptimisticCart(cart);
                },
            }
        );
    };

    const removeItemOfCart = (ticketId: number) => {
        if (!optimisticCart) return;

        const cart = optimisticCart;

        const updatedItems = optimisticCart.items?.filter(item => item.ticket.id !== ticketId)
        const total = updatedItems?.reduce((sum, item) => sum + (item.ticket.price * item.quantity), 0) || 0;

        setOptimisticCart(prev => ({ ...prev!, items: updatedItems, total }));

        router.post(
            route('cart.remove'),
            { ticket_id: ticketId },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const cart = (page as Page<{ cart: Cart }>).props.cart;
                    setOptimisticCart(cart);
                },
                onError: () => {
                    setOptimisticCart(cart);
                },
            }
        )
    };

    const handleQuantity = (type: "inc" | "dec", ticketId: number) => {
        if (!optimisticCart) return;

        const cart = optimisticCart;

        const existingItem = optimisticCart.items?.find(item => item.ticket.id === ticketId);

        if (!existingItem) return;

        if(type === "inc") {
            const updatedItems = optimisticCart.items?.map(item =>
                item.ticket.id === ticketId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            setOptimisticCart(prev => ({ ...prev!, items: updatedItems, total: (updatedItems || []).reduce((sum, item) => sum + (item.ticket.price * item.quantity), 0) }));

            router.put(
                route('cart.update'),
                {
                    ticket_id: ticketId,
                    action: "increase",
                },
                {
                    preserveScroll: true,
                    onSuccess: (page) => {
                        const cart = (page as Page<{ cart: Cart }>).props.cart;
                        setOptimisticCart(cart);
                    },
                    onError: () => {
                        setOptimisticCart(cart);
                    },
                }
            );
        } else if(type === "dec") {
            if (existingItem.quantity > 1) {
                const updatedItems = optimisticCart.items?.map(item =>
                    item.ticket.id === ticketId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );

                setOptimisticCart(prev => ({ ...prev!, items: updatedItems, total: (updatedItems || []).reduce((sum, item) => sum + (item.ticket.price * item.quantity), 0) }));

                router.put(
                    route('cart.update'),
                    {
                        ticket_id: ticketId,
                        action: "decrease",
                    },
                    {
                        preserveScroll: true,
                        onSuccess: (page) => {
                            const cart = (page as Page<{ cart: Cart }>).props.cart;
                            setOptimisticCart(cart);
                        },
                        onError: () => {
                            setOptimisticCart(cart);
                        },
                    }
                );
            } else {
                removeItemOfCart(existingItem.ticket.id);
            }
        }
    }

    const checkout = () => {
        router.post(
            route('cart.checkout'),
            {},
            { preserveScroll: true }
        )
    }

    return {
        optimisticCart,
        loading,
        addToCart,
        removeItemOfCart,
        handleQuantity,
        checkout
    };
}
