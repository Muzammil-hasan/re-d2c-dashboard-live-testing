import { create } from "zustand"

import progressList from "~/json/progress-list.json"

export const useReviewStore = create((set) => ({
  formId: "",
  progressList,
  currentIndex: 0,
  previewOpen: false,
  amount: {
    motorcycleAmount: 0,
    bookingAmount: 0,
    loanAmount: 0,
    paid: 0,
  },
  currentProfile: {},
  previewState: { documentName: "", files: [], documentType: "image" },
  setAmount: (amount) => set(() => ({ amount })),
  togglePreview: (state) => set(() => ({ previewOpen: state })),
  resetPreviewState: () =>
    set(() => ({ previewState: { documentName: "", files: [] } })),
  setFormId: (formId) => set(() => ({ formId })),
  setPreviewState: (payload) =>
    set((state) => ({ previewState: { ...state.previewState, ...payload } })),
  setCurrentProfile: (key) => {
    return set((state) => {
      const profile = state.progressList.find((obj) => obj.status === key)
      const index = profile.index
      const updatedList = state.progressList.map((profile) =>
        index === 0
          ? { ...profile, done: false }
          : profile.index < index
          ? { ...profile, done: true }
          : profile
      )
      return {
        currentProfile: profile,
        formId: profile.formId,
        currentIndex: profile.index,
        progressList: updatedList,
      }
    })
  },
}))
