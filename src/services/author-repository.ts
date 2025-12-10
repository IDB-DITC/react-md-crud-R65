import axios from "axios"
import Author from "../model/author";
import { axios_config } from "./auth-api";



const http = axios.create({
    baseURL: "https://localhost:7209/api",
    headers: axios_config.headers
})

export async function GetAuthorList() {
    return await http.get<Author[]>('/author')
}

async function GetAuthor(id?: string) {
    try {
        return await http.get<Author>(`/author/${id}`)
    } catch (e) {
        console.log(e);
    }

}

async function SaveAuthor(data: Author) {
    if (data.id === 0 || data.id == null) {
        return await http.post<Author>("/author", data);
    }
    else {
          return await http.put<Author>(`/author/${data.id}`, data);
    }
}
async function UpdateAuthor(data: Author) {
    try {
        return await http.put<Author>(`/author/${data.id}`, data);
    } catch (e) {
        console.log(e);
    }

}
async function DeleteAuthor(id: string) {
    return await http.delete(`/author/${id}`);
}

export default { GetAuthorList, GetAuthor, SaveAuthor, UpdateAuthor, DeleteAuthor }

