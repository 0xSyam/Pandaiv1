// Data untuk quiz dan latihan soal
export const quizData = {
  'zat-dan-perubahannya': {
    title: 'Quiz: Zat dan Perubahannya',
    description: 'Uji pemahaman Anda tentang materi zat dan perubahannya',
    timeLimit: 30, // dalam menit
    totalQuestions: 15,
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Apa yang dimaksud dengan zat?',
        options: [
          'Segala sesuatu yang memiliki massa dan menempati ruang',
          'Benda yang dapat dilihat dengan mata',
          'Materi yang dapat diraba',
          'Objek yang memiliki warna'
        ],
        correctAnswer: 0,
        explanation: 'Zat adalah segala sesuatu yang memiliki massa dan menempati ruang. Ini adalah definisi fundamental dalam fisika.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Manakah contoh perubahan fisika?',
        options: [
          'Kayu dibakar menjadi abu',
          'Es mencair menjadi air',
          'Besi berkarat',
          'Makanan membusuk'
        ],
        correctAnswer: 1,
        explanation: 'Es mencair menjadi air adalah perubahan fisika karena tidak ada zat baru yang terbentuk, hanya perubahan wujud.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Oksigen (O₂) termasuk dalam kategori?',
        options: [
          'Senyawa',
          'Campuran',
          'Unsur',
          'Larutan'
        ],
        correctAnswer: 2,
        explanation: 'Oksigen (O₂) adalah unsur karena terdiri dari atom-atom sejenis yang tidak dapat diuraikan lagi secara kimia.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'Air gula termasuk jenis?',
        options: [
          'Unsur',
          'Senyawa',
          'Campuran homogen',
          'Campuran heterogen'
        ],
        correctAnswer: 2,
        explanation: 'Air gula adalah campuran homogen karena gula larut sempurna dalam air sehingga tidak dapat dibedakan komponennya.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'Ciri utama perubahan kimia adalah?',
        options: [
          'Perubahan wujud',
          'Perubahan suhu',
          'Terbentuk zat baru',
          'Perubahan ukuran'
        ],
        correctAnswer: 2,
        explanation: 'Perubahan kimia ditandai dengan terbentuknya zat baru yang memiliki sifat berbeda dari zat asalnya.'
      }
    ]
  }
};

export const exerciseData = {
  'zat-dan-perubahannya': {
    title: 'Latihan Soal: Zat dan Perubahannya',
    description: 'Kerjakan latihan soal untuk memperdalam pemahaman',
    exercises: [
      {
        id: 1,
        type: 'multiple-choice',
        category: 'Pilihan Ganda',
        difficulty: 'Mudah',
        question: 'Garam dapur (NaCl) termasuk dalam kategori?',
        options: [
          'Unsur',
          'Senyawa',
          'Campuran',
          'Koloid'
        ],
        correctAnswer: 1,
        explanation: 'Garam dapur (NaCl) adalah senyawa karena terbentuk dari gabungan dua unsur yaitu Natrium (Na) dan Klorin (Cl).'
      },
      {
        id: 2,
        type: 'multiple-choice',
        category: 'Pilihan Ganda',
        difficulty: 'Sedang',
        question: 'Manakah yang termasuk perubahan kimia?',
        options: [
          'Air membeku',
          'Gula larut dalam air',
          'Kertas terbakar',
          'Lilin meleleh'
        ],
        correctAnswer: 2,
        explanation: 'Kertas terbakar adalah perubahan kimia karena menghasilkan zat baru berupa abu, gas karbon dioksida, dan uap air.'
      },
      {
        id: 3,
        type: 'essay',
        category: 'Essay',
        difficulty: 'Sulit',
        question: 'Jelaskan perbedaan antara campuran homogen dan campuran heterogen! Berikan masing-masing 2 contoh!',
        sampleAnswer: 'Campuran homogen adalah campuran yang komponennya tercampur merata dan tidak dapat dibedakan secara kasat mata. Contoh: air gula, udara. Campuran heterogen adalah campuran yang komponennya tidak tercampur merata dan masih dapat dibedakan. Contoh: air dan minyak, salad buah.',
        scoringCriteria: [
          'Menjelaskan definisi campuran homogen (25 poin)',
          'Menjelaskan definisi campuran heterogen (25 poin)',
          'Memberikan 2 contoh campuran homogen (25 poin)',
          'Memberikan 2 contoh campuran heterogen (25 poin)'
        ]
      },
      {
        id: 4,
        type: 'true-false',
        category: 'Benar/Salah',
        difficulty: 'Mudah',
        question: 'Udara termasuk campuran homogen.',
        correctAnswer: true,
        explanation: 'Benar. Udara adalah campuran homogen karena komponen-komponennya (nitrogen, oksigen, dll) tercampur merata.'
      }
    ]
  }
};
