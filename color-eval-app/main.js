const adjectives = [
  { label: "楽しい – つまらない", name: "fun" },
  { label: "あたたかい – 冷たい", name: "warm" },
  { label: "活発 – 落ち着いた", name: "active" },
  { label: "明るい – 暗い", name: "bright" },
  { label: "好き – 嫌い", name: "like" },
];

const colorPairs = [
  { name: "活発", bg: "#ff6347", fg: "#ffd700" },
  { name: "清潔", bg: "#ffffff", fg: "#4682b4" },
  { name: "自然", bg: "#8fbc8f", fg: "#654321" },
  { name: "高級感", bg: "#4b0082", fg: "#000000" },
  { name: "やさしさ", bg: "#ffb6c1", fg: "#add8e6" },
];

let index = 0;
const ratings = {};
const comment = document.createElement('textarea');
const app = document.getElementById('app');

function render() {
  const pair = colorPairs[index];
  app.innerHTML = "";

  const box = document.createElement("div");
  box.className = "relative w-full h-32 mb-6 rounded-lg overflow-hidden";

  const bg = document.createElement("div");
  bg.className = "absolute inset-0";
  bg.style.backgroundColor = pair.bg;

  const fg = document.createElement("div");
  fg.className = "absolute top-4 left-4 w-3/5 h-3/5 rounded-lg border-2 border-white";
  fg.style.backgroundColor = pair.fg;

  const label = document.createElement("div");
  label.className = "absolute inset-0 flex items-center justify-center text-white text-lg font-semibold shadow-md";
  label.innerText = `${pair.name}: ${pair.bg} + ${pair.fg}`;

  box.appendChild(bg);
  box.appendChild(fg);
  box.appendChild(label);
  app.appendChild(box);

  adjectives.forEach(({ label, name }) => {
    const wrapper = document.createElement("div");
    wrapper.className = "mb-4";

    const lbl = document.createElement("label");
    lbl.className = "block text-sm font-medium text-gray-700 mb-1";
    lbl.innerText = label;
    wrapper.appendChild(lbl);

    const input = document.createElement("input");
    input.type = "range";
    input.min = 1;
    input.max = 7;
    input.step = 1;
    input.defaultValue = 4;
    input.className = "w-full";
    input.oninput = () => {
      ratings[name] = Number(input.value);
    };

    wrapper.appendChild(input);
    app.appendChild(wrapper);
  });

  const commentLabel = document.createElement("label");
  commentLabel.className = "block text-sm font-medium text-gray-700 mb-1";
  commentLabel.innerText = "印象や連想語など自由記述";
  app.appendChild(commentLabel);

  comment.className = "w-full border border-gray-300 rounded p-2 mb-4";
  app.appendChild(comment);

  const buttons = document.createElement("div");
  buttons.className = "flex justify-between";

  const next = document.createElement("button");
  next.innerText = "次の配色";
  next.className = "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300";
  next.onclick = () => {
    index = (index + 1) % colorPairs.length;
    render();
  };

  const submit = document.createElement("button");
  submit.innerText = "送信";
  submit.className = "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";
  submit.onclick = () => {
    const data = {
      pair: pair.name,
      background: pair.bg,
      foreground: pair.fg,
      ratings,
      comment: comment.value,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `color-eval-${pair.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  buttons.appendChild(next);
  buttons.appendChild(submit);
  app.appendChild(buttons);
}

render();
