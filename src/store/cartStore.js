import { create } from "zustand";
import { persist } from "zustand/middleware";

const calculateTotals = (cartItems) => {
    let totalCartItem = 0;
    let totalCartPrice = 0;
    for (const item of cartItems) {
        totalCartItem += item.count;
        totalCartPrice += item.price * item.count;
    }
    return { totalCartItem, totalCartPrice: Number(totalCartPrice.toFixed(2)) };
};

const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: [],
            totalCartItem: 0,
            totalCartPrice: 0,
            clearCart: () => set({
                cartItems: [],
                totalCartItem: 0,
                totalCartPrice: 0,
            }),
            addToCart: (product, count) => {
                const { cartItems } = get();
                const foundCartItem = cartItems.find((item) => item.id === product.id);

                let newCartItems;
                if (foundCartItem) {
                    newCartItems = cartItems.map((item) =>
                        item.id === product.id ? { ...item, count: item.count + count } : item
                    );
                } else {
                    newCartItems = [...cartItems, { ...product, count }];
                }

                set({ cartItems: newCartItems, ...calculateTotals(newCartItems) });
            },
            restoreCart: (items) => {
                const cartItems = Array.isArray(items) ? items : [];
                set({ cartItems, ...calculateTotals(cartItems) });
            },
            removeFromCart: (productId) => {
                const { cartItems } = get();
                const newCartItems = cartItems.filter((item) => item.id !== productId);
                set({ cartItems: newCartItems, ...calculateTotals(newCartItems) });
            }
        }),
        {
            name: "cart-storage",
            // Save only the items; work the totals out again when they're loaded
            partialize: (state) => ({ cartItems: state.cartItems }),
            merge: (persisted, current) => {
                const cartItems = Array.isArray(persisted?.cartItems) ? persisted.cartItems : [];
                return { ...current, cartItems, ...calculateTotals(cartItems) };
            },
        }
    )
);

export default useCartStore;
