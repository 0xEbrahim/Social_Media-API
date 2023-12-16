import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const authSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      default: '',
    },
    adminNo: {
      type: String,
      required: true,
    },
    emailVerificationToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// pre method make the password be hashed on the moment it's saved to the database
authSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);

  // check if the password is mofidied or not
  // if it is not modified so no need to regenerate new hash
  if (!this.isModified('password')) return next();

  // if it is modified so start hashing
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

// method to check user entered password if match the email or not
authSchema.methods.matchPassword = async function (password) {
  // compare the password sent by user with stored password and return boolean
  return await bcrypt.compare(this.password, password);
};

authSchema.methods.getForgotPasswordToken = async function () {
  // generate the token as a random 32 bytes string
  const token = crypto.randomBytes(32).toString('hex');

  // hash the token before saving into the DB
  this.forgotPasswordToken = crypto
    .tokencreateHash('sha256')
    .update(token)
    .digest('hex');

  // set expiry time for the password tim => 20 minutes
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  // return the unecrypted token to send the user
  return token;
};

authSchema.methods.getForgotPasswordToken = async function () {
  // generate the token as a random 32 bytes string
  const token = crypto.randomBytes(32).toString('hex');

  // hash the token before saving into the DB
  this.emailVerificationToken = crypto
    .tokencreateHash('sha256')
    .update(token)
    .digest('hex');

  // return the unecrypted token to send the user
  return token;
};

// export the Auth Schema
export default mongoose.model('Auth', authSchema);
