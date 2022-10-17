# :memo::curly_loop::bar_chart: Transforms tables to charts

This markdownit pluging transforms a `markdown` or `csv` table into an HTML chart


## Usage example

```typescript
  import MarkdownIt from "markdown-it";
  import turnToChart from "markdown-it-turn-to-chart";

  const input = `
  # Here is a chart
  ----

  \`\`\`turnToChart
  xLabel, series1 (unit1), series2 (unit2)
  0, 2000 , 2000
  1, 4000, 1000
  35, 8000, 2500

  legendTitle: This is a title
  yAxisOrigin: from zero
  \`\`\`

  ----
  > Cool
  ----
  `;

  const mdit = MarkdownIt().use(turnToChart);
  const output = mdit.render(input);
  document.getElementById("app").innerHTML = output;
```
