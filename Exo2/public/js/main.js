'use strict';
/* eslint-env browser, es6 */

// Pas besoin d'évenement window.onload puisqu'on utilise l'attribut defer
// lorsque l'on charge notre script
function loadGenres() {
    fetch('api/genres')
        .then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    console.log('Response pas ok pour obtenir les genres');
                }
            },
        )
        .then (
            genres =>  {
                const select = document.querySelector('#main nav form select');
                select.addEventListener('change', evt => {
                    // console.log(evt.target.value);
                    loadArtists(genres, evt.target.value); // on ignore la promesse puisqu'on en a besoin
                });
                genres.forEach(genre => {
                    const option = document.createElement('option');
                    option.value = genre['id'];
                    option.textContent = genre['name'];
                    select.add(option);
                });
                loadArtists(genres, select.firstChild.value); // on ignore la promesse puisqu'on en a besoin
            },
        )
        .catch(
            e => {
                console.log('Erreur', e);
                return {};
            },
        );
}

async function loadArtists(genres, genre_name) {
    const h2 = document.querySelector('#main h2');
    const genre = genres.find(genre => genre.id === genre_name);
    h2.textContent = `Top ${genre['name']} artists`;
    document.querySelector('#main > p').textContent = genre['description'];

    const artists_raw = await fetch(`api/genres/${genre_name}/artists`);
    const artists = await artists_raw.json();

    const ul = document.querySelector('#main ul');
    ul.innerHTML = '';
    artists.forEach(artist => {

        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const a = document.createElement('a');
        const img = document.createElement('img');

        h3.textContent = artist.name;
        img.setAttribute('src', artist.photo);
        a.id = artist.id;
        a.addEventListener('click', artistSelected);

        ul.appendChild(li);
        li.appendChild(a);
        li.appendChild(img);
        a.appendChild(h3);
    });

}

async function artistSelected(evt) {
    const albums_raw = await fetch(`api/artists/${evt.target.parentElement.id}/albums`);
    const albums = await albums_raw.json();

    const aside = document.querySelector('aside');
    aside.classList.add('seen');
    if (aside.classList.contains('unseen')) {
        aside.classList.remove('unseen');
    }

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // on remet à zéro le tbody

    albums.forEach(album => {
        const tr = document.createElement('tr');
        const td_cover = document.createElement('td');
        const img = document.createElement('img');
        const td_title = document.createElement('td');
        const td_year = document.createElement('td');
        const td_label = document.createElement('td');

        img.setAttribute('src', album.cover);
        td_title.textContent = album.title;
        td_year.textContent = album.year;
        td_label.textContent = album.label;

        td_cover.appendChild(img);
        tr.appendChild(td_cover);
        tr.appendChild(td_title);
        tr.appendChild(td_year);
        tr.appendChild(td_label);
        tbody.appendChild(tr);
    });

    const button = document.querySelector('button');
    button.addEventListener('click', async evt => {
        evt.preventDefault(); // on évite de partir sur une autre page
        const aside = document.querySelector('aside');
        aside.classList.add('unseen'); // on affiche, avec des classes pour les transitions
        aside.classList.remove('seen');
    });
}
loadGenres();