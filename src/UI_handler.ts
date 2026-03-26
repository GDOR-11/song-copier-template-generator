import { textboxes, render } from "./renderer";
import Textbox from "./textbox";
import languages from "./languages.json";

const elements: { [id: string]: HTMLElement } = {
    "default-header": null,
    "edit-header": null,
    "new-textbox": null,
    "select-all": null,
    "delete-textbox": null,
    "edit-textbox": null,
    "textbox-editor-container": null,
    "textbox-editor-input": null,
    "textbox-editor-done": null,
    "textbox-editor-cancel": null,
    "increase-font": null,
    "decrease-font": null,
    "switch-alignment": null
} as any as { [id: string]: HTMLElement };
for (const id in elements) {
    const element = document.getElementById(id);
    if (element === null) {
        alert("shit");
        throw "fuck";
    }
    elements[id] = element;
}

(() => {
    let language_tag = (navigator.language || navigator.languages[0] || "pt").split("-")[0];
    if (!(language_tag in languages)) language_tag = "pt";
    let language = languages[language_tag as keyof typeof languages];
    for (let id in language) {
        elements[id].textContent = language[id as keyof typeof language];
    }
})();

export function update_header() {
    if (textboxes.every(textbox => !textbox.selected)) {
        elements["default-header"].style.display = "flex";
        elements["edit-header"].style.display = "none";
    } else {
        elements["default-header"].style.display = "none";
        elements["edit-header"].style.display = "flex";
    }
}

elements["new-textbox"].addEventListener("click", () => {
    textboxes.push(new Textbox());
    render();
});
elements["select-all"].addEventListener("click", () => {
    textboxes.forEach(textbox => textbox.selected = true);
    update_header();
    render();
});
elements["delete-textbox"].addEventListener("click", () => {
    for (let i = textboxes.length - 1; i >= 0; i--) {
        if (textboxes[i].selected) textboxes.splice(i, 1);
    }
    update_header();
    render();
});
elements["edit-textbox"].addEventListener("click", () => {
    elements["textbox-editor-container"].style.display = "flex";
    const selected = textboxes.filter(textbox => textbox.selected);
    if (selected.every(textbox => textbox.text === selected[0].text)) {
        (elements["textbox-editor-input"] as HTMLTextAreaElement).value = selected[0].text;
    }
});
elements["textbox-editor-done"].addEventListener("click", () => {
    const selected = textboxes.filter(textbox => textbox.selected);
    const new_text = (elements["textbox-editor-input"] as HTMLTextAreaElement).value;
    selected.forEach(textbox => textbox.text = new_text);
    elements["textbox-editor-container"].style.display = "none";
    (elements["textbox-editor-input"] as HTMLTextAreaElement).value = "";
    render();
});
elements["textbox-editor-cancel"].addEventListener("click", () => {
    elements["textbox-editor-container"].style.display = "none";
    (elements["textbox-editor-input"] as HTMLTextAreaElement).value = "";
});
elements["increase-font"].addEventListener("click", () => {
    textboxes.forEach(textbox => {
        if (textbox.selected) textbox.font_size *= 1.05;
    });
    render();
});
elements["decrease-font"].addEventListener("click", () => {
    textboxes.forEach(textbox => {
        if (textbox.selected) textbox.font_size /= 1.05;
    });
    render();
});
elements["switch-alignment"].addEventListener("click", () => {
    textboxes.forEach(textbox => {
        if (textbox.selected) {
            if (textbox.alignment === "left") textbox.alignment = "center";
            else if (textbox.alignment === "center") textbox.alignment = "right";
            else if (textbox.alignment === "right") textbox.alignment = "left";
        }
    });
    render();
});
