fetch('./data/books_json.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        for (let i = 0; i < json.length; i++) {
            console.log(json[i]._id);
        }
    });