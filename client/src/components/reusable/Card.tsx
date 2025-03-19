import React, { useEffect, useState } from "react";
import { IProduct } from "../../typings";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

/**
 * Product Card component for showing products.
 * 
 * @component
 * @returns {JSX.Element} The rendered products.
 */
interface ProductCardProps {
    product: IProduct;
    onEdit?: (product: IProduct) => void;
    onAddToCart?: (product: IProduct) => void;
    onAddToWishlist?: (product: IProduct) => void;
}
const Card: React.FC<ProductCardProps> = ({ product, onEdit, onAddToCart, onAddToWishlist }) => {
    const wishlistItems = useSelector((state: RootState) => state?.cart?.wishlist);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const productInCart = wishlistItems?.some((item: string) => item === product._id);
        setIsInCart(productInCart);
    }, [wishlistItems, product._id]);

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product`, {state: product });
    };
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 relative" onClick={handleCardClick}>
            <img className="w-64 h-64" src={product.imageUrl} alt={product.name} />
            <div className="absolute top-0 right-0 p-2">
                <FaHeart
                    className={`text-xl cursor-pointer ${isInCart ? 'text-red-500' : 'text-black'}`}
                    title="Add to wishlist"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToWishlist) onAddToWishlist(product);
                    }}
                />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-gray-700 text-base">Price: ${product.price}</p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToCart) onAddToCart(product);
                    }}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add to Cart
                </button>
            </div>
            {onEdit && (
                <div className="px-6 pt-4 pb-2">
                    <button
                        onClick={() => onEdit(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >Edit</button>
                </div>
            )}
        </div>
    );
};

export default Card;