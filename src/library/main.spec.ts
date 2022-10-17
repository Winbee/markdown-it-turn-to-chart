import { test, describe, expect } from "vitest";
import * as fs from "fs";
import * as prettier from "prettier";
import MarkdownIt from "markdown-it";
import turnToChart from "./main";

describe("Parses basic", () => {
  describe("extractTableData", () => {
    const cases: {
      title: string;
      input: string;
    }[] = [
      {
        title: "test1",
        input: `
\`\`\`turnToChart
| xLabel     | series1 (unit1) | series2 (unit2) | series3 (unit3) |
| :--------- | -------------- | -------------- | -------------- |
| category 1 | 2              | 4              | 1              |
| category 2 | 4              | 5              | 2              |
| category 3 | 8              | 2              | 2              |

legendTitle: This is a title
\`\`\`
      `,
      },
      {
        title: "test2",
        input: `
\`\`\`turnToChart
| xLabel | series1 (unit1) | series2 (unit2) | series3 (unit3) |
| ------ | -------------- | -------------- | -------------- |
| 0      | 2              | 4              | 14             |
| 1      | 4              | 5              | 2              |
| 2      | 8              | 1              | 1              |
| 3      | 2              | 1              | 4              |
| 4      | 3              | 1              | 3              |
| 8      | 4              | 10             | 5              |

yAxisNbOfTicks: 10
yAxisOrigin: from zero
\`\`\`
      `,
      },
      {
        title: "test3",
        input: `
\`\`\`turnToChart
xLabel, series1 (unit1), series2 (unit2)
0, 2000 , 2000
1, 4000, 1000
35, 8000, 2500

legendTitle: This is a title
yAxisOrigin: from zero
\`\`\`
      `,
      },
    ];

    test.each(cases)("return expected value for $title", ({ title, input }) => {
      const mdit = MarkdownIt().use(turnToChart);
      const output = mdit.render(input);
      const formatedOutput = prettier.format(output, { filepath: "file.html" });

      const fileName = title.split(" ").join("_");
      const filePath = `${__dirname}/testAsset/${fileName}.html`;
      if (!fs.existsSync(filePath)) {
        // When the file doesn't exist, we create them like snapshot test.
        fs.writeFileSync(filePath, formatedOutput);
      }
      const expectedOutput = prettier.format(
        fs.readFileSync(filePath).toString(),
        {
          filepath: "file.html",
        }
      );

      expect(formatedOutput).toEqual(`${expectedOutput}`);
    });
  });
});
