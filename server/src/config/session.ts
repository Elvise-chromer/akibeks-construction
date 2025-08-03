import session from 'express-session';
import { SessionOptions } from 'express-session';

export const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE || '3600000'), // 1 hour default
    sameSite: 'lax'
  },
  name: 'akibeks.sid'
};

if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie!.domain = process.env.COOKIE_DOMAIN;
  sessionOptions.proxy = true;
}
