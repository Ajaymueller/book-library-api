const Sequelize = require('sequelize');
const ReaderModel = require('./reader');
const BookModel = require('./book');
const AuthorModel = require('./author');
const GenreModel = require('./genre');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  });

  const Reader = ReaderModel(sequelize, Sequelize);
  const Book = BookModel(sequelize, Sequelize);
  const Author = AuthorModel(sequelize, Sequelize);
  const Genre = GenreModel(sequelize, Sequelize);
  Genre.hasMany(Book, { as: 'Book', foreignKey: 'genreId' });
  Book.belongsTo(Genre, { as: 'Genre', foreignKey: 'genreId' });
  Author.hasMany(Book, { as: 'Book', foreignKey: 'authorId' });
  Book.belongsTo(Author, { as: 'Author', foreignKey: 'authorId' });

  sequelize.sync({ alter: true });
  return {
    Author,
    Genre,
    Reader,
    Book,
  };
};

module.exports = setupDatabase();
