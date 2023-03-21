let state = {
  hash: location.hash,
  listtodo: JSON.parse(localStorage.getItem("listtodo")) ?? [],
};

function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  console.log(typeof nextState.listtodo);
  onStatechange(prevState, nextState);
  render();
}

function onStatechange(prevState, nextState) {
  if (
    prevState.listtodo !== nextState.listtodo &&
    typeof nextState.listtodo == "object"
  ) {
    nextState.listtodo = [...prevState.listtodo, ...nextState.listtodo];
    state = nextState;
    localStorage.setItem("listtodo", JSON.stringify(nextState.listtodo));
  }

  if (
    prevState.listtodo !== nextState.listtodo &&
    typeof nextState.listtodo == "number"
  ) {
    prevState.listtodo.splice(nextState.listtodo, 1);
    state = prevState;
    localStorage.setItem("listtodo", JSON.stringify(prevState.listtodo));
  }

  if (prevState.hash !== nextState.hash) {
    state = nextState;
    history.pushState(null, "", nextState.hash);
  }
}

function Link(props) {
  const link = document.createElement("a");
  link.href = props.href;
  link.textContent = props.label;
  link.onclick = function (event) {
    event.preventDefault();
    const url = new URL(event.target.href);
    setState({ hash: url.hash });
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

function print_list(props) {
  const ullist = document.createElement("ol");
  state.listtodo.forEach((lists, index) => {
    const list = document.createElement("li");
    const button = document.createElement("button");
    list.textContent = lists;
    button.textContent = "x";
    button.onclick = function (event) {
      setState({ listtodo: index });
    };
    list.append(" - ");
    list.append(button);
    ullist.appendChild(list);
  });
  return ullist;
}

function homePage() {
  const navbar = navBar();
  const list = print_list(state.listtodo);
  const judul = document.createElement("p");
  judul.textContent = "Berikut list ToDo Anda :";
  const div = document.createElement("div");
  div.append(navbar);
  div.append(judul);
  div.append(list);

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
      setState({ listtodo: [input.value], hash: navbar.attributes.href.value });
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
