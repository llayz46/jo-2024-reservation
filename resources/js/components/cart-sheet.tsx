import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useCartContext } from '@/contexts/cart-context';
import { CartItem } from '@/components/cart-item';

export function CartSheet() {
    const { optimisticCart, removeItemOfCart, handleQuantity, checkout } = useCartContext();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon">
                    <ShoppingBag size={16} />
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Mon panier</SheetTitle>
                    <SheetDescription>Gérer les articles dans votre panier, modifier les quantités ou supprimer des articles.</SheetDescription>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-4 px-4">
                    {!optimisticCart?.items.length ? (
                        <div className="text-center text-muted-foreground">Votre panier est vide.</div>
                    ) : (
                        optimisticCart.items.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                removeItemOfCart={removeItemOfCart}
                                handleQuantity={handleQuantity}
                            />
                        ))
                    )}
                </div>

                <div className="px-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>{optimisticCart?.total.toFixed(2)} €</span>
                </div>

                <SheetFooter className="flex-row-reverse justify-between">
                    <Button type="submit" onClick={checkout}>Passer à la caisse</Button>

                    <SheetClose asChild>
                        <Button variant="outline">Fermer</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>

            {/*<CartClearConfirmationDialog*/}
            {/*    open={clearConfirmationModal}*/}
            {/*    onClose={() => setClearConfirmationModal(false)}*/}
            {/*    clearCart={clearCart}*/}
            {/*/>*/}
        </Sheet>
    )
}
