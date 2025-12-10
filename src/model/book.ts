import { Genre, GenreList } from "./genre";
import * as Yup from "yup";
export default class Book {
    isbn: string = '';
    title: string = '';
    available: boolean = true;
    edition: number = 1;
    genre: Genre = Genre.Biography;
    publishDate: Date | null = new Date();
    //publishDate?: string = new Date().toISOString();
}


//Yup.addMethod(Yup.mixed, 'enum', function(this, enumValue) {
//  return this.oneOf(Object.values(enumValue));
//});

export const BookSchema = Yup.object<Book>().shape({
    isbn: Yup.string().required().label("ISBN"),
    title: Yup.string().required().label("Title"),
    available: Yup.boolean().default(true),
    edition: Yup.number().default(1),
    genre: Yup.mixed<Genre>().oneOf(GenreList).required().label("Genre"),
    publishDate: Yup.date().required().default(new Date())
})
