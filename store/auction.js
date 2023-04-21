export const state = () => ({
  selectedNft:''
})

export const mutations = {
 selectNft(state,payload){
    state.selectedNft=payload
 }
}