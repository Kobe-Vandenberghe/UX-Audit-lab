export type Property = {
  id: string; name: string; city: string; country: string; area: string;
  type: string; price: number; rating: number; reviews: number;
  image: string; gallery: string[]; tag: string; amenities: string[];
  description: string; capacity: number; refundable: boolean;
};
export const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}.jpg`;
export const destinations = [
  { name: 'Lisbon', country: 'Portugal', image: 'lisbon', line: 'Hills, tiles & golden-hour light', count: 128 },
  { name: 'Copenhagen', country: 'Denmark', image: 'copenhagen', line: 'A slower kind of city break', count: 86 },
  { name: 'Amsterdam', country: 'Netherlands', image: 'amsterdam', line: 'Canals worth getting lost along', count: 142 },
  { name: 'Bruges', country: 'Belgium', image: 'bruges', line: 'Storybook streets, real good coffee', count: 64 },
  { name: 'Ljubljana', country: 'Slovenia', image: 'lake', line: 'Green escapes & riverside mornings', count: 52 },
  { name: 'Edinburgh', country: 'United Kingdom', image: 'edinburgh', line: 'Old streets. New favourites.', count: 96 },
];
const names = [
  ['Casa do Pátio', 'Alfama Terrace House', 'The Tramline Loft', 'Maré Riverside Hotel'],
  ['Havn House', 'The Nørrebro Studio', 'Nord Garden Hotel', 'Harbour Light Apartment'],
  ['Canal & Co.', 'The Jordaan Residence', 'Parkside Amsterdam', 'House of Nine Windows'],
  ['Maison des Canaux', 'The Belfry Rooms', 'Linden Guesthouse', 'Atelier by the Water'],
  ['Riverstone Retreat', 'The Green Courtyard', 'Villa Trnovo', 'Morning on the Ljubljanica'],
  ['The Rowan House', 'Stockbridge Hideaway', 'Calton Townhouse', 'The Old Printworks'],
];
const areas = [['Alfama','Graça','Baixa','Belém'],['Christianshavn','Nørrebro','Vesterbro','Nordhavn'],['Canal District','Jordaan','Oud-West','De Pijp'],['Historic Centre','Markt','Sint-Anna','Langerei'],['Old Town','Centre','Trnovo','Riverside'],['New Town','Stockbridge','Calton Hill','Leith']];
export const properties: Property[] = destinations.flatMap((d, i) => names[i].map((name, j) => ({
  id: `stay-${i * 4 + j + 1}`, name, city: d.name, country: d.country, area: areas[i][j],
  type: ['Boutique hotel','Apartment','Guesthouse','Hotel'][j],
  price: [126,98,84,154][j] + i * 13, rating: [4.92,4.78,4.61,4.85][j] - i * .01,
  reviews: [218,94,163,307][j] + i * 11, image: ['room','interior','bedroom','pool'][(i+j)%4],
  gallery: ['room','interior','bedroom','pool','breakfast'], tag: j === 0 ? 'Guest favourite' : j === 2 ? 'A lovely little find' : '',
  amenities: j % 2 ? ['Wi-Fi','Kitchen','Air conditioning','Workspace'] : ['Wi-Fi','Breakfast','Air conditioning','Terrace'],
  description: `A considered little address in ${areas[i][j]}, made for seeing ${d.name} at your own pace. Expect natural textures, locally made details and a warm welcome from a team who knows every corner of the neighbourhood. Step outside for independent cafés, evening walks and a different side of the city.`,
  capacity: j === 1 ? 4 : j === 2 ? 2 : 6, refundable: j !== 2,
})));
export const reviews = [
  { name: 'Sophie', from: 'Belgium', score: '9.6', date: 'October 2026', text: 'The kind of place you want to keep to yourself. A quiet room, thoughtful details and the most generous breakfast. We walked everywhere.' },
  { name: 'Oliver', from: 'United Kingdom', score: '9.2', date: 'September 2026', text: 'A brilliant base for a long weekend. Our host shared a map of little restaurants we would never have found on our own. Some street noise on Saturday.' },
  { name: 'Mila', from: 'Netherlands', score: '9.8', date: 'August 2026', text: 'Beautiful light in the mornings and a genuinely comfortable bed. The terrace was our favourite part. Would happily come back.' },
  { name: 'Luca', from: 'Italy', score: '8.8', date: 'July 2026', text: 'Very welcoming team and a great location. The room was a little smaller than we imagined, but the shared spaces more than made up for it.' },
];
