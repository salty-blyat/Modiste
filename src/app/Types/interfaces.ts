export interface ProductProps {
    id: number;
    name: string;
    price: number;
    discount: number | null;
    category_name: string;
    image_url: string;
    description: string;
    colors: string[];
    reviews: any | null;
    created_at: string;
    num_purchases: number;
    inCart?: number;
    inStock?: number;
}

export interface UserProps {
    email: string;
    img_url: string;
    password: string;
    user_id: number;
    user_name: string;
    user_role: string;
}
