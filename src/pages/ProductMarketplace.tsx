import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockProducts } from '@/data/mockData';
import { Search, Store, Package, IndianRupee, Truck } from 'lucide-react';

const ProductMarketplace = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  React.useEffect(() => {
    let filtered = mockProducts;
    
    // Filter based on user role
    if (user?.role === 'seller') {
      // Sellers see only their own products for management
      filtered = mockProducts.filter(product => product.seller === user.name);
    } else if (user?.role === 'farmer') {
      // Farmers see all available products to buy
      filtered = mockProducts;
    } else if (user?.role === 'buyer') {
      // Buyers shouldn't access product marketplace
      filtered = [];
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, user]);

  const handleOrder = (productName: string, seller: string) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to place orders.",
        variant: "destructive",
      });
      return;
    }

    if (user.role !== 'farmer') {
      toast({
        title: "Access denied",
        description: "Only farmers can purchase farming inputs.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Placed!",
      description: `Your order for ${productName} has been sent to ${seller}.`,
    });
  };

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Product listing feature will be implemented soon.",
    });
  };

  const handleEditProduct = (productName: string) => {
    toast({
      title: "Edit Product",
      description: `Edit feature for ${productName} will be implemented soon.`,
    });
  };

  // Block access for buyers
  if (user?.role === 'buyer') {
    return (
      <div className="min-h-screen bg-gradient-earth flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              Input marketplace is for farmers and sellers only. As a buyer, you can access the Crop Marketplace.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'seeds': return 'bg-green-100 text-green-800';
      case 'fertilizers': return 'bg-blue-100 text-blue-800';
      case 'pesticides': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {user?.role === 'seller' ? 'Manage Your Products' : 'Input Marketplace'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {user?.role === 'seller' 
              ? 'List and manage your farming products inventory'
              : 'Quality seeds, fertilizers, and farming supplies from trusted sellers'
            }
          </p>
          
          {user?.role === 'seller' && (
            <Button onClick={handleAddProduct} className="mb-6">
              <Package className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          )}
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products or sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="seeds">Seeds</SelectItem>
                <SelectItem value="fertilizers">Fertilizers</SelectItem>
                <SelectItem value="pesticides">Pesticides</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-natural transition-all duration-300">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <Badge className={getCategoryColor(product.category)}>
                    {product.category}
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Store className="w-4 h-4 mr-2" />
                    {product.seller}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Package className="w-4 h-4 mr-2" />
                    {product.stock} units in stock
                  </div>
                  <div className="flex items-center text-sm text-accent">
                    <Truck className="w-4 h-4 mr-2" />
                    Free delivery available
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center text-2xl font-bold text-primary">
                      <IndianRupee className="w-6 h-6" />
                      {product.price}
                    </div>
                    {user?.role === 'farmer' ? (
                      <Button 
                        onClick={() => handleOrder(product.name, product.seller)}
                        disabled={product.stock === 0}
                        className="ml-4"
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Order Now'}
                      </Button>
                    ) : user?.role === 'seller' ? (
                      <Button 
                        variant="outline"
                        onClick={() => handleEditProduct(product.name)}
                        className="ml-4"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              {user?.role === 'seller' 
                ? "You haven't listed any products yet. Click 'Add New Product' to get started."
                : "No products found matching your criteria."
              }
            </p>
          </div>
        )}

        {!user && (
          <div className="mt-12 text-center">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Join the Marketplace</CardTitle>
                <CardDescription>
                  Sign up as a farmer to buy supplies or as a seller to offer quality farming products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <a href="/register">Sign Up</a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <a href="/login">Sign In</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMarketplace;