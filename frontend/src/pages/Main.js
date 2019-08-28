import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import  './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';

export default function Main({ match }){
    const[users, setUsers] = useState([]);

    useEffect(()=> {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers:{
                    user:match.params.id,
                }
            })
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers : {user: match.params.id},
        })

        // Chama a função setUsers para filtrar e mostrar na tela somente usuários cujo id é diferente do que
        // foi passado no parametro
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers : {user: match.params.id},
        })

        // Chama a função setUsers para filtrar e mostrar na tela somente usuários cujo id é diferente do que
        // foi passado no parametro
        setUsers(users.filter(user => user._id !== id));
    }

    return(
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            {/* Se o tamanho da lista for maior que zero então mostra os conteudos
            se não mostra uma mensagem */}
            {users.length > 0 ?(
                <ul>
                {/* Percorrendo a array de users */}
                {users.map(user =>(
                    <li key={user._id}>
                    <img src={user.avatar} alt={user.name} />
                    <footer>
                        <strong>{user.name}</strong>
                        <p>{user.bio}</p>
                    </footer>
                    <div className="buttons">
                        <button type="button" onClick={()=> handleDislike(user._id)}>
                            <img src={dislike} alt="Dislike" />
                        </button>
                        <button type="button" onClick={()=> handleLike(user._id)}>
                            <img src={like} alt="Like" />
                        </button>
                    </div> 
                </li>
                ))}
            </ul>
            ):(
                <div className="empty"> Acabou :( </div>
            )}
        </div>

    );
}