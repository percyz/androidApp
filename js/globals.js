import React, { Component } from 'react';
import { Image, PixelRatio, Dimensions } from 'react-native';

var {width, height} = Dimensions.get('window');

module.exports = {
  WIDTH: width,
  HEIGHT: height,
  STORE_KEY: 'a56z0fzrNpl^2',
  BASE_URL: 'http://someurl.com',
  BIG: 30,
  MEDIUM: 20,
  SMALL: 16,
  COLOR: {
    ORANGE: '#C50',
    DARKBLUE: '#0F3274',
    LIGHTBLUE: '#6EA8DA',
    DARKGRAY: '#5f6060',
    GREEN: '#88C040',
    GRAY: '#F0F0F0',
    BLUE: '#0093FF',
  },
  REGIONS: {
    "region": [
        "Regions",
        "Northland",
        "Auckland",
        "Waikato",
        "Bay of Plenty",
        "Gisborne",
        "Hawke's Bay",
        "Taranaki",
        "Manawatu-Wanganui",
        "Wellington",
        "Tasman",
        "Marlborough",
        "West Coast",
        "Canterbury",
        "Otago",
        "Southland",
        "Nelson"
    ],
    "cities": {
        "Regions": [
            "Districts"
        ],
        "Northland": [
            "All Districts",
            "Whangarei (city)",
            "Kerikeri",
            "Kaitaia",
            "Dargaville",
            "Kaikohe",
            "Ruakaka",
            "Paihia",
            "Mangawhai",
            "Taipa-Mangonui",
            "Moerewa",
            "Waipu",
            "Hikurangi",
            "Kawakawa"
        ],
        "Auckland": [
            "All Districts",
            "Auckland (city)",
            "Pukekohe",
            "Waiuku",
            "Waiheke Island",
            "Snells Beach",
            "Warkworth",
            "Helensville",
            "Wellsford"
        ],
        "Waikato": [
            "All Districts",
            "Hamilton (city)",
            "Taupo",
            "Cambridge",
            "Te Awamutu",
            "Tokoroa",
            "Huntly",
            "Matamata",
            "Morrinsville",
            "Thames",
            "Waihi",
            "Whitianga",
            "Te Kuiti",
            "Paeroa",
            "Te Aroha",
            "Putaruru",
            "Turangi",
            "Raglan",
            "Otorohanga",
            "Te Kauwhata",
            "Coromandel",
            "Tairua",
            "Ngatea"
        ],
        "Bay of Plenty": [
            "All Districts",
            "Tauranga (city)",
            "Rotorua",
            "Whakatane",
            "Te Puke",
            "Kawerau",
            "Katikati",
            "Opotiki",
            "Waihi Beach",
            "Murupara",
            "Edgecumbe"
        ],
        "Gisborne": [
            "All Districts",
            "Gisborne (city)",
            "Tolaga Bay",
            "Waerengaahika",
            "Waerengaokuri",
            "Waikohu",
            "Wainui",
            "Waipaoa",
            "Waipiro",
            "Waitakaro",
            "Whakaangiangi",
            "Whangara",
            "Wharekopae",
            "Whareponga",
            "Whatatutu",
            "Whataupoko"
        ],
        "Hawke's Bay": [
            "All Districts",
            "Hastings (city)",
            "Napier",
            "Wairoa",
            "Waipukurau",
            "Waipawa"
        ],
        "Taranaki": [
            "All Districts",
            "New Plymouth (city)",
            "Hawera",
            "Waitara",
            "Stratford",
            "Inglewood",
            "Eltham",
            "Opunake",
            "Patea"
        ],
        "Manawatu-Wanganui": [
            "All Districts",
            "Palmerston North (City)",
            "Whanganui",
            "Levin",
            "Feilding",
            "Dannevirke",
            "Marton",
            "Taumarunui",
            "Foxton",
            "Pahiatua",
            "Taihape",
            "Bulls",
            "Woodville",
            "Shannon",
            "Ohakune",
            "Raetihi",
            "Waiouru"
        ],
        "Wellington": [
            "All Districts",
            "Wellington (city)",
            "Lower Hutt",
            "Porirua",
            "Kapiti",
            "Upper Hutt",
            "Masterton",
            "Otaki",
            "Carterton",
            "Featherston",
            "Greytown",
            "Martinborough"
        ],
        "Tasman": [
            "All Districts",
            "Brightwater",
            "Motueka",
            "Takaka",
            "Wakefield"
        ],
        "Marlborough": [
            "All Districts",
            "Blenheim (city)",
            "Picton",
            "Havelock",
            "Seddon",
            "Ward",
            "Rai Valley",
            "Renwick",
            "Clarence",
            "Clifford Bay"
        ],
        "West Coast": [
            "All Districts",
            "Greymouth (city)",
            "Westport",
            "Hokitika",
            "Reefton"
        ],
        "Canterbury": [
            "All Districts",
            "Christchurch (city)",
            "Timaru",
            "Ashburton",
            "Rangiora",
            "Rolleston",
            "Lincoln",
            "Temuka",
            "Woodend",
            "Waimate",
            "Geraldine",
            "Oxford",
            "Darfield",
            "Kaikoura",
            "Methven",
            "Leeston",
            "Amberley",
            "Pleasant Point",
            "Twizel",
            "Rakaia"
        ],
        "Otago": [
            "All Districts",
            "Dunedin (city)",
            "Queenstown",
            "Oamaru",
            "Wanaka",
            "Alexandra",
            "Cromwell",
            "Balclutha",
            "Arrowtown",
            "Milton",
            "Waikouaiti"
        ],
        "Nelson": [
            "All Districts",
            "Nelson (city)",
            "Nelson North",
            "Tahunanui-Port Hills",
            "Stoke"
        ],
        "Southland": [
            "All Districts",
            "Invercargill (City)",
            "Gore",
            "Winton",
            "Te Anau",
            "Bluff",
            "Riverton"
        ]
    }
},
INDUSTRY: [
        "All Industries",
        "Accommodation",
        "Accountant",
        "Airlines & Aviation",
        "Apparel & Fashion",
        "Arts & Crafts",
        "Automotive",
        "Bars and Restaurants",
        "Business Services",
        "Cafe",
        "Civil Engineering",
        "Construction Commercial ",
        "Construction Residential",
        "eCommerce",
        "Education & Training",
        "Energy Services",
        "Entertainment",
        "Environmental Services",
        "Fast Food",
        "Financial Services",
        "Food Products Manufacturing",
        "Foundations & Non-Profits",
        "Government Organisations",
        "Health Services",
        "Import & Export",
        "Information Technology",
        "Institutions",
        "Landscaping",
        "Legal Services",
        "Leisure, Travel, Tourism",
        "Logistics & Supply Chain",
        "Manufacturing",
        "Primary Industries",
        "Secondary Industries",
        "Marketing & Advertising",
        "Media",
        "Museums",
        "Other",
        "Painting & Plastering",
        "Philanthropy",
        "Photography",
        "Professional Services",
        "Real Estate",
        "Religious Institution",
        "Retail",
        "Scientific & Technical Services",
        "Supermarkets",
        "Telecommunications",
        "Tertiary Education",
        "Utilities",
        "Veterinary",
        "Wholesale"
  ],
  SUBINDUSTRY: [
      ['Accommodation','room'],
      ['Accommodation','hotel']
  ],
  RADIUS: [
      '100',
      '500',
      '1000',
      '3000',
      '5000',
      '7000',
      '10000'
  ]
};
