const buildUserDTOResponse = user => {
    return {
        name : user.name,
        email : user.email,
        plan : user.plan,
        orderCount : user.orderCount
    }
}

module.exports = { buildUserDTOResponse };