/** @format */

import { navigationTypes } from '../../../store/useUserStore';

export const departmentVariants = [
  //Lets use popculture references for department names
  'Mysteries',
  'Muggle studies',
  'Defense Against the Dark Arts',
  'Potions',
  'Transfiguration',
  'History of Magic',
  'Charms',
  'Herbology',
  'Astronomy',
  'Care of Magical Creatures',
  'Divination',
  'Arithmancy',
  'Ancient Runes',
  'Alchemy',
  'Apparition',
];

export const preferencesVariants: navigationTypes[] = ['direct', 'instances'];

export const randomPerson = {
  gender: 'female',
  name: {
    title: 'Mrs',
    first: 'Aurora',
    last: 'Pérez',
  },
  location: {
    street: {
      number: 3955,
      name: 'Calle de La Luna',
    },
    city: 'Santander',
    state: 'Galicia',
    country: 'Spain',
    postcode: 38909,
    coordinates: {
      latitude: '-31.5707',
      longitude: '68.6165',
    },
    timezone: {
      offset: '+11:00',
      description: 'Magadan, Solomon Islands, New Caledonia',
    },
  },
  email: 'aurora.perez@example.com',
  login: {
    uuid: '2b7f68ca-5a7d-49cb-8e46-5f5baa7b8d6e',
    username: 'happyfrog963',
    password: 'dark',
    salt: 'OCZJUSb4',
    md5: 'ea5df8e4f6f6b8bf36c142c928b95b64',
    sha1: '12ca6447fb59a36b71bdc85bcc91041d9063e352',
    sha256: '687ef97b26c1cb44343607aaf975e17e787799ecfe8921c2b4f762df85165a66',
  },
  dob: {
    date: '1965-01-08T02:10:24.227Z',
    age: 60,
  },
  registered: {
    date: '2016-07-05T23:48:22.235Z',
    age: 8,
  },
  phone: '964-758-392',
  cell: '695-375-761',
  id: {
    name: 'DNI',
    value: '86682408-B',
  },
  picture: {
    large: 'https://randomuser.me/api/portraits/women/61.jpg',
    medium: 'https://randomuser.me/api/portraits/med/women/61.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/61.jpg',
  },
  nat: 'ES',
};
