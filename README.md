# My personal implementation of Adventofcode 2023.

## Usage
We use the `DAY=<day>` environment variable to specify the day to run. It should not be padded with a zero. In the following examples, we use `DAY=1` to run the first day.

### With real input:
```bash
# without nodemon
DAY=1 npm start
# using nodemon
DAY=1 npm run nodemon
# debugging
DAY=1 npm run dev:debug
```

### With test input:
```bash
# this runs all tests. Use Jest extension in VSCode to run individual tests.
npm run test
```

### Linting
```bash
npm run lint
```

### Generating new day
using `./makeday.sh <day>` you can automatically generate a new day:
```bash
./makeday.sh 1
```

## Folder structure
### `src/`
This folder contains the source code for the solutions. Each day has its own folder, with a two digit number name. All Common code is in the `utils/` folder. Uses the files from the `data/` folder as input.
### `test/`
This folder contains the tests for the solutions. Each day has its own folder, with a two digit number name. Uses the files from the `data_test/` folder as input.
### `data/`
This folder contains the input data for the solutions. The format is `day<day>.txt`. If a day has more than one input, the format`day<day>_<part>.txt` is used for all parts except the first.
### `data_test/`
Same as `data/`, but for the test input.
