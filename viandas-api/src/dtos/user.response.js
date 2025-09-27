const buildUserDTOResponse = user => {
    return {
        username : user.username,
        email : user.email,
        plan : user.plan,
        orderCount : user.orderCount
    }
}

module.exports = { buildUserDTOResponse };