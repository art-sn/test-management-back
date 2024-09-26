import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
