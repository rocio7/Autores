import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const TodosAutores = () => {

    const [autores, setAutores] = useState([]);


    useEffect(() =>{
        axios.get("http://localhost:8000/api/autores")
            .then(res => setAutores(res.data))
            .catch(error => console.log(error));
    }, [])

    const borrarAutor = idAutor => {

        axios.delete("http://localhost:8000/api/autores/"+idAutor)
            .then(res => {
                let nuevaLista = autores.filter(autor => autor._id !== idAutor);
                setAutores(nuevaLista);
            })
    }

    return (
        <div>
            <h1>Autores</h1>
            <Link to="/nuevo" className="btn btn-success">Nuevo Autor</Link>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Libros</th>
                        <th>Artículos</th>
                        <th>Novela Gráfica</th>
                        <th>Cuentos</th>
                        <th>Fecha de Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        autores.map((autor, index) => (
                            <tr key={index}>
                                <td>{autor.nombre}</td>
                                <td><img className="img-fluid" src={autor.imagen} alt={"img-"+autor.nombre}/></td>
                                <td>
                                    { autor.libros ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}
                                </td>
                                <td>
                                    { autor.articulos ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}
                                </td>
                                <td>
                                    { autor.novelagrafica ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}
                                </td>
                                <td>
                                    { autor.cuentos ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}
                                </td>
                                <td>{autor.createdAt}</td>
                                <td>
                                    <Link to={`/autor/editar/${autor._id}`} className="btn btn-warning">Editar</Link>
                                    <button className="btn btn-danger" onClick={() => borrarAutor(autor._id)}>Borrar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default TodosAutores;