import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '내추럴 린넨 암막 커튼',
    category: 'curtain',
    price: 45000,
    description: '자연스러운 린넨의 질감과 완벽한 암막 기능을 동시에 갖춘 베스트셀러 커튼입니다.',
    materials: ['린넨', '폴리에스테르'],
    features: ['암막', '방한', '세탁 용이'],
    colors: [
      { name: '오트밀', hex: '#E5D3B3' },
      { name: '차콜', hex: '#4A4A4A' },
      { name: '샌드 베이지', hex: '#D2B48C' }
    ],
    images: [
      'https://picsum.photos/seed/curtain1/800/1000',
      'https://picsum.photos/seed/curtain1-detail/800/1000'
    ],
    isBest: true
  },
  {
    id: '2',
    name: '순면 60수 사계절 침구 세트',
    category: 'bedding',
    price: 128000,
    description: '부드러운 60수 고밀도 순면 소재로 제작되어 사계절 내내 쾌적한 숙면을 도와줍니다.',
    materials: ['순면 100%'],
    features: ['항균', '통기성', '먼지 적음'],
    colors: [
      { name: '화이트', hex: '#FFFFFF' },
      { name: '소프트 그레이', hex: '#D3D3D3' },
      { name: '세이지 그린', hex: '#B2AC88' }
    ],
    images: [
      'https://picsum.photos/seed/bedding1/800/1000',
      'https://picsum.photos/seed/bedding1-detail/800/1000'
    ],
    isBest: true
  },
  {
    id: '3',
    name: '프리미엄 벨벳 쿠션 커버',
    category: 'accessory',
    price: 18000,
    description: '고급스러운 광택과 부드러운 촉감의 벨벳 소재로 공간에 포인트를 더해보세요.',
    materials: ['벨벳'],
    features: ['인테리어 포인트', '부드러운 촉감'],
    colors: [
      { name: '테라코타', hex: '#A65D46' },
      { name: '딥 그린', hex: '#004225' },
      { name: '머스타드', hex: '#FFDB58' }
    ],
    images: [
      'https://picsum.photos/seed/cushion1/800/1000'
    ],
    isNew: true
  },
  {
    id: '4',
    name: '워싱 광목 내추럴 커튼',
    category: 'curtain',
    price: 38000,
    description: '가공되지 않은 순수한 광목 소재의 따뜻함이 느껴지는 내추럴 커튼입니다.',
    materials: ['광목'],
    features: ['친환경', '내추럴 무드'],
    colors: [
      { name: '아이보리', hex: '#FFFFF0' }
    ],
    images: [
      'https://picsum.photos/seed/curtain2/800/1000'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userName: '김*은',
    rating: 5,
    comment: '색감이 너무 예뻐요. 방 분위기가 확 살아요!',
    image: 'https://picsum.photos/seed/review1/400/400',
    date: '2024-03-20'
  },
  {
    id: 'r2',
    productId: '2',
    userName: '이*준',
    rating: 5,
    comment: '촉감이 정말 부드러워요. 잠이 잘 오네요.',
    image: 'https://picsum.photos/seed/review2/400/400',
    date: '2024-03-18'
  },
  {
    id: 'r3',
    productId: '1',
    userName: '박*현',
    rating: 4,
    comment: '암막 기능 확실합니다. 만족해요.',
    image: 'https://picsum.photos/seed/review3/400/400',
    date: '2024-03-15'
  }
];
