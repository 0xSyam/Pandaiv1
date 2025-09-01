// Data untuk konten detail materi
export const materialContent = {
  'zat-dan-perubahannya': {
    title: 'Zat dan Perubahannya',
    subtitle: 'Fisika - Kelas X SMA',
    progress: 0,
    duration: '45 menit',
    difficulty: 'Menengah',
    sections: [
      {
        id: 1,
        type: 'overview',
        title: 'Ringkasan Materi',
        content: 'Zat adalah segala sesuatu yang memiliki massa dan menempati ruang. Zat bisa berupa benda padat, cair, atau gas.',
        icon: 'book'
      },
      {
        id: 2,
        type: 'definition',
        title: 'Apa itu Zat?',
        content: 'Zat adalah segala sesuatu yang memiliki massa dan menempati ruang. Zat bisa berupa benda padat, cair, atau gas.',
        subsections: [
          {
            title: 'Jenis-jenis Zat:',
            points: [
              {
                title: 'Zat Tunggal',
                description: 'Unsur → zat murni yang tidak bisa diuraikan lagi',
                examples: ['Oksigen (O₂)', 'Emas (Au)']
              },
              {
                title: 'Senyawa', 
                description: 'Gabungan dua atom atau lebih unsur',
                examples: ['Air (H₂O)', 'Garam (NaCl)']
              }
            ]
          },
          {
            title: 'Campuran',
            points: [
              {
                title: 'Campuran Homogen',
                description: 'Gabungan dua atau lebih zat yang tidak berselat membentuk zat baru',
                examples: ['Air gula', 'air laut', 'udara']
              }
            ]
          }
        ]
      },
      {
        id: 3,
        type: 'process',
        title: 'Perubahan Zat',
        content: 'Perubahan zat dibagi menjadi dua:',
        subsections: [
          {
            title: '1. Perubahan Fisika',
            points: [
              {
                title: 'Ciri',
                description: 'Tidak membentuk zat baru',
                examples: ['Es mencair jadi air', 'air menguap jadi uap']
              },
              {
                title: 'Proses',
                description: 'wujud berubah → padat, cair, gas',
                examples: []
              }
            ]
          },
          {
            title: '2. Perubahan Kimia',
            points: [
              {
                title: 'Ciri',
                description: 'Membentuk zat baru dengan sifat berbeda',
                examples: []
              }
            ]
          }
        ]
      }
    ],
    keyPoints: [
      'Zat memiliki massa dan menempati ruang',
      'Ada 3 jenis zat: unsur, senyawa, dan campuran',
      'Perubahan fisika tidak membentuk zat baru',
      'Perubahan kimia membentuk zat baru'
    ],
    quiz: {
      questions: 15,
      timeLimit: 30
    },
    exercises: {
      count: 4,
      types: ['Pilihan Ganda', 'Essay', 'Benar/Salah']
    }
  },
  'suhu-kalor-pemuaian': {
    title: 'Suhu, Kalor, dan Pemuaian',
    subtitle: 'Fisika - Kelas X SMA',
    progress: 0,
    duration: '50 menit',
    difficulty: 'Menengah',
    sections: [
      {
        id: 1,
        type: 'overview',
        title: 'Ringkasan Materi',
        content: 'Suhu adalah besaran yang menyatakan derajat panas atau dingin suatu benda. Kalor adalah energi yang berpindah dari benda bersuhu tinggi ke benda bersuhu rendah.',
        icon: 'thermometer'
      }
    ],
    keyPoints: [
      'Suhu menggunakan skala Celsius, Fahrenheit, Kelvin',
      'Kalor berbeda dengan suhu',
      'Pemuaian terjadi karena kenaikan suhu'
    ],
    quiz: {
      questions: 12,
      timeLimit: 25
    },
    exercises: {
      count: 3,
      types: ['Pilihan Ganda', 'Benar/Salah']
    }
  }
};
