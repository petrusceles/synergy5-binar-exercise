const onLoad = () => {
  console.log("html loaded");

  fetch("http://localhost:2000/people")
    .then((response) => response.json())
    .then((responseJSON) => {
      const container = document.getElementById("list-data")

      responseJSON.forEach((data) => {
        const child = document.createElement('div');
        const name = document.createElement('h1');
        const age = document.createElement('div');

        name.innerText = data.name;
        age.innerText = data.age;

        child.append(name);
        child.append(age);

        container.append(child);
      })
    });
}

onLoad();

const onSearch = () => {
  console.log("filter triggered");

  const queryNameEl = document.getElementById("query-name");
  const queryName = queryNameEl.value;

  fetch("http://localhost:2000/people")
    .then((response) => response.json())
    .then((responseJSON) => {
      const container = document.getElementById("list-data")
      container.innerText = "";

      if (queryName !== "")
        responseJSON = responseJSON.filter((data) => data.name.includes(queryName));

      responseJSON.forEach((data) => {
        const child = document.createElement('div');
        const name = document.createElement('h1');
        const age = document.createElement('div');

        name.innerText = data.name;
        age.innerText = data.age;

        child.append(name);
        child.append(age);

        container.append(child);
      })
    });
}