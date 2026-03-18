import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AssessmentState } from '@/types'

interface AssessmentStore extends AssessmentState {
  update: (data: Partial<AssessmentState>) => void
  reset: () => void
}

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set) => ({
      update: (data) => set((state) => ({ ...state, ...data })),
      reset: () => set({
        a1c: undefined,
        weight: undefined,
        height: undefined,
        hasHF: undefined,
        hfType: undefined,
        hasCKD: undefined,
        egfr: undefined,
        uacr: undefined,
        hasASCVD: undefined,
        hasStrokeTIA: undefined,
        hasMASLD: undefined,
      }),
    }),
    { name: 'dm-assessment' }
  )
)
