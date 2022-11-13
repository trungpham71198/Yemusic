import type { Document } from 'mongoose';
import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

export type PlayListDocument = {
  _id: unknown;
  name: string;
  description?: string;
  owner: unknown;
  songs: unknown[];
  isLikedTrack: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
};

const playListSchema = new Schema(
  {
    name: String,
    description: String,

    owner: {
      type: ObjectId,
      ref: 'user',
    },
    songs: {
      type: String,
    },

    isLikedTrack: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const PlayList = mongoose.model<PlayListDocument & Document>(
  'playlist',
  playListSchema
);
