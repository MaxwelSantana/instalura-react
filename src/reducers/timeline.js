export function timeline(state=[], action) {
    if(action.type === 'LISTAGEM'){
        return action.fotos;
    }

    if(action.type === 'COMENTARIO'){
        const fotoAchada = state.find(foto => foto.id === action.fotoId);
        fotoAchada.comentarios.push(action.novoComentario);

        return state;
    }

    if(action.type === 'LIKE'){
        const fotoAchada = state.find(foto => foto.id === action.fotoId);
        fotoAchada.likeada = !fotoAchada.likeada;

        const liker = action.liker;
        const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

        if(possivelLiker){
            const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
            fotoAchada.likers = novosLikers;
        }
        else{
            fotoAchada.likers.push(liker);
        }
        return state;
    }

    return state;
}