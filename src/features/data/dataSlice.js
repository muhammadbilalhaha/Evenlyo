import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pricingPlans: [
  {
    id: 1,
    name: 'Starter',
    description: 'Perfect for new vendors just getting started.',
    price: 19,
    isPopular: false,
    cta: 'Get Started',
    features: [
      'Up to 5 listings',
      'Basic analytics',
      'Email support',
      'Standard visibility',
    ],
  },
  {
    id: 2,
    name: 'Professional',
    description: 'For growing vendors who want more exposure.',
    price: 49,
    isPopular: true,
    cta: 'Upgrade Now',
    features: [
      'Up to 25 listings',
      'Advanced analytics',
      'Priority support',
      'Featured placement',
      'Direct messaging',
    ],
  },
  {
    id: 3,
    name: 'Business',
    description: 'For established vendors with high volume.',
    price: 99,
    isPopular: false,
    cta: 'Contact Sales',
    features: [
      'Unlimited listings',
      'Full analytics suite',
      '24/7 dedicated support',
      'Top of search results',
      'Custom branding',
      'API access',
    ],
  },
],
  categories: [
    { id: 'decoration', name: 'Decoration & Styling', icon: 'PartyPopper' },
    { id: 'entertainment', name: 'Entertainment & Attractions', icon: 'Music' },
    { id: 'food', name: 'Food & Drinks', icon: 'Utensils' },
    { id: 'locations', name: 'Locations & Party Tents', icon: 'Tent' },
    { id: 'staff', name: 'Staff & Services', icon: 'Users' },
  ],
  subcategories: {
    decoration: [
      { id: 'balloon', name: 'Balloon Decoration', icon: 'PartyPopper' },
      { id: 'furniture', name: 'Furniture Rental', icon: 'Armchair' },
      { id: 'lighting', name: 'Lighting & Light Letters', icon: 'Lightbulb' },
      { id: 'loungesets', name: 'Loungesets & sofas', icon: 'Sofa' },
      { id: 'flowers', name: 'Flowers & Backdrops', icon: 'Flower2' },
      { id: 'tableware', name: 'Tableware & Linens', icon: 'UtensilsCrossed' },
    ],
    entertainment: [
      { id: 'bouncy', name: 'Bouncy Castles & Inflatable Attractions', icon: 'Castle' },
      { id: 'children', name: "Children's Entertainment", icon: 'Baby' },
      { id: 'dj', name: 'DJs', icon: 'Disc' },
      { id: 'drivein', name: 'Drive-in shows', icon: 'Car' },
      { id: 'fire', name: 'Fire Shows & LED Performers', icon: 'Flame' },
      { id: 'karaoke', name: 'Karaoke', icon: 'Mic2' },
      { id: 'livebands', name: 'Live bands', icon: 'Guitar' },
      { id: 'magicians', name: 'Magicians / Illusionists', icon: 'Wand2' },
      { id: 'photobooths', name: 'Photobooths', icon: 'Camera' },
      { id: 'silentdisco', name: 'Silent disco', icon: 'Headphones' },
      { id: 'singers', name: 'Singers & Artists', icon: 'Mic' },
      { id: 'workshops', name: 'Workshops & Experiences', icon: 'Palette' },
    ],
    food: [
      { id: 'foodtrucks', name: 'Food Trucks', icon: 'Truck' },
      { id: 'catering', name: 'Catering', icon: 'ChefHat' },
      { id: 'bartenders', name: 'Bartenders & Bar Services', icon: 'GlassWater' },
      { id: 'desserts', name: 'Desserts & Sweets', icon: 'Cake' },
    ],
    locations: [
      { id: 'aluhallen', name: 'Aluhallen', icon: 'Warehouse' },
      { id: 'beach', name: 'Beach Locations', icon: 'Palmtree' },
      { id: 'boats', name: 'Boat Locations & Party Boats', icon: 'Anchor' },
      { id: 'castles', name: 'Castles & Country Houses', icon: 'Castle' },
      { id: 'tents', name: 'Party Tents & Marquees', icon: 'Tent' },
    ],
    staff: [
      { id: 'photographers', name: 'Photographers', icon: 'Camera' },
      { id: 'videographers', name: 'Videographers', icon: 'Video' },
      { id: 'security', name: 'Security Staff', icon: 'Shield' },
      { id: 'planners', name: 'Event Planners', icon: 'ClipboardList' },
    ]
  },
  vendors: [
    { id: 1,  name: 'Party Tent 6x3m', vendorName: 'Hoppal Verhuur', categoryId: 'locations', subcategoryId: 'aluhallen', location: 'Tiel', rating: 0, reviews: 0, description: 'Rent a 6x3 meter party tent for a garden party, wedding, or corporate event.', price: 61.98, isVerified: true, available: true },
    { id: 2,  name: 'Party Tent 6x4m', vendorName: 'Hoppal Verhuur', categoryId: 'locations', subcategoryId: 'aluhallen', location: 'Tiel', rating: 0, reviews: 0, description: 'Rent a 6x4 meter party tent for a garden party, wedding, or corporate event.', price: 61.98, isVerified: true, available: true },
    { id: 3,  name: 'Inflatable Party Tent 5x5m', vendorName: 'Hoppal Verhuur', categoryId: 'locations', subcategoryId: 'aluhallen', location: 'Tiel', rating: 5.0, reviews: 1, description: 'This black inflatable tent measuring 5x5 meters can be set up in just a few hours.', price: 144.63, isVerified: true, available: true },
    { id: 4,  name: 'Party Tent 8x10m Deluxe', vendorName: 'EventHallen NL', categoryId: 'locations', subcategoryId: 'aluhallen', location: 'Amsterdam', rating: 4.7, reviews: 23, description: 'Premium large party tent for up to 150 guests. Weather resistant.', price: 289.00, isVerified: true, available: true },
    { id: 5,  name: 'Aluhallen Business Tent', vendorName: 'ProParty Rentals', categoryId: 'locations', subcategoryId: 'aluhallen', location: 'Rotterdam', rating: 4.9, reviews: 47, description: 'Professional aluhallen for corporate events and exhibitions.', price: 450.00, isVerified: true, available: true },
    { id: 10, name: 'Castle De Haar', vendorName: 'Kasteel Events', categoryId: 'locations', subcategoryId: 'castles', location: 'Utrecht', rating: 4.9, reviews: 100, description: 'Historic castle venue for unforgettable weddings and events.', price: 2000.00, isVerified: true, available: true },
    { id: 11, name: 'Beach Club Zand', vendorName: 'Coastal Events', categoryId: 'locations', subcategoryId: 'beach', location: 'Haarlem', rating: 4.6, reviews: 80, description: 'Ocean view beach venue for parties and weddings.', price: 800.00, isVerified: false, available: true },
    { id: 12, name: 'Amsterdam Canal Cruises', vendorName: 'Canal Party Co.', categoryId: 'locations', subcategoryId: 'boats', location: 'Amsterdam', rating: 4.9, reviews: 200, description: 'Canal tour party boat experience through Amsterdam.', price: 600.00, isVerified: true, available: true },
    { id: 20, name: 'Balloon Decoration Package', vendorName: 'Balloon Bliss', categoryId: 'decoration', subcategoryId: 'balloon', location: 'Amsterdam', rating: 4.8, reviews: 20, description: 'Custom balloon decoration for any event including arches and centerpieces.', price: 150.00, isVerified: true, available: true },
    { id: 21, name: 'Furniture Rental Set', vendorName: 'Event Furniture', categoryId: 'decoration', subcategoryId: 'furniture', location: 'Eindhoven', rating: 4.7, reviews: 12, description: 'Premium furniture rental for events including chairs, tables, and bars.', price: 45.00, isVerified: false, available: true },
    { id: 22, name: 'LED Light Letters', vendorName: 'Glow Events', categoryId: 'decoration', subcategoryId: 'lighting', location: 'Groningen', rating: 4.6, reviews: 8, description: 'Custom LED letters for your event including names and messages.', price: 89.50, isVerified: true, available: true },
    { id: 30, name: 'Bouncy Castle Deluxe', vendorName: 'Jump Around', categoryId: 'entertainment', subcategoryId: 'bouncy', location: 'The Hague', rating: 4.5, reviews: 15, description: 'Safe and fun bouncy castle for kids. Fully insured.', price: 120.00, isVerified: true, available: true },
    { id: 31, name: 'DJ Sparkle', vendorName: 'DJ Sparkle', categoryId: 'entertainment', subcategoryId: 'dj', location: 'Amsterdam', rating: 4.9, reviews: 45, description: 'Professional DJ for any event. Custom playlist available.', price: 300.00, isVerified: true, available: true },
    { id: 32, name: 'Photo Fun Booth', vendorName: 'Photo Fun', categoryId: 'entertainment', subcategoryId: 'photobooths', location: 'Delft', rating: 4.7, reviews: 25, description: 'Photo booth with unlimited prints and props.', price: 350.00, isVerified: true, available: true },
    { id: 40, name: 'Burger Boss Food Truck', vendorName: 'Burger Boss', categoryId: 'food', subcategoryId: 'foodtrucks', location: 'Amsterdam', rating: 4.8, reviews: 50, description: 'Smash burgers made fresh on site.', price: 15.00, isVerified: true, available: true },
    { id: 41, name: 'Gourmet Catering Service', vendorName: 'Gourmet Events', categoryId: 'food', subcategoryId: 'catering', location: 'The Hague', rating: 4.9, reviews: 28, description: 'Fine dining catering service for events.', price: 45.00, isVerified: true, available: true },
    { id: 50, name: 'Lens Masters Photography', vendorName: 'Lens Masters', categoryId: 'staff', subcategoryId: 'photographers', location: 'Amsterdam', rating: 4.9, reviews: 70, description: 'Candid event photography with 24h delivery.', price: 500.00, isVerified: true, available: true },
    { id: 51, name: 'Perfect Planners', vendorName: 'Perfect Planners', categoryId: 'staff', subcategoryId: 'planners', location: 'Amsterdam', rating: 4.9, reviews: 90, description: 'Stress-free event planning from start to finish.', price: 1500.00, isVerified: true, available: true },
  ],
  blogPosts: [
    {
      id: 1,
      title: 'Goochelaar huren? De complete gids voor een onvergetelijk evenement',
      excerpt: 'Ontdek alles wat je moet weten over het huren van een goochelaar. Lees tips, prijzen, verschillende soorten shows en waar je op moet letten voordat je boekt.',
      date: '7/6/2026',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop',
      isFeatured: true,
      category: 'Blog',
    },
    {
      id: 2,
      title: 'Waarom een DJ het verschil maakt op jouw feest!',
      excerpt: 'Ontdek waarom een goede DJ de sfeer bepaalt en waar je op moet letten bij het boeken van een DJ voor jouw evenement.',
      date: '7/6/2026',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
      isFeatured: false,
      category: 'Blog',
    },
    {
      id: 3,
      title: 'De ultieme checklist voor een geslaagd feest!',
      excerpt: 'Van locatie tot entertainment: met deze checklist vergeet je niets bij het organiseren van een feest.',
      date: '7/3/2026',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
      isFeatured: false,
      category: 'Blog',
    },
  ],
  faqs: [
    { q: "What makes Evenlyo different?", a: "We focus specifically on the Dutch market, offering local vendors with transparent pricing." },
    { q: "Are the suppliers reliable?", a: "Yes, all suppliers go through a vetting process before being listed on our platform." },
    { q: "Can I contact you first before I book?", a: "Absolutely. You can send an inquiry directly through the vendor's profile page." },
    { q: "How do I know if a supplier is available?", a: "Each vendor profile features an availability calendar updated in real-time." },
    { q: "Can I compare multiple suppliers?", a: "Yes, you can add vendors to your favorites list and compare them side-by-side." },
    { q: "How do I find the right supplier?", a: "Use our search filters to narrow down by category, location, date, and price range." },
    { q: "For which events can I use Evenlyo?", a: "From weddings and birthdays to corporate events and festivals." },
    { q: "Is Evenlyo free to use?", a: "Searching and contacting vendors is completely free for customers." },
    { q: "Which suppliers can I find on Evenlyo?", a: "DJs, food trucks, venues, decorators, photographers, staff, and much more." },
    { q: "What is Evenlyo?", a: "Evenlyo is a two-sided event marketplace connecting customers with event suppliers in the Netherlands." },
  ]
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
});

export const selectAllLocations = (state) => {
  const locations = state.data.vendors.map(v => v.location.split(',')[0].trim());
  return [...new Set(locations)];
};

export const selectAllSearchTerms = (state) => {
  const categories = state.data.categories.map(c => c.name);
  const subcategories = Object.values(state.data.subcategories).flat().map(s => s.name);
  const vendors = state.data.vendors.map(v => v.name);
  return [...new Set([...categories, ...subcategories, ...vendors])];
};



export default dataSlice.reducer;