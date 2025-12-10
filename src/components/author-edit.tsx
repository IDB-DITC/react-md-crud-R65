import { useParams, redirect, useNavigate } from "react-router"
import repo from "../services/author-repository"
import Author from "../model/author";
import { useEffect, useState } from "react";
export default function AuthorEdit()
{
    const [model, setModel] = useState<Author>(new Author());
    const navigate = useNavigate();

    const params = useParams < {id:string, editId:string}>();

    async function loadData() {
        var res = await repo.GetAuthor(params.editId);
        if (res == null) {
            alert('not found');
            navigate("/")
            return;
        }      

        setModel(res.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    return <>

        Author id is {params.id} , edit id: {params.editId}


        <div>
            <h1>{model?.authorName}</h1>
            <p>{model?.id}</p>
        </div>

    </>
}