import { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Cart, Ticket } from '@/types';

type CartContextType = {
    optimisticCart: Cart | null;
    loading: boolean;
    addToCart: (ticket: Ticket, quantity?: number) => void;
    removeItemOfCart: (ticketId: number) => void;
    // clearCart: () => void;
    handleQuantity : (type: "inc" | "dec", ticketId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
    initialCart: Cart | null;
};

export function CartProvider({ children, initialCart }: CartProviderProps) {
    const {
        optimisticCart,
        loading,
        addToCart,
        removeItemOfCart,
        // clearCart,
        handleQuantity,
    } = useCart({ initialCart });

    return (
        <CartContext.Provider value={{
            optimisticCart,
            loading,
            addToCart,
            removeItemOfCart,
            // clearCart,
            handleQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCartContext doit être utilisé dans un CartProvider');
    }

    return context;
};
