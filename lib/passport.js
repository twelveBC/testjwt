const passport = require('passport')
const { Strategy : JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Users } = require('../models')

const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'ini rahasia gaboleh disebar-sebar'
}

passport.use(new JwtStrategy(options, async (payload,done) => {
    Users.findByPk(payload.id)
    .then(user => done(null,user))
    .catch(err => done(err,false))
}))
module.exports = passport