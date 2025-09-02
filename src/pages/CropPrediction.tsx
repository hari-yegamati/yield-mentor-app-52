import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { locationData } from '@/data/mockData';
import { MapPin, Brain, Thermometer, Droplets, TestTube } from 'lucide-react';

const CropPrediction = () => {
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const coordKey = `${coordinates.lat},${coordinates.lng}`;
      const result = locationData[coordKey] || locationData['default'];
      
      setPrediction(result);
      toast({
        title: "Prediction Complete!",
        description: `${result.crop} recommended with ${result.confidence}% confidence`,
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Crop Prediction</h1>
          <p className="text-xl text-muted-foreground">
            Get AI-powered crop recommendations based on your location's soil and weather data
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                Location Input
              </CardTitle>
              <CardDescription>
                Enter your farm's coordinates to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePredict} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    placeholder="e.g., 28.6139"
                    value={coordinates.lat}
                    onChange={(e) => setCoordinates(prev => ({ ...prev, lat: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    placeholder="e.g., 77.2090"
                    value={coordinates.lng}
                    onChange={(e) => setCoordinates(prev => ({ ...prev, lng: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Analyzing..." : "Get Prediction"}
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Try these demo coordinates:</h4>
                <div className="text-sm space-y-1">
                  <p>Delhi: 28.6139, 77.2090</p>
                  <p>Gujarat: 23.0225, 72.5714</p>
                  <p>Punjab: 30.7333, 76.7794</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prediction Results */}
          {prediction && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-6 h-6 mr-2" />
                  Prediction Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {prediction.crop}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {prediction.confidence}% Confidence
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Reasoning:</h4>
                    <p className="text-muted-foreground">{prediction.reasoning}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center">
                        <TestTube className="w-4 h-4 mr-2" />
                        Soil Data
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>pH:</span>
                          <span>{prediction.soilData.pH}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Clay:</span>
                          <span>{prediction.soilData.clay}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sand:</span>
                          <span>{prediction.soilData.sand}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Silt:</span>
                          <span>{prediction.soilData.silt}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center">
                        <Thermometer className="w-4 h-4 mr-2" />
                        Weather Data
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Temperature:</span>
                          <span>{prediction.weatherData.temperature}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Humidity:</span>
                          <span>{prediction.weatherData.humidity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rainfall:</span>
                          <span>{prediction.weatherData.rainfall}mm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropPrediction;