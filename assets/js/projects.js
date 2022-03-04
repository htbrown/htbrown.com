let params = new URLSearchParams(window.location.search);

let projectsArea = document.getElementById("projectsContent");
let project = "";

function handleCard(data) {
  let classname = "card fixed animate__animated animate__zoomIn animate__faster",
    taglist = "",
    buttons = "",
    stylelist = "";

  if (data.image != null) {
    classname = classname + " dark";
    stylelist =
      stylelist +
      "background: linear-gradient( rgba(69, 28, 49, 0.9), rgba(69, 28, 49, 0.9) ), url(https://cms.c.htbrown.net" +
      data.image.formats.medium.url +
      ");";
  }
  if (data.code != null) {
    buttons =
      buttons +
      '<a href="' +
      data.code +
      '" class="btn small"><span><i class="ai-github-fill"></i></span></a>';
  }
  if (data.link != null) {
    buttons =
      buttons +
      '<a href="' +
      data.link +
      '" class="btn small"><span><i class="ai-link-chain"></i></span></a>';
  }
  for (i in data.tags) {
    if (i != data.tags.length - 1) {
      taglist = taglist + data.tags[i].name + " &bull; ";
    } else {
      taglist = taglist + data.tags[i].name;
    }
  }
  return { classname, taglist, buttons, stylelist };
}

function handleData(data) {
    if (data.length < 1) {
        projectsArea.innerHTML = '<p><strong>Uh oh.</strong> There aren\'t any entries for the chosen tag.</p>';
        return;
    }
  for (i in data) {
      fetch("https://cms.c.htbrown.net/project/" + data[i].id)
        .then(r => r.json())
        .then(async d => {
            let settings = await handleCard(d);
                project =
                  project +
                  `
            <div class="${settings.classname}" style="${settings.stylelist}">
                <h2>${d.name}</h2>
                <p>${settings.taglist}</p>
                <p>${d.description}</p>
                <p>${settings.buttons}</p>
            </div>   
          `;
                projectsArea.innerHTML = project;

        })
  }
  project = "", classname = "card fixed", taglist = "", buttons = "", stylelist = "";
}

if (params.get("tag")) {
  fetch("https://cms.c.htbrown.net/tags/" + params.get("tag"))
    .then((r) => r.json())
    .then(async (data) => {
      await handleData(data.projects);
    })
    .catch((error) => {
        console.log(error);
      projectsArea.innerHTML =
        '<p><strong>Uh oh.</strong> Data for the requested tag couldn\'t be retrieved. Please try again or <a href="mailto:hayden@htbrown.com">email me</a> if the issue persists.</p>';
    });
} else {
  fetch("https://cms.c.htbrown.net/project")
    .then((r) => r.json())
    .then(async (data) => {
      console.log(data);
      await handleData(data);
      projectsArea.innerHTML = project;
    })
    .catch((error) => {
        console.log(error);
      projectsArea.innerHTML =
        '<p><strong>Uh oh.</strong> Data for the requested tag couldn\'t be retrieved. Please try again or <a href="mailto:hayden@htbrown.com">email me</a> if the issue persists.</p>';
    });
}


let tagArea = document.getElementById("projectsTags");
let tags = "";

fetch("https://cms.c.htbrown.net/tags")
  .then((r) => r.json())
  .then((data) => {
    for (i in data) {
      if (params.get("tag") == data[i].id) {
        tags =
          tags + '<a href="/projects" class="pill active">' + data[i].name + "</a>";
      } else {
        tags =
          tags +
          '<a href="/projects?tag=' +
          data[i].id +
          '" class="pill">' +
          data[i].name +
          "</a>";
      }
    }
    tagArea.innerHTML = tags;
  });
