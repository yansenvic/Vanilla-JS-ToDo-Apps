const listtodo = JSON.parse(localStorage.getItem("listtodo")) ?? [];

function Link(props) {
  const link = document.createElement("a");
  link.href = props.href;
  link.textContent = props.label;
  link.onclick = function (event) {
    event.preventDefault();
    history.pushState(null, "", event.target.href);
    render();
  };

  return link;
}

function navBar() {
  const linkhome = Link({
    href: "#home",
    label: "Home",
  });

  const linkadd = Link({
    href: "#add",
    label: "Add ToDo",
  });
  const div = document.createElement("div");
  div.append(linkhome);
  div.append(" - ");
  div.append(linkadd);
  return div;
}

function homePage() {
  const navbar = navBar();
  const judul = document.createElement("p");
  const ullist = document.createElement("ol");
  judul.textContent = "Berikut list ToDo Anda :";
  for (var i = 0; i < listtodo.length; i++) {
    const list = document.createElement("li");
    list.textContent = listtodo[i];
    const button = document.createElement("input");
    button.type = "button";
    button.value = "x";
    button.id = i;
    button.onclick = function (event) {
      event.preventDefault();
      listtodo.splice(button.id, 1);
      localStorage.setItem("listtodo", JSON.stringify(listtodo));
      render();
    };
    list.append(" - ");
    list.appendChild(button);
    ullist.appendChild(list);
  }
  const div = document.createElement("div");
  div.append(navbar);
  div.append(judul);
  div.append(ullist);

  return div;
}

function addPage() {
  const navbar = Link({
    href: "#home",
    label: "Kembali ke List",
  });
  const form = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("input");
  input.type = "text";
  input.id = "input";
  button.type = "button";
  input.placeholder = "Tambahkan disini";
  button.value = "Input";
  input.oninput = function (event) {
    event.preventDefault();
  };
  button.onclick = function (event) {
    if (input.value === "") {
      alert("Nilai Harus Terisi");
    } else if (input.value !== "") {
      listtodo.push(input.value);
      localStorage.setItem("listtodo", JSON.stringify(listtodo));
      input.value = "";
      history.pushState(null, "", navbar.href);
      render();
    }
  };
  form.append(input);
  form.append(button);
  const div = document.createElement("div");
  div.append(navbar);
  div.append(form);
  return div;
}

function App() {
  const homepage = homePage();
  const addpage = addPage();
  if (location.hash === "#home" || location.hash === "") {
    return homepage;
  } else if (location.hash === "#add") {
    return addpage;
  }
}

function render() {
  const root = document.getElementById("root");
  const app = App();
  root.innerHTML = "";
  root.append(app);
}

render();
