import "./style.css"

const fileInput = document.getElementById("fileInput");
const uploadsList = document.getElementById("uploadsList");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    if (uploadsList.classList.contains("uploads-placeholder")) {
      uploadsList.textContent = "";
      uploadsList.classList.remove("uploads-placeholder");
    }

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const videoURL = URL.createObjectURL(file);

    const newItem = document.createElement("div");
    newItem.className = "file-item";
    newItem.innerHTML = `
      <div class="file-info">
        <video class="thumbnail" muted autoplay loop>
          <source src="${videoURL}" type="${file.type}">
        </video>
        <span>${file.name}<br>${sizeInMB}MB</span>
      </div>
      <div class="delete-icon" title="Remove"></div>
    `;

    newItem.querySelector(".delete-icon").addEventListener("click", () => {
      newItem.remove();
      if (uploadsList.children.length === 0) {
        uploadsList.textContent = "No uploads yet";
        uploadsList.classList.add("uploads-placeholder");
      }
    });

    uploadsList.prepend(newItem);
    fileInput.value = "";
  }
});
