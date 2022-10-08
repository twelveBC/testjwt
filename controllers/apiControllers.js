const { Users } = require('../models')

function format(users) {
    const { id, username } = users
    return {
        id,
        username,
        accessToken : users.generateToken()
    }
}

class API {
    static dashboard(req,res){
        res.render('index', { title: 'Api' })
    }
    static login(req,res){
        Users.authenticate(req.body)
        .then(users => {
            res.json(
                format(users)
            )
        })
    }
    static whoami(req,res){
        const currentUser = req.user
        res.json(currentUser)
    }
}

module.exports = API