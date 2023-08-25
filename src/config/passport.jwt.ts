import dotenv from 'dotenv';
dotenv.config();
import { db } from '../model';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECERET
};

export default passport.use(new Strategy(opts, async function (jwtPayload, done) {
    try {
        const user = await db.userModel.findByPk(jwtPayload.id);
        if (user) {
            return done(null, user);
        }
    } catch (error) {
        return done(error, false);
    }
}));