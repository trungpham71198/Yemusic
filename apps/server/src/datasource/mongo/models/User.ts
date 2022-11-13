import type { Document } from 'mongoose';
import mongoose from 'mongoose';

const { Schema } = mongoose;

export type UserDocument = {
  _id: unknown;
  displayName: string;

  email: string;
  username?: string;
  phone?: string;

  password: string;

  desc?: string;
  gender?: string;
  avatarUrl?: string;

  isValidEmail?: boolean;
  isBlocked?: boolean;

  createdAt: Date;
  updatedAt: Date;
  __v?: number;
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      index: true,
    },
    username: {
      type: String,
      index: true,
    },
    phone: {
      type: String,
      index: true,
    },

    password: { type: String },

    displayName: String,
    desc: String,
    avatarUrl: String,

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },

    isValidEmail: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument & Document>('user', userSchema);
