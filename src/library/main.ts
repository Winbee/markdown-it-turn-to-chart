import mdFence from "markdown-it-fence";
import { generateHtmlString } from "turn-to-chart";

export default function turnToChart(md: any): void {
  return mdFence(md, "turnToChart", {
    marker: "`",
    render: render(),
  });
}

function render() {
  return function (tokens: any, idx: any) {
    const token = tokens[idx];

    const result = generateHtmlString(token.content);
    return result.data;
  };
}
