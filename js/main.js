const basicAllOfTags = ["1girl1boy"];
const allOfTagsInsert = document.getElementById("all-of-tags");
const addAllOfText = document.getElementById("add-all-of");

const basicAnyOfTags = ["vaginal", "anal", "fellatio", "bondage"];
const anyOfTagsInsert = document.getElementById("any-of-tags");
const addAnyOfText = document.getElementById("add-any-of");

const basicNoneOfTags = ["gore", "creampie"];
const noneOfTagsInsert = document.getElementById("none-of-tags");
const addNoneOfText = document.getElementById("add-none-of");

const API_BASE_URL = 'https://api.rule34.xxx/index.php';

const insertImg = document.getElementById("insert-img");
const button = document.getElementById("generate-button");

const start = () => {
    if(sessionStorage.getItem("allOfTags") === null) {
        sessionStorage.setItem("allOfTags", basicAllOfTags)
    }
    if(sessionStorage.getItem("anyOfTags") === null) {
        sessionStorage.setItem("anyOfTags", basicAnyOfTags)
    }
    if(sessionStorage.getItem("noneOfTags") === null) {
        sessionStorage.setItem("noneOfTags", basicNoneOfTags)
    }
    let allOfTags = sessionStorage.getItem("allOfTags").split(",")
    let anyOfTags = sessionStorage.getItem("anyOfTags").split(",")
    let noneOfTags = sessionStorage.getItem("noneOfTags").split(",")

    allOfTagsInsert.innerHTML = "";
    anyOfTagsInsert.innerHTML = "";
    noneOfTagsInsert.innerHTML = "";
    if (allOfTags && allOfTags.length > 0) {
        let ul = document.createElement("ul");
        ul.className = "list-group";
        allOfTags.forEach(tag => {
            let row = document.createElement("div");
            row.className = "row g-0";
            let col11 = document.createElement("div");
            col11.className = "col-11 pe-0";
            let col1 = document.createElement("div");
            col1.className = "col-1 g-0";

            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = tag;
            let button = document.createElement("button");
            button.id = "remove-" + tag;
            button.className = "btn btn-light h-100"
            button.type = "button";
            button.innerHTML = "X"
            button.onclick = () => {
                sessionList = sessionStorage.getItem("allOfTags").split(",");
                let removeTag = button.id.split("-")[1];
                sessionList = remove(sessionList, element => element != removeTag);
                sessionStorage.setItem("allOfTags", sessionList);

                start();
            }
            col11.appendChild(li);
            col1.appendChild(button);
            row.appendChild(col11);
            row.appendChild(col1);
            ul.appendChild(row);
        })
        allOfTagsInsert.appendChild(ul);
    }
    
    if (anyOfTags && anyOfTags.length > 0) {
        let ul = document.createElement("ul");
        ul.className = "list-group";
        anyOfTags.forEach(tag => {
            let row = document.createElement("div");
            row.className = "row g-0";
            let col11 = document.createElement("div");
            col11.className = "col-11 pe-0";
            let col1 = document.createElement("div");
            col1.className = "col-1 g-0";

            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = tag;
            let button = document.createElement("button");
            button.id = "remove-" + tag;
            button.className = "btn btn-light h-100"
            button.type = "button";
            button.innerHTML = "X"
            button.onclick = () => {
                sessionList = sessionStorage.getItem("anyOfTags").split(",");
                let removeTag = button.id.split("-")[1];
                sessionList = remove(sessionList, element => element != removeTag);
                sessionStorage.setItem("anyOfTags", sessionList);

                start();
            }
            col11.appendChild(li);
            col1.appendChild(button);
            row.appendChild(col11);
            row.appendChild(col1);
            ul.appendChild(row);
        })
        anyOfTagsInsert.appendChild(ul);
    }
    
    if (noneOfTags && noneOfTags.length > 0) {
        let ul = document.createElement("ul");
        ul.className = "list-group";
        noneOfTags.forEach(tag => {
            let row = document.createElement("div");
            row.className = "row g-0";
            let col11 = document.createElement("div");
            col11.className = "col-11 pe-0";
            let col1 = document.createElement("div");
            col1.className = "col-1 g-0";

            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = tag;
            let button = document.createElement("button");
            button.id = "remove-" + tag;
            button.className = "btn btn-light h-100"
            button.type = "button";
            button.innerHTML = "X"
            button.onclick = () => {
                sessionList = sessionStorage.getItem("noneOfTags").split(",");
                let removeTag = button.id.split("-")[1];
                sessionList = remove(sessionList, element => element != removeTag);
                sessionStorage.setItem("noneOfTags", sessionList);

                start();
            }
            col11.appendChild(li);
            col1.appendChild(button);
            row.appendChild(col11);
            row.appendChild(col1);
            ul.appendChild(row);
        })
        noneOfTagsInsert.appendChild(ul);
    }
}

const addAllOf = () => {
    let tag = addAllOfText.value;
    allOfTags = sessionStorage.getItem("allOfTags").split(",")
    allOfTags.push(tag);
    allOfTags = [...new Set(allOfTags)];
    sessionStorage.setItem("allOfTags", allOfTags);

    start();
}

const addAnyOf = () => {
    let tag = addAnyOfText.value;
    anyOfTags = sessionStorage.getItem("anyOfTags").split(",")
    anyOfTags.push(tag);
    anyOfTags = [...new Set(anyOfTags)];
    sessionStorage.setItem("anyOfTags", anyOfTags);

    start();
}

const addNoneOf = () => {
    let tag = addNoneOfText.value;
    noneOfTags = sessionStorage.getItem("noneOfTags").split(",")
    noneOfTags.push(tag);
    noneOfTags = [...new Set(noneOfTags)];
    sessionStorage.setItem("noneOfTags", noneOfTags);

    start();
}

const getImage = async () => {
    insertImg.innerHTML = "";
    const randomPage = Math.floor(Math.random() * 10);

    const request = `${API_BASE_URL}?page=dapi&s=post&q=index&json=1&tags=${createQuery()}&pid=${randomPage}`;
    console.log(request)

    fetch(request, {
        method: "GET"
    }).then((response) => response.json())
        .then((json) => {
            let img = document.createElement("img");
            let requestP = document.createElement("p");
            requestP.innerHTML = request;
            insertImg.appendChild(requestP);
            let warning = document.createElement("p");
            warning.innerHTML = "The random access to the API didn't return a valid Image. Try again";
            let p = document.createElement("p");
            let response;

            img.width = 1200;

            response = json;

            if (response.length === 0) {
                warning.innerHTML += "(Error: 001)"
                insertImg.appendChild(warning);
                return;
            }

            noneOfTags = sessionStorage.getItem("noneOfTags").split(",");  
            response = remove(response, element => !element.file_url.endsWith('.mp4'));
            noneOfTags.forEach(tag => {
                response = remove(response, element => !element.tags.includes(tag))
            })

            let post;

            if (response && response.length > 0) {
                const randomIndex = Math.floor(Math.random() * response.length);
                post = response[randomIndex];
            }

            if (post === undefined) {
                warning.innerHTML += "(Error: 002)"
                insertImg.appendChild(warning);
            } else {
                console.log(post);
                p.innerHTML = `Tags: ${post.tags} \n Id: ${post.id}`;
                img.src = post.file_url
                insertImg.appendChild(p);
                insertImg.appendChild(img);
            }

        });
}

const createQuery = () => {
    allOfTags = sessionStorage.getItem("allOfTags").split(",");
    let ret = allOfTags.join('%20');

    anyOfTags = sessionStorage.getItem("anyOfTags").split(",");
    let randomAnyOfTag = Math.floor(Math.random() * anyOfTags.length);
    ret = ret + '%20' + anyOfTags[randomAnyOfTag];

    return ret;
}

const remove = (arr, func) =>
    Array.isArray(arr)
        ? arr.filter(func).reduce((acc, val) => {
            arr.splice(arr.indexOf(val), 1);
            return acc.concat(val);
        }, [])
        : [];


