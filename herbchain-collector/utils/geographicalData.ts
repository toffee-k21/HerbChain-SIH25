/**
 * Utility functions for geographical and seasonal data analysis
 * Used by the credibility scoring system
 */

// Database of Indian Ayurvedic herbs with their native regions
const AYURVEDIC_HERBS_DATABASE: Record<string, {
  regions: Array<{
    name: string;
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  }>;
  harvestSeasons: string[];
  commonName: string;
}> = {
  'Withania somnifera': { // Ashwagandha
    regions: [
      {
        name: 'North India',
        minLat: 28.0, maxLat: 37.6, 
        minLng: 72.0, maxLng: 88.0
      },
      {
        name: 'Central India',
        minLat: 22.0, maxLat: 28.0, 
        minLng: 72.0, maxLng: 88.0
      }
    ],
    harvestSeasons: ['winter'],
    commonName: 'Ashwagandha'
  },
  'Bacopa monnieri': { // Brahmi
    regions: [
      {
        name: 'Wetlands across India',
        minLat: 8.4, maxLat: 37.6, 
        minLng: 68.7, maxLng: 97.25
      }
    ],
    harvestSeasons: ['summer', 'monsoon'],
    commonName: 'Brahmi'
  },
  'Ocimum sanctum': { // Tulsi
    regions: [
      {
        name: 'Pan-India',
        minLat: 8.4, maxLat: 37.6, 
        minLng: 68.7, maxLng: 97.25
      }
    ],
    harvestSeasons: ['spring', 'summer'],
    commonName: 'Tulsi'
  },
  'Azadirachta indica': { // Neem
    regions: [
      {
        name: 'Pan-India',
        minLat: 8.4, maxLat: 37.6, 
        minLng: 68.7, maxLng: 97.25
      }
    ],
    harvestSeasons: ['spring'],
    commonName: 'Neem'
  },
  'Curcuma longa': { // Turmeric
    regions: [
      {
        name: 'South India',
        minLat: 8.4, maxLat: 18.0, 
        minLng: 72.0, maxLng: 85.0
      },
      {
        name: 'Northeast India',
        minLat: 22.0, maxLat: 29.0, 
        minLng: 88.0, maxLng: 97.25
      }
    ],
    harvestSeasons: ['winter'],
    commonName: 'Turmeric'
  }
  // Add more herbs as needed
};

/**
 * Determine season from timestamp and coordinates
 */
export function getSeasonFromTimestamp(timestamp: string, latitude: number | string, longitude: number | string): string {
  const date = new Date(timestamp);
  const month = date.getMonth();
  
  // Convert string coordinates to numbers if needed
  const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
  
  // For India (primarily Northern Hemisphere)
  // Indian seasons are different from Western seasons
  // Winter: December-February (11-1)
  // Spring: March-April (2-3)
  // Summer: May-June (4-5)
  // Monsoon: July-September (6-8)
  // Autumn: October-November (9-10)
  
  if (month >= 11 || month <= 1) return 'winter';
  if (month >= 2 && month <= 3) return 'spring';
  if (month >= 4 && month <= 5) return 'summer';
  if (month >= 6 && month <= 8) return 'monsoon';
  return 'autumn';
}

/**
 * Check if a plant is native to a specific region
 */
export function isPlantNativeToRegion(scientificName: string, latitude: number, longitude: number): boolean {
  const herbData = AYURVEDIC_HERBS_DATABASE[scientificName];
  if (!herbData) return false;
  
  // Check if coordinates fall within any of the herb's native regions
  return herbData.regions.some(region => (
    latitude >= region.minLat &&
    latitude <= region.maxLat &&
    longitude >= region.minLng &&
    longitude <= region.maxLng
  ));
}

/**
 * Get the ideal harvesting seasons for a specific plant
 */
export function getIdealHarvestingSeasons(scientificName: string): string[] {
  const herbData = AYURVEDIC_HERBS_DATABASE[scientificName];
  if (!herbData) return [];
  
  return herbData.harvestSeasons;
}

/**
 * Get common name from scientific name
 */
export function getCommonName(scientificName: string): string {
  const herbData = AYURVEDIC_HERBS_DATABASE[scientificName];
  if (!herbData) return scientificName;
  
  return herbData.commonName;
}

/**
 * Check if two seasons are adjacent or the same
 */
export function areSeasonsCompatible(currentSeason: string, idealSeasons: string[]): {
  isMatch: boolean;
  isAdjacent: boolean;
} {
  // If current season is one of the ideal seasons, it's a perfect match
  if (idealSeasons.includes(currentSeason)) {
    return { isMatch: true, isAdjacent: false };
  }
  
  // Define season adjacency for Indian seasons
  const seasonOrder = ['winter', 'spring', 'summer', 'monsoon', 'autumn'];
  const currentIndex = seasonOrder.indexOf(currentSeason);
  
  // Check if any ideal season is adjacent to current season
  const isAdjacent = idealSeasons.some(season => {
    const idealIndex = seasonOrder.indexOf(season);
    const distance = Math.abs(currentIndex - idealIndex);
    return distance === 1 || distance === seasonOrder.length - 1; // Adjacent or wrapping around
  });
  
  return { isMatch: false, isAdjacent };
}

/**
 * Get region name based on coordinates
 */
export function getRegionName(latitude: number, longitude: number): string {
  // Simplified region mapping for India
  if (latitude >= 28.0) return 'North India';
  if (latitude >= 22.0 && latitude < 28.0) return 'Central India';
  if (latitude >= 18.0 && latitude < 22.0) return 'West/East India';
  return 'South India';
}