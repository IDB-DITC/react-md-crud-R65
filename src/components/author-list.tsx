import React, { useEffect, useState } from 'react'
import repo from "../services/author-repository"
import {  toast } from 'react-toastify';

import { NavLink } from 'react-router';
import Author from '../model/author';


export default function AuthorList() {
    const [model, updateModel] = useState<Author[]>([]);

    async function LoadData() {
        try {
            var res = await repo.GetAuthorList();
            updateModel(res.data);
            toast.success("Author data loaded", { autoClose: 3000 });
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(function () {
        LoadData();
    }, [])

    return (<>

        <table className="table table-hover table-responsive table-striped table-light">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {
                    model.map((ath, idx) => {
                        return (

                            <AuthorRow {...ath} key={idx}></AuthorRow>
                        )
                    })
                }

            </tbody>
        </table>



    </>)


}


function AuthorRow(ath: Author, idx?: number) {
    return (<>
        <tr key={idx}>
            <td>{ath.id}</td>
            <td>{ath.authorName}</td>
            <td>
                {ath.photo && <figure>
                    <img src={ath.photo} width="100" className="img-thumbnail " alt={ath.authorName} />
                    <figcaption className="text-caption">{ath.authorName}</figcaption>
                </figure>}
               
            </td>
            <td>
                <NavLink to={`/edit/${ath.id}`}>edit-{ath.id}</NavLink>
            </td>
        </tr>
    </>)
}




