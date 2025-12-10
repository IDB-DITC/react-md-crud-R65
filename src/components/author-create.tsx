import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from "react-router"
import repo from "../services/author-repository"
import Author, { AuthorSchema } from '../model/author';
import ConvertBase64 from "../services/FileConverter"
import { Formik, Field, Form, FormikErrors, FieldArray, ErrorMessage, FormikHelpers, } from "formik"
import Book from '../model/book';
import { GenreList } from '../model/genre';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function AuthorCreate() {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();



    const selectListsData = GenreList;

    const [model, updateModel] = useState<Author>(new Author());
    const [fix, renderFix] = useState<boolean>(true);
    function OnFileChange(evt: any) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
            model.photo = e.target.result;
            updateModel(model);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
            return error;
        };
        reader.readAsDataURL(evt.target.files[0]);
    }

    async function loadData() {
        if (!params.id) {
            return;
        }
        var res = await repo.GetAuthor(params.id);
        if (res == null) {
            alert('not found');
            navigate("/")
            return;
        }

        updateModel(res.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    //function AddBook() {
    //    model.books.push(new Book());
    //    updateModel(model);
    //    renderFix(a => !a);
    //}

    //function RemoveBook(idx: number) {
    //    model.books.splice(idx, 1);
    //    updateModel(model);
    //    renderFix(a => !a);
    //}


    async function SubmitHandler(formValues: Author, helpers: FormikHelpers<Author>) {
        try {
            const data = { ...formValues };
            if (model.photo) {
                data.photo = model.photo;
            }

            console.log(data);

            var res = await repo.SaveAuthor(data);
            console.log(res.status)
            console.log(res.statusText)
            if (res.status >= 200 && res.status < 300) {

                toast.success("Author saved successfully", { autoClose: 3000 });
                navigate("/");
            }
            else if (res.status >= 401 && res.status < 404) {
                toast.warning("Unauthorized access - please log in", { autoClose: 3000 });

                navigate("/login");
            }
            else {
                toast.error("Failed to save author", { autoClose: 3000 });
                helpers.setErrors({} as FormikErrors<Author>);
            }


        } catch (e) {
            console.log(e);
            toast.error("An error occurred while saving the author", { autoClose: 3000 });
        }
    }
    return (
        <Formik
            enableReinitialize
            initialValues={model}
            validateOnChange={true}
            validationSchema={AuthorSchema}
            onSubmit={SubmitHandler}
        //onreset={() => navigate("/")}
        >{(formProps) => (
            <Form>
                <fieldset>
                    <legend>Author Details</legend>

                    <div className="row g-3">
                        <div className="col-md-8">
                            <div className="form-floating">

                                <Field name="authorName" className="form-control" placeholder="Author name" />
                                <label className="form-label" >Author Name :</label>
                                <ErrorMessage name="authorName" className="" component="div"></ErrorMessage>
                            </div>
                            <div className="form-floating">
                                <Field name="upload" type="file" accept="image/*" className="form-control" placeholder="Upload Photo" onChange={OnFileChange} />
                                <label className="form-label">Photo :</label>

                                <ErrorMessage name="photo" component="div"></ErrorMessage>


                            </div>
                        </div>
                        <div className="col-md-4">
                            {model.photo && (

                                <figure className="figure m-3">

                                    <img className="figure-img img-fluid rounded img-preview img-thumbnail" src={model.photo} width="200" alt="upload" />
                                    <figcaption className="figure-caption text-center">
                                        <button type="button" className="btn-danger btn  text-center" onClick={() => {
                                            model.photo = "";
                                            updateModel(model);
                                            renderFix(a => !a);
                                        }}>Remove photo</button>
                                    </figcaption>
                                </figure>


                            )}
                        </div>
                    </div>




                    <div>
                        <FieldArray name="books">
                            {(arrayProps) => (

                                <div className="m-3">
                                    <button type="button" className="btn btn-info mb-2" onClick={() => arrayProps.push(new Book())}>
                                        Add
                                    </button>
                                    <div className="row row-cols-1 row-cols-md-2  row-cols-xl-3 g-3">

                                        {formProps.values.books.length > 0 && formProps.values.books.map((book, index) => (
                                            <div key={index} className="col">
                                                <div className="card">
                                                    <div className="card-header d-flex justify-content-between align-items-center">
                                                        Book Info.
                                                        <div className=" form-check  form-switch ">
                                                            <label className="form-check-label">
                                                                Available?

                                                                <Field type="checkbox" className="form-check-input" name={`books.${index}.available`} />
                                                            </label>
                                                            <ErrorMessage name={`books.${index}.available`} component="div" />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn-close text-danger"
                                                            aria-label="Close"
                                                            data-bs-dismiss="card"

                                                            onClick={() => arrayProps.remove(index)}
                                                        ></button>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="form-floating">

                                                            <Field name={`books.${index}.isbn`} className="form-control" placeholder="Enter ISBN" />
                                                            <label>ISBN:</label>
                                                            <ErrorMessage name={`books.${index}.isbn`} component="div" />
                                                        </div>
                                                        <div className="form-floating">

                                                            <Field name={`books.${index}.title`} className="form-control" placeholder="Enter Title" /><label>Title:</label>
                                                            <ErrorMessage name={`books.${index}.title`} component="div" />
                                                        </div>
                                                        <div className="input-group p-2">
                                                            <label className="input-group-text">Genre:</label>
                                                            <Field as="select" name={`books.${index}.genre`} className="form-select" placeholder="Select Genre">
                                                                <option value="">Select Genre</option>
                                                                {selectListsData.map(elm => {
                                                                    return <option key={elm} value={elm}>{elm}</option>
                                                                })}

                                                            </Field>

                                                            <ErrorMessage name={`books.${index}.genre`} component="div" />
                                                        </div>
                                                        <div className=" input-group flex-nowrap p-2">
                                                            <label className="input-group-text">Edition:  </label>
                                                            <Field name={`books.${index}.edition`} type="range" placeholder="" className="form-control" min={1} max={10} />

                                                            <span className="input-group-text" > {formProps.values.books[index].edition} </span>

                                                            <ErrorMessage name={`books.${index}.edition`} component="div" />
                                                        </div>

                                                        <div className=" input-group flex-nowrap p-2">
                                                            <label className="input-group-text">Pub. Date:  </label>
                                                            <Field name={`books.${index}.publishDate`} type="date" className="form-control" placeholder="Enter Date" />

                                                            {/*<DatePicker name={`books.${index}.publishDate`}*/}
                                                            {/*    selected={book.publishDate}*/}
                                                            {/*    onChange={(date) => book.publishDate = date}*/}
                                                            {/*    dateFormat="yyyy/MM/dd" // Example: Day/Month/Year*/}
                                                            {/*/>*/}
                                                            <ErrorMessage name={`books.${index}.publishDate`} component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="card-footer">

                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                    </div>


                    <hr />
                    <div className="btn-group">
                        <button type="submit" disabled={formProps.isSubmitting} className="btn btn-success">Save</button>
                        <button type="reset" className="btn btn-secondary">Cancel</button>
                        <Link to="/" className="btn btn-info">Go to Index</Link>
                    </div>

                </fieldset>

            </Form>
        )}


        </Formik>
    );
}