import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { db } from '../db/connection';
import bcrypt from 'bcrypt';
import { users } from '../db/schema';
import { sql, eq } from 'drizzle-orm';
import { Express } from 'express';

// Define User type based on our schema
type User = {
  id: number;
  uuid: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
};

declare global {
  namespace Express {
    interface User {
      id: number;
      uuid: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
    }
  }
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const result = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
      const user = result[0] as User | undefined;

      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Check if account is locked
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        const remainingTime = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
        return done(null, false, {
          message: `Account is locked. Please try again in ${remainingTime} minutes.`
        });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        // Increment failed login attempts
        const failedAttempts = (user.failedLoginAttempts || 0) + 1;
        const updates: Partial<User> = { failedLoginAttempts: failedAttempts };
        
        if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
          updates.lockedUntil = new Date(Date.now() + LOCK_TIME);
        }

        await db.update(users)
          .set(updates)
          .where(eq(users.id, user.id));

        const attemptsLeft = MAX_LOGIN_ATTEMPTS - failedAttempts;
        return done(null, false, {
          message: attemptsLeft > 0
            ? `Invalid email or password. ${attemptsLeft} attempts remaining.`
            : 'Account locked due to too many failed attempts. Please try again later.'
        });
      }

      // Reset failed login attempts on successful login
      if (user.failedLoginAttempts > 0) {
        await db.update(users)
          .set({
            failedLoginAttempts: 0,
            lockedUntil: null,
            lastLogin: new Date()
          })
          .where(eq(users.id, user.id));
      }

      return done(null, {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      });
    } catch (error) {
      console.error('Login error:', error);
      return done(error instanceof Error ? error : new Error('An unknown error occurred'));
    }
  }
));

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await db.select({
      id: users.id,
      uuid: users.uuid,
      email: users.email,
      role: users.role,
      firstName: users.firstName,
      lastName: users.lastName
    })
    .from(users)
    .where(eq(users.id, id));
    
    const user = result[0];
    done(null, user || null);
  } catch (error) {
    console.error('Deserialization error:', error);
    done(error instanceof Error ? error : new Error('An unknown error occurred'));
  }
});

export default passport;
