export interface Drug {
  name: string
  class: string
  brand?: string
  a1cReduction: string
  weightEffect: string
  hypoRisk: string
  cvBenefit: string
  renalBenefit: string
  maslBenefit: string
  keyEffects: string[]
  contraindications: string[]
  dosing: string
  cost: 'Low' | 'Medium' | 'High'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  mode: 'brief' | 'explanatory'
  timestamp: number
}

export interface AssessmentState {
  a1c?: number
  weight?: number
  height?: number
  hasHF?: boolean
  hfType?: 'HFrEF' | 'HFpEF'
  hasCKD?: boolean
  egfr?: number
  uacr?: number
  hasASCVD?: boolean
  hasStrokeTIA?: boolean
  hasMASLD?: boolean
}
