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

export type PresentationType = 'online' | 'product';

export const speakers: Speaker[] = [
  {
    id: '1',
    name: 'DR. LYNNETTE MATEA SAYSON CAMELLO',
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

export const clustersByType: Record<PresentationType, Cluster[]> = {
  online: [
    {
      id: 'online-cluster-1',
      name: 'FOOD SECURITY AND AGRICULTURE',
      members: [
        {
          id: 'online-member-1',
          name: 'DR. ZANDRO O. PEREZ',
          title: 'NSTP Chair, Faculty President',
          affiliation: 'Cebu Technological University - Barili Campus',
          image: '/images/panels/Dr. Zandro O. Perez .jpg',
        },
        {
          id: 'online-member-2',
          name: 'PROF. JULIAN O. CUMAD',
          title: 'Instructor I',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/no-profile/user.jpg',
        },
        {
          id: 'online-member-3',
          name: 'DR. MONIFEL G. CALDERON',
          title: 'Assistant Professor III',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/panels/DR. MONIFEL G. CALDERON.jpg',
        },
      ],
    },
    {
      id: 'online-cluster-2',
      name: 'ENGINEERING AND TECHNOLOGY INNOVATION',
      members: [
        {
          id: 'online-member-4',
          name: 'DR. MA. KRISTINA O. PALER',
          title: 'Professor II',
          affiliation: 'University of San Carlos, Department of Biology',
          image: '/images/no-profile/user.jpg',
        },
        {
          id: 'online-member-5',
          name: 'ENGR. ANDREW WEB ALCORCON',
          title: 'Instructor I',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/panels/ENGR. ANDREW WEB ALCORCON.jpg',
        },
        {
          id: 'online-member-6',
          name: 'DR. MARK PAUL LIM',
          title: 'Assistant Professor II',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/panels/DR. MARK PAUL LIM.jpg',
        },
      ],
    },
    {
      id: 'online-cluster-3',
      name: 'EDUCATION, SOCIAL SCIENCE AND TOURISM MANAGEMENT',
      members: [
        {
          id: 'online-member-7',
          name: 'DR. PRIMO B. ARANAS, JR.',
          title: 'Associate Dean',
          affiliation: 'Graduate School Siquijor State College',
          image: '/images/panels/DR. PRIMO B. ARANAS, JR..jpg',
        },
        {
          id: 'online-member-8',
          name: 'DR. JUDE CHARREL B. PAEZ',
          title: 'Associate Professor III',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/panels/DR. JUDE CHARREL B. PAEZ.png',
        },
        {
          id: 'online-member-9',
          name: 'DR. ANGEN MAY F. CHARCOS',
          title: 'Associate Professor V',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/panels/DR. ANGEN MAY F. CHARC0S.png',
        },
      ],
    },
  ],

  //product
  product: [
    {
      id: 'product-cluster-1',
      name: 'FOOD SECURITY AND AGRICULTURE',
      members: [
        {
          id: 'product-member-1',
          name: 'DR. REYNANT ANGELO PEREZ LEPITEN',
          title: 'SOUS Chef',
          affiliation: 'Durhan White Beach Resort',
          image: '/images/no-profile/user.jpg',
        },
        {
          id: 'product-member-2',
          name: 'MS. LESLIE CABILLO',
          title: 'Faculty',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/no-profile/user.jpg',
        },
        {
          id: 'product-member-3',
          name: 'DR. VICEL B. ALBAÑO',
          title: 'Assistant Professor I',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/no-profile/user.jpg',
        },
      ],
    },
    {
      id: 'product-cluster-2',
      name: 'ENGINEERING AND TECHNOLOGY INNOVATION',
      members: [
        {
          id: 'product-member-4',
          name: 'DR. ANALIZA B. CALLES',
          title: 'Professor IV',
          affiliation: 'Biliran Province State University',
          image: '/images/no-profile/user.jpg',
        },
        {
          id: 'product-member-5',
          name: 'DR. JAMES PAUL TAMAYO',
          title: 'Associate Professor IV',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/panels/DR. JAMES PAUL TAMAYO.jpg',
        },
        {
          id: 'product-member-6',
          name: 'ENGR. LEA MARIE P. RELAVO',
          title: 'Instructor I',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/no-profile/user.jpg',
        },
      ],
    },
    {
      id: 'product-cluster-3',
      name: 'EDUCATION, SOCIAL SCIENCE AND TOURISM MANAGEMENT',
      members: [
        {
          id: 'product-member-7',
          name: 'DR. LYNNETTE CAMELLO',
          title: 'Professor II',
          affiliation: 'Cebu Technological University',
          image: '/images/panels/DR. LYNNETTE CAMELLO.jpg',
        },
        {
          id: 'product-member-8',
          name: 'DR. ANTONIO CINCO JR.',
          title: 'Associate Professor III',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/panels/DR. ANTONIO CINCO JR..png',
        },
        {
          id: 'product-member-9',
          name: 'PROF. GENESIS PRESILLAS',
          title: 'Assistant Professor II',
          affiliation: 'Cebu Technological University - Tuburan Campus',
          image: '/images/panels/GENESIS C. PRESILLAS - ASSISTANT PROFESSOR 2.jpg',
        },
      ],
    },
  ],
};

// Keep backward compat if anything still imports `clusters`
export const clusters = clustersByType.online;