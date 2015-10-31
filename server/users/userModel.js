var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Q        = require('q'),
    SALT_WORK_FACTOR  = 10;


 //define schema - mealsSchema - to be nested
  var mealsSchema = new mongoose.Schema({
     title: String,
     price: Number,
     description: String,
     ingredients: {type: [String]},
     url: String
  });

  //define schema - userSchema, with nested meals
  var UserSchema = new mongoose.Schema({

  	username: {
    type: String,
    location: {type: [Number]}, // [Long, Lat]
    type: String, //this will either be CUSTOMER or VENDOR
    required: true,
    unique: true
  }, 

  password: {
    type: String,
    required: true
  },
  salt: String,
  meals: [mealsSchema],
  orders: [mealsSchema]
  });

//index the schema in 2dsphere format (for running a proximity search)
UserSchema.index({location:'2dsphere'})

UserSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('User',UserSchema)

// {User:
//   mongoose.model('User', UserSchema),
//   mealsSchema: mongoose.model('Meals',mealsSchema)
// }