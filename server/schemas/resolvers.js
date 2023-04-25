const { User, Book } = require('../models');
const {authMiddleware, signToken} = require("./../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    users: async (parent, args, context) => {
      return User.find();
    },
  },
  Mutation: {
    login: async (parent, {email, password}) => {
      const profile = await Profile.findOne({ email });
      
      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }
      
      const correctPw = await profile.isCorrectPassword(password);
      
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }
      
      const token = signToken(profile);
      return { token, profile };

    },
    createUser: async (parrent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return {token,user};
    },
    saveBook: async (parrent, {userId,bookId}, context) => {
      if (contect.user) {
	return User.findOneAndUpdate(
	  {_id: userId},
	  {$addToSet: { bookId}},
	  {
	    new:true,
	    runValidators: true
	  }
	);
      }
      new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parrent, {bookId}, context) => {
      if (context.user) {
	return User.findOneAndUpdate(
	  {_id: context.user._id},
	  {$pull: {bookId}},
	  {new: true}
	);
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }, 
};

module.exports = resolvers;
