import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Cart = () => {
    return (
        <Link href="/cart" className="relative">
            <ShoppingCart />
            <div className="badge badge-error badge-xs absolute -top-1 -right-2 translate-y-[-25%] p-2">
                <span className="absolute inset-0 translate-y-[20%]">1</span>
            </div>
        </Link>
    );
};

export default Cart;
