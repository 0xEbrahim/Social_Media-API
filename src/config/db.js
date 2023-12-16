import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/SocialMedia').then(() => {
  console.log('Database\'s running');
});
