import Book, { BookSchema }  from "./book";
import * as Yup from "yup";
export default class Author {
  id: number = 0;
  authorName: string = '';
  photo?: string;
  books: Book[] = []; 
}

export const AuthorSchema = Yup.object<Author>().shape({
    id: Yup.number().optional(),
    authorName: Yup.string().required().min(3).max(50).label("Author Name"),
    photo: Yup.string().optional().nullable(),
    books: Yup.array<Book>().of(BookSchema).default([])
})

