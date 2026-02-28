module.exports.isOwner = (jwtUserId, BlogOwnId) => {
  return jwtUserId.toString() === BlogOwnId.toString();
};
