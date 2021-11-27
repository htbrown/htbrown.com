let params = new URLSearchParams(window.location.search);

let workArea = document.getElementById("workContent");
let classname = "card fixed",
  taglist = "",
  buttons = "",
  stylelist = "";
let work = "";

function handleCard(data) {
  if (data.image != null) {
    classname = classname + " dark";
    stylelist =
      stylelist +
      "background: linear-gradient( rgba(69, 28, 49, 0.5), rgba(69, 28, 49, 0.5) ), url(https://cms.c.htbrown.net" +
      data.image.formats.large.url +
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
        workArea.innerHTML = '<p><strong>Uh oh.</strong> There aren\'t any entries for the chosen tag.</p>';
        return;
    }
  for (i in data) {
      fetch("https://cms.c.htbrown.net/works/" + data[i].id)
        .then(r => r.json())
        .then(d => {
            console.log(d);
            let settings = handleCard(d);
                work =
                  work +
                  `
            <div class="${settings.classname}" style="${settings.stylelist}" data-aos="zoom-in">
                <h2>${d.name}</h2>
                <p>${settings.taglist}</p>
                <p>${d.description}</p>
                <p>${settings.buttons}</p>
            </div>   
          `;
                workArea.innerHTML = work;

        })
  }
}

if (params.get("tag")) {
  fetch("https://cms.c.htbrown.net/tags/" + params.get("tag"))
    .then((r) => r.json())
    .then((data) => {
      handleData(data.works);
    })
    .catch((error) => {
        console.log(error);
      workArea.innerHTML =
        '<p><strong>Uh oh.</strong> Data for the requested tag couldn\'t be retrieved. Please try again or <a href="mailto:hayden@htbrown.com">email me</a> if the issue persists.</p>';
    });
} else {
  fetch("https://cms.c.htbrown.net/works")
    .then((r) => r.json())
    .then((data) => {
      handleData(data);
      workArea.innerHTML = work;
    })
    .catch((error) => {
        console.log(error);
      workArea.innerHTML =
        '<p><strong>Uh oh.</strong> Data for the requested tag couldn\'t be retrieved. Please try again or <a href="mailto:hayden@htbrown.com">email me</a> if the issue persists.</p>';
    });
}


let tagArea = document.getElementById("workTags");
let tags = "";

fetch("https://cms.c.htbrown.net/tags")
  .then((r) => r.json())
  .then((data) => {
    for (i in data) {
      if (params.get("tag") == data[i].id) {
        tags =
          tags + '<a href="/work" class="pill active">' + data[i].name + "</a>";
      } else {
        tags =
          tags +
          '<a href="/work?tag=' +
          data[i].id +
          '" class="pill">' +
          data[i].name +
          "</a>";
      }
    }
    tagArea.innerHTML = tags;
  });
