export  enum Genre {
  Fiction,
  NonFiction,
  ScienceFiction,
  Fantasy,
  Mystery,
  Biography,
  History,
  Romance
}

export const GenreList = Object.values(Genre).filter(value => typeof value !== 'number') as Genre[];

export default Genre;