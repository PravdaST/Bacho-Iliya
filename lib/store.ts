import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  nameBg: string;
  image: string;
  description: string;
  bachoRecommendation?: string;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  selectedProducts: string[];
}

export interface TaskStatus {
  facebook: boolean;
  instagram: boolean;
  share: boolean;
}

interface GiveawayState {
  // Current step
  currentStep: number;
  setCurrentStep: (step: number) => void;

  // User data
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;

  // Selected products
  selectedProducts: string[];
  toggleProduct: (productId: string) => void;
  setSelectedProducts: (products: string[]) => void;

  // Task completion
  tasks: TaskStatus;
  completeTask: (task: keyof TaskStatus) => void;
  toggleTask: (task: keyof TaskStatus) => void;

  // Entry ID
  entryId: string | null;
  setEntryId: (id: string) => void;
  generateEntryId: () => void;

  // Share count for viral tracking
  shareCount: number;
  incrementShareCount: () => void;
  setShareCount: (count: number) => void;

  // Referral tracking
  referredBy: string | null; // Entry ID of referrer
  setReferredBy: (referrerId: string | null) => void;

  // Reset
  reset: () => void;
}

export const useGiveawayStore = create<GiveawayState>()(
  persist(
    (set) => ({
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),

      userData: {
        name: '',
        email: '',
        phone: '',
        selectedProducts: [],
      },
      setUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),

      selectedProducts: [],
      toggleProduct: (productId) =>
        set((state) => ({
          selectedProducts: state.selectedProducts.includes(productId)
            ? state.selectedProducts.filter((id) => id !== productId)
            : [...state.selectedProducts, productId],
        })),
      setSelectedProducts: (products) => set({ selectedProducts: products }),

      tasks: {
        facebook: false,
        instagram: false,
        share: false,
      },
      completeTask: (task) =>
        set((state) => ({
          tasks: { ...state.tasks, [task]: true },
        })),
      toggleTask: (task) =>
        set((state) => ({
          tasks: { ...state.tasks, [task]: !state.tasks[task] },
        })),

      entryId: null,
      setEntryId: (id) => set({ entryId: id }),
      generateEntryId: () => {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
        const entryId = `BI-${timestamp}-${randomStr}`;
        set({ entryId });
      },

      shareCount: 0,
      incrementShareCount: () =>
        set((state) => ({
          shareCount: state.shareCount + 1,
        })),
      setShareCount: (count) => set({ shareCount: count }),

      referredBy: null,
      setReferredBy: (referrerId) => set({ referredBy: referrerId }),

      reset: () =>
        set({
          currentStep: 1,
          userData: {
            name: '',
            email: '',
            phone: '',
            selectedProducts: [],
          },
          selectedProducts: [],
          tasks: {
            facebook: false,
            instagram: false,
            share: false,
          },
          entryId: null,
          shareCount: 0,
          referredBy: null,
        }),
    }),
    {
      name: 'bacho-giveaway-storage',
    }
  )
);

// Available products - One representative from each category
export const products: Product[] = [
  {
    id: 'sirene-800',
    name: 'White Cheese 800g',
    nameBg: 'Бяло сирене 800г',
    image: '/products/sirene/BI-sirene-800-metal-480x480.png',
    description: 'Класическо бяло краве сирене в метална кутия',
    bachoRecommendation: 'За големи семейства. Точно като на село - в метална кутия да си държи вкуса.',
  },
  {
    id: 'kashkaval-1500',
    name: 'Yellow Cheese 1.5kg',
    nameBg: 'Кашкавал 1.5кг',
    image: '/products/kashkaval/BI-kashkaval-1500-480x480.png',
    description: 'Зряло желто сирене 1.5кг',
    bachoRecommendation: 'Зрее 3 месеца. Любимото на внуците ми - за баница или на топло.',
  },
  {
    id: 'yogurt-45',
    name: 'Yogurt 4.5%',
    nameBg: 'Кисело мляко 4.5%',
    description: 'Гъсто българско кисело мляко',
    image: '/products/kiselo-mlqko/BI-kiselo-mlyqko-4.5-480x480.jpg',
    bachoRecommendation: 'Най-гъстото. Както бабата го правеше - с корица отгоре.',
  },
  {
    id: 'airan',
    name: 'Airan',
    nameBg: 'Айран',
    description: 'Освежаващ традиционен айран',
    image: '/products/airan/Ayran-1000-480x480.jpg',
    bachoRecommendation: 'В жегата - животоспасяващ! Работиш ли на градина, това ти е спасението. Баща ми така преживя лятото.',
  },
  {
    id: 'protein',
    name: 'Protein',
    nameBg: 'Протеин',
    description: 'Протеинова напитка с натурално мляко',
    image: '/products/protein/BachoIliya-Protein-480x480.png',
    bachoRecommendation: 'За младите спортисти. Внукът ми тренира - иска чисто, без химия. Ето го - сила от природата!',
  },
];
