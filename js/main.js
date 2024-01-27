const basicAllOfTags = ["1girl1boy"];
const allOfTagsInsert = document.getElementById("all-of-tags");
const addAllOfText = document.getElementById("add-all-of");

const basicAnyOfTags = ["vaginal", "anal", "fellatio", "bondage"];
const anyOfTagsInsert = document.getElementById("any-of-tags");
const addAnyOfText = document.getElementById("add-any-of");

const basicNoneOfTags = ["gore", "creampie", "cum"];
const noneOfTagsInsert = document.getElementById("none-of-tags");
const addNoneOfText = document.getElementById("add-none-of");

const API_BASE_URL = 'https://api.rule34.xxx/index.php';

const insertImg = document.getElementById("insert-img");
const button = document.getElementById("generate-button");

const start = () => {
    if(localStorage.getItem("allOfTags") === null) {
        localStorage.setItem("allOfTags", basicAllOfTags)
    }
    if(localStorage.getItem("anyOfTags") === null) {
        localStorage.setItem("anyOfTags", basicAnyOfTags)
    }
    if(localStorage.getItem("noneOfTags") === null) {
        localStorage.setItem("noneOfTags", basicNoneOfTags)
    }
    let allOfTags = localStorage.getItem("allOfTags")
    let anyOfTags = localStorage.getItem("anyOfTags")
    let noneOfTags = localStorage.getItem("noneOfTags")

    if (allOfTags.length > 0) allOfTags = allOfTags.split(",");
    if (anyOfTags.length > 0) anyOfTags = anyOfTags.split(",");
    if (noneOfTags.length > 0) noneOfTags = noneOfTags.split(",");

    allOfTagsInsert.innerHTML = "";
    anyOfTagsInsert.innerHTML = "";
    noneOfTagsInsert.innerHTML = "";
    if (allOfTags && allOfTags.length > 0) {
        let ul = document.createElement("ul");
        ul.className = "list-group mb-2";
        allOfTags.forEach(tag => {
            let row = document.createElement("div");
            row.className = "row";
            let col11 = document.createElement("div");
            col11.className = "col-11";
            let col1 = document.createElement("div");
            col1.className = "col-1 p-0";

            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = tag;
            let button = document.createElement("button");
            button.id = "remove-" + tag;
            button.className = "btn btn-danger h-100 w-100"
            button.type = "button";
            button.innerHTML = "X"
            button.onclick = () => {
                sessionList = localStorage.getItem("allOfTags").split(",");
                let removeTag = button.id.split("-")[1];
                sessionList = remove(sessionList, element => element != removeTag);
                localStorage.setItem("allOfTags", sessionList);

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
        ul.className = "list-group mb-2";
        anyOfTags.forEach(tag => {
            let row = document.createElement("div");
            row.className = "row";
            let col11 = document.createElement("div");
            col11.className = "col-11";
            let col1 = document.createElement("div");
            col1.className = "col-1 p-0";

            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = tag;
            let button = document.createElement("button");
            button.id = "remove-" + tag;
            button.className = "btn btn-danger h-100 w-100"
            button.type = "button";
            button.innerHTML = "X"
            button.onclick = () => {
                sessionList = localStorage.getItem("anyOfTags").split(",");
                let removeTag = button.id.split("-")[1];
                sessionList = remove(sessionList, element => element != removeTag);
                localStorage.setItem("anyOfTags", sessionList);

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
        ul.className = "list-group mb-2";
        noneOfTags.forEach(tag => {
            let row = document.createElement("div");
            row.className = "row";
            let col11 = document.createElement("div");
            col11.className = "col-11";
            let col1 = document.createElement("div");
            col1.className = "col-1 p-0";

            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = tag;
            let button = document.createElement("button");
            button.id = "remove-" + tag;
            button.className = "btn btn-danger h-100 w-100"
            button.type = "button";
            button.innerHTML = "X"
            button.onclick = () => {
                sessionList = localStorage.getItem("noneOfTags").split(",");
                let removeTag = button.id.split("-")[1];
                sessionList = remove(sessionList, element => element != removeTag);
                localStorage.setItem("noneOfTags", sessionList);

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
    if (tag == "") return;
    console.log(localStorage.getItem("allOfTags"))
    allOfTags = localStorage.getItem("allOfTags") == "" ? [] : localStorage.getItem("allOfTags").split(",");
    allOfTags.push(tag);
    allOfTags = [...new Set(allOfTags)];
    localStorage.setItem("allOfTags", allOfTags);
    addAllOfText.value = "";

    start();
}

const addAnyOf = () => {
    let tag = addAnyOfText.value;
    if (tag == "") return;
    anyOfTags = localStorage.getItem("anyOfTags") == "" ? [] : localStorage.getItem("anyOfTags").split(",");
    anyOfTags.push(tag);
    anyOfTags = [...new Set(anyOfTags)];
    localStorage.setItem("anyOfTags", anyOfTags);
    addAnyOfText.value = "";

    start();
}

const addNoneOf = () => {
    let tag = addNoneOfText.value;
    if (tag == "") return;
    noneOfTags = localStorage.getItem("noneOfTags") == "" ? [] : localStorage.getItem("noneOfTags").split(",");
    noneOfTags.push(tag);
    noneOfTags = [...new Set(noneOfTags)];
    localStorage.setItem("noneOfTags", noneOfTags);
    addNoneOfText.value = "";

    start();
}

const getImage = async () => {
    insertImg.innerHTML = "";
    const randomPage = Math.floor(Math.random() * 10);

    const request = `${API_BASE_URL}?page=dapi&s=post&q=index&json=1&tags=${createQuery()}&pid=${randomPage}`;

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

            noneOfTags = localStorage.getItem("noneOfTags").split(",");  
            response = remove(response, element => !element.file_url.endsWith('.mp4'));
            if (noneOfTags[0] !== '') {
                noneOfTags.forEach(tag => {
                    response = remove(response, element => !element.tags.includes(tag))
                })
            }
            console.log(response);

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
    allOfTags = localStorage.getItem("allOfTags").split(",");
    let ret = allOfTags.join('%20');

    anyOfTags = localStorage.getItem("anyOfTags").split(",");
    if (anyOfTags[0] !== '') {
        let randomAnyOfTag = Math.floor(Math.random() * anyOfTags.length);
        ret = ret + '%20' + anyOfTags[randomAnyOfTag];
    }

    return ret;
}

const remove = (arr, func) =>
    Array.isArray(arr)
        ? arr.filter(func).reduce((acc, val) => {
            arr.splice(arr.indexOf(val), 1);
            return acc.concat(val);
        }, [])
        : [];
