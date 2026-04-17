import img200 from '../200.png'
import img100 from '../100.png'
import img50 from '../50.png'
import img20 from '../20.png'
import img10 from '../10.png'
import img5 from '../5.png'
import img2 from '../2.png'
import img1 from '../1.png'
import img05 from '../05.png'
import img01 from '../01.png'

export const SMALL_CASH_DENOMS = [
  { key: '20',  value: 20,  label: 'שטר 20 ₪',           img: img20  },
  { key: '10',  value: 10,  label: 'מטבע 10 ₪',          img: img10  },
  { key: '5',   value: 5,   label: 'מטבע 5 ₪',           img: img5   },
  { key: '2',   value: 2,   label: 'מטבע 2 ₪',           img: img2   },
  { key: '1',   value: 1,   label: 'מטבע 1 ₪',           img: img1   },
  { key: '0.5', value: 0.5, label: 'חצי שקל',            img: img05  },
  { key: '0.1', value: 0.1, label: 'מטבע 10 אגורות',     img: img01  },
]

export const ENVELOPE_DENOMS = [
  { key: '200', value: 200, label: 'שטר 200 ₪',          img: img200 },
  { key: '100', value: 100, label: 'שטר 100 ₪',          img: img100 },
  { key: '50',  value: 50,  label: 'שטר 50 ₪',           img: img50  },
]

export const ALL_DENOMS = [
  { key: '200', value: 200, label: '200 ₪', img: img200 },
  { key: '100', value: 100, label: '100 ₪', img: img100 },
  { key: '50',  value: 50,  label: '50 ₪',  img: img50  },
  { key: '20',  value: 20,  label: '20 ₪',  img: img20  },
  { key: '10',  value: 10,  label: '10 ₪',  img: img10  },
  { key: '5',   value: 5,   label: '5 ₪',   img: img5   },
  { key: '2',   value: 2,   label: '2 ₪',   img: img2   },
  { key: '1',   value: 1,   label: '1 ₪',   img: img1   },
  { key: '0.5', value: 0.5, label: 'חצי שקל', img: img05  },
  { key: '0.1', value: 0.1, label: '10 אג׳', img: img01  },
]

export const CHECKLIST_ITEMS = [
  'רשמתי את הכסף הקטן על הפתק שבתוך הקופה',
  'רשמתי תאריך על הפתק',
  'הכנסתי את השטרות למעטפה',
  'הכנסתי את השוברים למעטפה',
  'רשמתי את הפרטים על המעטפה',
  'השחלתי את המעטפה לכספת',
]
