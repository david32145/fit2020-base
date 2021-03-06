import { Schema, model, Document, Model } from 'mongoose'

export interface ILive extends Document{
    status: string,
    streamKey: string,
    thumbnaimUrl: string,
    title: string
}

const liveSchema = new Schema({
  status: {
    type: String,
    enum: ['OPENED', 'CLOSED'],
    required: true
  },
  streamKey: {
    type: String,
    unique: true,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const LiveModel: Model<ILive> = model<ILive>('Live', liveSchema)
