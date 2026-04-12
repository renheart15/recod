export interface Speaker {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  topic: string;
  image: string;
}

export interface PanelMember {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  image: string;
}

export interface Cluster {
  id: string;
  name: string;
  members: PanelMember[];
}

export const speakers: Speaker[] = [
  {
    id: '1',
    name: 'Dr. Lynnette Matea Sayson Camello',
    title: 'Professor II',
    affiliation: 'Cebu Technological University',
    topic: 'Innovative Educational Technologies for Sustainable Academic Development',
    image: '/images/speakers/DR. LYNNETTE CAMELLO.jpg',
  },
  {
    id: '2',
    name: 'DR. KHADEM HUSSAIN SAEEDI',
    title: 'Senior Teaching Assistant',
    affiliation: 'Kandahar University, Afghanistan',
    topic: 'Biofloc Technology As Technological Innovation For Sustainable Aquaculture And Global Food Security',
    image: '/images/speakers/khadem.jpg',
  },
];

export const clusters: Cluster[] = [
  {
    id: 'cluster-1',
    name: 'Food Security and Agriculture',
    members: [
      {
        id: 'member-1',
        name: 'DR. ZANDRO O. PEREZ',
        title: 'Professor, Science Department',
        affiliation: 'Cebu Technological University',
        image: '/images/no-profile/user.jpg',
      },
      {
        id: 'member-2',
        name: 'PROF. JULIAN O. CUMAD',
        title: 'Faculty',
        affiliation: 'Cebu Technological University',
        image: '/images/no-profile/user.jpg',
      },
      {
        id: 'member-3',
        name: 'DR. MONIFEL G. CALDERON',
        title: 'Faculty',
        affiliation: 'Cebu Technological University',
        image: '/images/panels/DR. MONIFEL G. CALDERON.jpg',
      },
    ],
  },
  {
    id: 'cluster-2',
    name: 'Engineering and Technology Innovation',
    members: [
      {
        id: 'member-4',
        name: 'DR. MA. KRISTINA O. PALER',
        title: 'Professor II',
        affiliation: 'University of San Carlos, Department of Biology',
        image: '/images/no-profile/user.jpg',
      },
      {
        id: 'member-5',
        name: 'ENGR. ANDREW WEB ALCORCON',
        title: 'Faculty',
        affiliation: 'Cebu Technological University',
        image: '/images/no-profile/user.jpg',
      },
      {
        id: 'member-6',
        name: 'DR. MARK PAUL LIM',
        title: 'Faculty',
        affiliation: 'Cebu Technological University',
        image: '/images/panels/DR. MARK PAUL LIM.jpg',
      },
    ],
  },
  {
    id: 'cluster-3',
    name: 'Education, Social Science and Tourism Management',
    members: [
      {
        id: 'member-7',
        name: 'DR. PRIMO B. ARANAS, JR.',
        title: 'Faculty',
        affiliation: 'Cebu Technological University',
        image: '/images/panels/DR. PRIMO B. ARANAS, JR..jpg',
      },
      {
        id: 'member-8',
        name: 'DR. JUDE CHARREL B. PAEZ',
        title: 'Faculty',
        affiliation: 'Cebu Technological University',
        image: '/images/no-profile/user.jpg',
      },
      {
        id: 'member-9',
        name: 'DR. ANGEN MAY F. CHARCOS',
        title: 'Faculty',
        affiliation: 'Cebu Technological University',
        image: '/images/no-profile/user.jpg',
      },
    ],
  },
];
