import type { CartItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
    item: CartItem;
    removeItemOfCart: (productId: number) => void;
    handleQuantity: (type: 'inc' | 'dec', productId: number) => void;
}

export function CartItem({ item, removeItemOfCart, handleQuantity, }: CartItemProps) {
    return (
        <Card className="relative overflow-hidden py-0">
            <CardContent className="p-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 z-10 size-6 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItemOfCart(item.ticket.id)}
                >
                    <Trash2 className="h-3 w-3" />
                </Button>

                <div className="relative flex items-start gap-4 pr-8">
                    <div className="flex min-h-18 min-w-0 flex-col">
                        <h3 className="line-clamp-2 leading-5 font-medium text-foreground">{item.ticket.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2">{item.ticket.description}</p>
                        <p className="mt-auto text-sm font-semibold text-foreground">{item.ticket.price.toFixed(2)} €</p>
                    </div>

                    <div className="absolute right-0 bottom-0 flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantity('dec', item.ticket.id)}>
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantity('inc', item.ticket.id)}>
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
