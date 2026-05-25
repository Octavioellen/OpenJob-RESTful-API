exports.up = (pgm) => {
  pgm.addConstraint(
    'users',
    'unique_users_email',
    'UNIQUE(email)',
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('users', 'unique_users_email');
};