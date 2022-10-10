export interface Category {
  children: Category[];
  data: {
    created_at: string;
    description: string;
    is_active: boolean;
    name: string;
    slug: string;
    updated_at: string;
  };
  id: number;
}
