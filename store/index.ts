import {create} from 'zustand';

// Definizione del tipo per un prodotto
export type Product = {
    title: string;
    type: string;
    price: number;
    stock: number;
    description: string;
    author: string;
    category: string;
    image: string;
    featured: boolean;
    $title: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
  quantity: number; // Quantità nel carrello
};

// Definizione dello stato dello store
type CartState = {
  cart: Product[]; // Lista dei prodotti nel carrello
  addProduct: (product: Product) => void; // Funzione per aggiungere un prodotto
  removeProduct: (id: string) => void; // Funzione per rimuovere un prodotto
  updateQuantity: (id: string, quantity: number) => void; // Funzione per aggiornare la quantità di un prodotto
  clearCart: () => void; // Funzione per svuotare il carrello
};

// Creazione dello store
const useCartStore = create<CartState>((set) => ({
  cart: [],
  
  addProduct: (product) => set((state) => {
    const existingProduct = state.cart.find((p) => p.title === product.title);
    if (existingProduct) {
      // Se il prodotto esiste già, aggiorniamo la quantità
      return { 
        cart: state.cart.map((p) =>
          p.title === product.title
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        ),
      };
    }
    // Altrimenti, aggiungiamo il nuovo prodotto
    return { cart: [...state.cart, product] };
  }),

  removeProduct: (title) => set((state) => ({
    cart: state.cart.filter((product) => product.title !== title),
  })),

  updateQuantity: (title, quantity) => set((state) => ({
    cart: state.cart.map((product) =>
      product.title === title ? { ...product, quantity } : product
    ),
  })),

  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
