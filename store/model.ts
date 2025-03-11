import { create } from 'zustand'

type State = {
  model: string
}

type Actions = {
  updateModel: (model : State["model"]) => void

}

const useModelStore = create<State & Actions>((set) => ({
  model: "gpt-3.5-turbo",
  updateModel: (model) => set(() => ( {model})),
}))