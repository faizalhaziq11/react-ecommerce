import { create } from "zustand";

const calculateTotals = (cartItems) => {
    const totalCartItem = cartItems.reduce((total, item) => total + item.count, 0);
    const totalCartPrice = Number(cartItems.reduce((total, item) => total + (item.price * item.count), 0).toFixed(2));
    return { totalCartItem, totalCartPrice };
};

const useCartStore = create((set, get) => ({
    cartItems: [],
    totalCartItem: 0,
    totalCartPrice: 0,
    setTotalCartItem: (totalCartItem) => set({ totalCartItem }),
    setTotalCartPrice: (totalCartPrice) => set({ totalCartPrice }),
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
    removeFromCart: (productId) => {
        const { cartItems } = get();
        const newCartItems = cartItems.filter((item) => item.id !== productId);
        set({ cartItems: newCartItems, ...calculateTotals(newCartItems) });
    }
}));

export default useCartStore;
