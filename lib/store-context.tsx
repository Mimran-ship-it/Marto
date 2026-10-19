"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  PROMO_CODES,
  getProductBySlug,
  type Product,
} from "@/lib/data/products";

export type CartItem = {
  productId: string;
  slug: string;
  quantity: number;
  unitLabel: string;
  unitMultiplier: number;
  selected: boolean;
};

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  promoCode: string;
  promoDiscount: number;
  hydrated: boolean;
  addToCart: (product: Product, qty?: number, unitLabel?: string) => void;
  removeFromCart: (productId: string, unitLabel?: string) => void;
  updateQuantity: (productId: string, quantity: number, unitLabel?: string) => void;
  setUnit: (productId: string, unitLabel: string, multiplier: number) => void;
  toggleSelect: (productId: string, unitLabel?: string) => void;
  toggleSelectAll: (selected: boolean) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyPromo: (code: string) => { ok: boolean; message: string };
  clearPromo: () => void;
  cartCount: number;
  cartTotal: number;
  selectedSubtotal: number;
  deliveryFee: number;
  orderTotal: number;
  wishlistCount: number;
  getCartQty: (productId: string) => number;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "marto-cart";
const WISHLIST_KEY = "marto-wishlist";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISHLIST_KEY);
      if (c) setCart(JSON.parse(c) as CartItem[]);
      if (w) setWishlist(JSON.parse(w) as string[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback(
    (product: Product, qty = 1, unitLabel?: string) => {
      const label = unitLabel ?? product.unitOptions[0]?.label ?? product.unit;
      const multiplier =
        product.unitOptions.find((u) => u.label === label)?.multiplier ?? 1;
      setCart((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === product.id && i.unitLabel === label,
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + qty,
          };
          return next;
        }
        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            quantity: qty,
            unitLabel: label,
            unitMultiplier: multiplier,
            selected: true,
          },
        ];
      });
    },
    [],
  );

  const removeFromCart = useCallback((productId: string, unitLabel?: string) => {
    setCart((prev) =>
      prev.filter(
        (i) =>
          !(
            i.productId === productId &&
            (unitLabel === undefined || i.unitLabel === unitLabel)
          ),
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, unitLabel?: string) => {
      if (quantity < 1) {
        removeFromCart(productId, unitLabel);
        return;
      }
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId &&
          (unitLabel === undefined || i.unitLabel === unitLabel)
            ? { ...i, quantity }
            : i,
        ),
      );
    },
    [removeFromCart],
  );

  const setUnit = useCallback(
    (productId: string, unitLabel: string, multiplier: number) => {
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId
            ? { ...i, unitLabel, unitMultiplier: multiplier }
            : i,
        ),
      );
    },
    [],
  );

  const toggleSelect = useCallback((productId: string, unitLabel?: string) => {
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId &&
        (unitLabel === undefined || i.unitLabel === unitLabel)
          ? { ...i, selected: !i.selected }
          : i,
      ),
    );
  }, []);

  const toggleSelectAll = useCallback((selected: boolean) => {
    setCart((prev) => prev.map((i) => ({ ...i, selected })));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const applyPromo = useCallback((code: string) => {
    const key = code.trim().toUpperCase();
    const value = PROMO_CODES[key];
    if (!value) {
      setPromoCode("");
      setPromoDiscount(0);
      return { ok: false, message: "Invalid promo code" };
    }
    setPromoCode(key);
    setPromoDiscount(value);
    return {
      ok: true,
      message:
        value < 1
          ? `${Math.round(value * 100)}% off applied`
          : `Rs. ${value} off applied`,
    };
  }, []);

  const clearPromo = useCallback(() => {
    setPromoCode("");
    setPromoDiscount(0);
  }, []);

  const getCartQty = useCallback(
    (productId: string) =>
      cart
        .filter((i) => i.productId === productId)
        .reduce((sum, i) => sum + i.quantity, 0),
    [cart],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart],
  );

  const selectedSubtotal = useMemo(() => {
    return cart
      .filter((i) => i.selected)
      .reduce((sum, i) => {
        const product = getProductBySlug(i.slug);
        if (!product) return sum;
        return sum + product.price * i.unitMultiplier * i.quantity;
      }, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, i) => {
      const product = getProductBySlug(i.slug);
      if (!product) return sum;
      return sum + product.price * i.unitMultiplier * i.quantity;
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!promoDiscount) return 0;
    if (promoDiscount < 1) return Math.round(selectedSubtotal * promoDiscount);
    return Math.min(promoDiscount, selectedSubtotal);
  }, [promoDiscount, selectedSubtotal]);

  const deliveryFee = useMemo(() => {
    if (selectedSubtotal <= 0) return 0;
    if (selectedSubtotal >= FREE_DELIVERY_THRESHOLD) return 0;
    return DELIVERY_FEE;
  }, [selectedSubtotal]);

  const orderTotal = Math.max(
    0,
    selectedSubtotal - discountAmount + deliveryFee,
  );

  const wishlistCount = wishlist.length;

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      wishlist,
      promoCode,
      promoDiscount: discountAmount,
      hydrated,
      addToCart,
      removeFromCart,
      updateQuantity,
      setUnit,
      toggleSelect,
      toggleSelectAll,
      clearCart,
      toggleWishlist,
      isWishlisted,
      applyPromo,
      clearPromo,
      cartCount,
      cartTotal,
      selectedSubtotal,
      deliveryFee,
      orderTotal,
      wishlistCount,
      getCartQty,
    }),
    [
      cart,
      wishlist,
      promoCode,
      discountAmount,
      hydrated,
      addToCart,
      removeFromCart,
      updateQuantity,
      setUnit,
      toggleSelect,
      toggleSelectAll,
      clearCart,
      toggleWishlist,
      isWishlisted,
      applyPromo,
      clearPromo,
      cartCount,
      cartTotal,
      selectedSubtotal,
      deliveryFee,
      orderTotal,
      wishlistCount,
      getCartQty,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
