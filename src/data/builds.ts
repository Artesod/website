// Keyboard builds from youtube.com/@Artesod_ — specs copied from each video's description.
export interface Build {
  videoId: string
  name: string
  year: number
  case: string
  plate: string
  switches: string
  stabs: string
  keycaps?: string
  /** Sound and feel mods, as listed in the video description. */
  mods: string[]
  featured?: boolean
}

export const channelUrl = 'https://www.youtube.com/@Artesod_/videos'

export const builds: Build[] = [
  {
    videoId: 'AZ5b061NM00',
    name: 'Zoom65 Olivia Dark',
    year: 2022,
    case: 'Zoom65 Olivia Dark',
    plate: 'PC',
    switches: 'JWK Linears (stock)',
    stabs: 'Durock V2 (205g0 + Holee mod)',
    keycaps: 'Olivia Doubleshot PBT',
    mods: ['Poron plate foam', 'PCB foam', 'Switch foam'],
    featured: true,
  },
  {
    videoId: 'gejXBZqBbQU',
    name: 'Tiger 80',
    year: 2022,
    case: 'Tiger 80',
    plate: 'PC',
    switches: 'Gateron Oil Kings (stock)',
    stabs: 'Durock V2 (205g0 + Holee mod)',
    keycaps: 'GMK Honor Dark',
    mods: ['PCB foam', 'Switch foam', '2 layers tape', 'Polyfill'],
    featured: true,
  },
  {
    videoId: 'cp6BUSRAK6M',
    name: 'Bakeneko65',
    year: 2022,
    case: 'Bakeneko65',
    plate: 'FR4',
    switches: 'KTT Strawberry',
    stabs: 'Durock V2 (205g0 + Holee mod)',
    keycaps: 'PolyCap Octopus PBT',
    mods: ['Silicone weight', 'Tape mod'],
    featured: true,
  },
  {
    videoId: 'ecKIoriY1Hw',
    name: 'QK65',
    year: 2022,
    case: 'QK65 White / Chroma',
    plate: 'Alu',
    switches: 'SP Meteor Whites (stock)',
    stabs: 'Owlstabs V2 (205g0)',
    keycaps: 'PBT Chalk',
    mods: ['Plate foam', 'PCB foam', 'Tape mod'],
    featured: true,
  },
  {
    videoId: '4ierY923zAs',
    name: 'Zoom87',
    year: 2023,
    case: 'Zoom87 (Red + Scarlet Red backplate)',
    plate: 'Alu',
    switches: 'Neapolitan Ice Creams (stock)',
    stabs: 'Staebies (205g0)',
    keycaps: 'CannonCaps 407',
    mods: ['Plate foam', 'Switch foam', 'Tape mod'],
  },
  {
    videoId: '3-ET5FkfawA',
    name: 'Portal Keyboard',
    year: 2022,
    case: 'Portal Keyboard, Navy',
    plate: 'FR4',
    switches: 'Gateron CJ (stock)',
    stabs: 'Owlabs Owlstab V2 (205g0)',
    keycaps: 'PolyCap Whale PBT',
    mods: ['Poly-Fil', 'Tape over weight'],
  },
  {
    videoId: '-Zo_oalWHCs',
    name: 'Mode SixtyFive',
    year: 2022,
    case: 'Mode SixtyFive',
    plate: 'POM',
    switches: 'Gateron Black Ink V2 (3204)',
    stabs: 'Durock V2 (205g0 + Holee mod)',
    keycaps: 'GMK WOB clones',
    mods: ['ISO top mount config', 'No foam'],
  },
  {
    videoId: 'BTjm3h3hQJ0',
    name: 'KBD75v3.1',
    year: 2021,
    case: 'KBD75v3.1',
    plate: 'Polycarbonate',
    switches: 'EG Aqua Kings (stock)',
    stabs: 'Durock V2 (205g0 + Holee mod)',
    keycaps: 'ePBT Gray & White ABS Doubleshot',
    mods: ['Case foam', 'Plate foam'],
  },
  {
    videoId: 'BFY8seTRCB8',
    name: 'Tofu65 (first build)',
    year: 2021,
    case: 'Tofu65 Acrylic',
    plate: 'Aluminum',
    switches: 'Alpacas (lubed + filmed)',
    stabs: 'Durock V2 (lubed + Holee mod)',
    mods: ['Case foam', 'O-ring mod'],
  },
]
