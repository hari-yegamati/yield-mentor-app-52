import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockCrops } from '@/data/mockData';
import { Search, MapPin, User, Package, IndianRupee, Plus, Edit } from 'lucide-react';

const CropMarketplace = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCrops, setFilteredCrops] = useState(mockCrops);

  React.useEffect(() => {
    let filtered = mockCrops;
    
    // Filter based on user role
    if (user?.role === 'farmer') {
      // Farmers see only their own crops for management
      filtered = mockCrops.filter(crop => crop.farmer === user.name);
    } else if (user?.role === 'buyer') {
      // Buyers see all available crops
      filtered = mockCrops;
    } else if (user?.role === 'seller') {
      // Sellers shouldn't access crop marketplace
      filtered = [];
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(crop =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.farmer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCrops(filtered);
  }, [searchTerm, user]);

  const handleOrder = (cropName: string, farmerId: string) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to place orders.",
        variant: "destructive",
      });
      return;
    }

    if (user.role !== 'buyer') {
      toast({
        title: "Access denied",
        description: "Only buyers can place orders for crops.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Placed!",
      description: `Your order for ${cropName} has been sent to ${farmerId}.`,
    });
  };

  const handleAddCrop = () => {
    toast({
      title: "Add Crop",
      description: "Crop listing feature will be implemented soon.",
    });
  };

  const handleEditCrop = (cropName: string) => {
    toast({
      title: "Edit Crop",
      description: `Edit feature for ${cropName} will be implemented soon.`,
    });
  };

  // Block access for sellers
  if (user?.role === 'seller') {
    return (
      <div className="min-h-screen bg-gradient-sky flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              Crop marketplace is for farmers and buyers only. As a seller, you can access the Input Marketplace.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {user?.role === 'farmer' ? 'Manage Your Crops' : 'Crop Marketplace'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {user?.role === 'farmer' 
              ? 'List and manage your crop inventory'
              : 'Fresh crops directly from farmers to your doorstep'
            }
          </p>
          
          {user?.role === 'farmer' && (
            <Button onClick={handleAddCrop} className="mb-6">
              <Plus className="w-4 h-4 mr-2" />
              Add New Crop
            </Button>
          )}
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search crops, locations, or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="group hover:shadow-natural transition-all duration-300">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl">{crop.name}</CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    Fresh
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {crop.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-2" />
                    {crop.farmer}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {crop.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Package className="w-4 h-4 mr-2" />
                    {crop.quantity} kg available
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center text-2xl font-bold text-primary">
                      <IndianRupee className="w-6 h-6" />
                      {crop.price}/kg
                    </div>
                    {user?.role === 'buyer' ? (
                      <Button 
                        onClick={() => handleOrder(crop.name, crop.farmer)}
                        className="ml-4"
                      >
                        Order Now
                      </Button>
                    ) : user?.role === 'farmer' ? (
                      <Button 
                        variant="outline"
                        onClick={() => handleEditCrop(crop.name)}
                        className="ml-4"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              {user?.role === 'farmer' 
                ? "You haven't listed any crops yet. Click 'Add New Crop' to get started."
                : "No crops found matching your search."
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
                  Sign up as a farmer to sell crops or as a buyer to purchase fresh produce
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

export default CropMarketplace;