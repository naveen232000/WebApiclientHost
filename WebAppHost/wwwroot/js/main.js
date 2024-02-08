document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const createTaskForm = document.getElementById("createTaskForm");
    function DisplayTask() {
        fetch("http://localhost:37114/api/Tasks")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`http error status ${response.status}`);
                }
                return response.json();
            }) 
            .then(tasks => {
                taskList.innerHTML = "";
                tasks.forEach(task => {
                    const listitem = document.createElement("li");
                    listitem.textContent = `Id:${task.id}, Title : ${task.title}, Description: ${task.description}, DueDate: ${task.dueDate}`;
                    taskList.appendChild(listitem);
                })
            })
            .catch(error => {
                console.error("fetch error :", error);
                taskList.innerHTML = "Error fetch Tasks";
            })
    }
    createTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;

        fetch("http://localhost:37114/api/Tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, dueDate })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`http error status ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("title").value="";
                document.getElementById("description").value="";
                document.getElementById("dueDate").value = "";

                DisplayTask();
            })
            .catch(error => {
                console.error("fetch error :", error);
                taskList.innerHTML = "Error Post Tasks";
            })
    })

    DisplayTask();
});