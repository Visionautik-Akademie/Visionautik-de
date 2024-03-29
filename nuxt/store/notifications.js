export const state = () => ({
  stack: [],
})

export const mutations = {
  add(state, payload) {
    if (!payload.id) payload.id = Math.random().toString().split('.').pop()
    const idExists = state.stack.find(
      (notification) => notification.id == payload.id
    )
    if (!idExists) state.stack.push(payload)
  },

  remove(state, id) {
    const index = state.stack.findIndex(
      (notification) => notification.id === id
    )
    if (!(index < 0)) state.stack.splice(index, 1)
  },
}

export const actions = {}
