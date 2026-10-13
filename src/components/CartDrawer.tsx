import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, CheckCircle, Package } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (flavorId: string, quantity: number) => void;
  onRemoveItem: (flavorId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.flavor.price * item.quantity, 0);
  const shipping = subtotal >= 50 || items.length === 0 ? 0 : 8.5;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutComplete(true);
      onClearCart();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-100/60">
            <div>
              <h2 className="text-xl font-serif font-semibold text-stone-900">
                Cold Pack Order
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Shipped with 5 lbs dry ice in 100% recyclable insulation
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutComplete ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-stone-900">
                  Order Confirmed!
                </h3>
                <p className="text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
                  Your artisanal pints are being packed with food-grade dry ice in our Portland creamery. Expected arrival within 48 hours.
                </p>
                <div className="p-4 bg-stone-100 rounded-xl text-left text-xs space-y-1 font-mono text-stone-700">
                  <p>Confirmation: #VC-9482-COLD</p>
                  <p>Thermal Barrier: Recycled Cotton Fiber</p>
                  <p>Delivery: Guaranteed Frozen Solid</p>
                </div>
                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-stone-900 text-stone-50 text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-medium text-stone-800">
                  Your cold pack is empty
                </h3>
                <p className="text-sm text-stone-500 max-w-xs mx-auto">
                  Explore our small-batch flavors churned with fresh grass-fed cream and pure Madagascar vanilla.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Explore Flavors
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.flavor.id}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/80 shadow-xs"
                  >
                    <img
                      src={item.flavor.image}
                      alt={item.flavor.imageAlt}
                      className="w-18 h-18 object-cover rounded-lg shrink-0 border border-stone-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-stone-900 truncate">
                        {item.flavor.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-mono">
                        ${item.flavor.price.toFixed(2)} / pint
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(item.flavor.id, item.quantity - 1)}
                            className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.flavor.id, item.quantity + 1)}
                            className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.flavor.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {!checkoutComplete && items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-100/70 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Pints Subtotal:</span>
                  <span className="font-mono text-stone-900 font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Dry Ice &amp; Insulated Shipper:</span>
                  <span className="font-mono text-stone-900 font-medium">
                    {shipping === 0 ? 'FREE ($50+ orders)' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                  <span>Order Total:</span>
                  <span className="font-mono text-amber-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full py-3 bg-stone-900 text-stone-50 text-sm font-medium rounded-xl hover:bg-stone-800 active:scale-[0.99] transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Securing Cold Pack...' : `Checkout – $${total.toFixed(2)}`}
              </button>
              <p className="text-[11px] text-stone-500 text-center">
                Guaranteed solid frozen arrival or replacement pints sent free.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
