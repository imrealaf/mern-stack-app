import bcrypt from "bcryptjs";
import mongoose from "mongoose";

/**
 *  Compare password function type
 */
export type ComparePasswordFunction = (
  candidatePassword: string
) => Promise<boolean>;

/**
 *  User role type
 */
export type UserRole = "admin" | "subscriber";

/**
 *  User interface
 */
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  date: Date;
  role: UserRole;
  isActive: boolean;
  emailIsVerified: boolean;
  adminSecret?: string;

  facebookId?: string;
  googleId?: string;
  linkedinId?: string;

  profile: {
    name: string;
    gender?: string;
    location?: string;
    website?: string;
    photo?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };

  comparePassword: ComparePasswordFunction;
}

/**
 *  User schema
 */
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  isActive: { type: Boolean, default: true },
  emailIsVerified: { type: Boolean, default: false },
  role: { type: String, default: "subscriber" },
  date: { type: Date, default: Date.now },
  adminSecret: String,

  facebookId: String,
  linkedinId: String,
  googleId: String,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    photo: String,
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String
  }
});

/**
 *  User password generation on pre-save
 */
userSchema.pre("save", async function save(next) {
  const user = this as IUser;

  // Skip if password is not modified
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

/**
 *  Compare password method
 */
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
} as ComparePasswordFunction;

export const User = mongoose.model<IUser>("User", userSchema);
