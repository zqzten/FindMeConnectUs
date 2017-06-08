const getters = {
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    user_id: state => state.user.user_id,
    registered_date: state => state.user.registered_date,
    games: state => state.user.games,
    signature: state => state.user.signature,
    model: state => state.user.model,
    token: state => state.user.token
}
export default getters
