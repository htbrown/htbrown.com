let params = new URLSearchParams(window.location.search);

// Bring tags in from CMS for pills
$.ajax({
    url: 'https://cms.c.htbrown.net/items/tags',
    success: (result) => {
        let tags = "";
        for (i in result.data) {
            if (params.get('tag') === result.data[i].name) {
                tags = tags + '<a href="/projects" class="pill active">' + result.data[i].name + '<i class="pill-close ai-cross"></i></a>';
            } else {
                tags = tags + '<a href="/projects?tag=' + result.data[i].name + '" class="pill">' + result.data[i].name + '</a>';
            }
        }
        $('#projectTags').html(tags);
    },
    error: () => {
        $('#projectContent').html('<p><strong>Uh oh.</strong> Data for the requested tag couldn\'t be retrieved. Please try again or <a href="mailto:hayden@htbrown.com">email me</a> if the issue persists.</p>');
    }
})

// Function to build the card object
async function getCardProps(data) {
    let classname = "card dark fixed animate__animated animate__zoomIn animate__faster",
        taglist = "",
        buttons = "",
        stylelist = "",
        featured = "";

    if (data.image !== null) stylelist = stylelist + `background: linear-gradient( rgba(69, 28, 49, 0.9), rgba(69, 28, 49, 0.9) ), url(https://cms.c.htbrown.net/assets/${data.image});background-size: cover;`;
    if (data.code !== null) buttons = buttons + `<a href="${data.code}" class="btn small"><span><i class="ai-github-fill"></i></span></a>`;
    if (data.link !== null) buttons = buttons + `<a href="${data.link}" class="btn small"><span><i class="ai-link-chain"></i></span></a>`;
    if (data.featured === true) {
        featured = '<i class="featured ai-star"></i>';
        //stylelist = stylelist + 'border: 5px rgb(255, 196, 0) solid;';
    }

    for (i in data.tags) {
        if (i != data.tags.length - 1) {
            taglist = taglist + data.tags[i] + " &bull; ";
        } else {
            taglist = taglist + data.tags[i];
        }
    }
    return { classname, taglist, buttons, stylelist, featured };
}

// Function to handle the data coming in from the CMS
async function handleData(data) {
    let projects = "";
    let featured = "";

    console.log(data);

    for (let i = 0; i < data.length; i++) {
        if (params.get('tag') && (data[i].tags === null || !data[i].tags.includes(params.get('tag')))) continue;

        let properties = await getCardProps(data[i]);
        let final = `
            <div class="${properties.classname}" style="${properties.stylelist}">
                <div class="card-content">
                    <h2>${data[i].name}${properties.featured}</h2>
                    <p>${properties.taglist}</p>
                    <p>${data[i].shortDescription}</p>
                    <p>${properties.buttons}</p>
                </div>
            </div> 
        `;
        
        if (data[i].featured) {
            featured = featured + final;
        } else {
            projects = projects + final;
        }
    }
    if (projects === "") {
        $('#projectContent').html('<p><strong>Uh oh.</strong> There aren\'t any entries for the chosen tag.</p>');
    } else {
        $('#projectContent').html(projects);
    }
    if (featured !== "") {
        $('#projectFeatured').css('display', 'flex');
        $('#projectFeatured').html(featured);
    }
}

// Get the data from the CMS
$.ajax({
    url: 'https://cms.c.htbrown.net/items/projects',
    success: async (result) => {
        await handleData(result.data);
    },
    error: () => {
        $('#projectContent').html('<p><strong>Uh oh.</strong> Data for the requested tag couldn\'t be retrieved. Please try again or <a href="mailto:hayden@htbrown.com">email me</a> if the issue persists.</p>');
    }
})