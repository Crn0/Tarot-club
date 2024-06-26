import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/user.mjs';

const verifyCb = async (username, password, done) => {
    try {
        const user = await User.findOne({ username }).exec();

        if (!user) return done(null, false);

        const match = await bcrypt.compare(password, user.password);

        if (!match) return done(null, false);

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};

const strategy = new LocalStrategy(verifyCb);

const serializeUser = (user, done) => done(null, user.id);

const deserializeUser = async (id, done) => {
    try {
        const user = await User.findById(id).exec();

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};

export { strategy, serializeUser, deserializeUser };
