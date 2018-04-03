**React Components**

[Snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html) is used to create records of the expected output from the `render` function of a Component as `.snap` files. Whenever the tests are run, the output of the tested Components is matched with the initially-created snapshots to check for any differences between them. If any differences are found, the test will fail with the differences highlighted in the output from Jest.

Example:

`src/components/ExampleComponent/ExampleComponent.jsx`:
```es6
import React from 'react';

export default function ExampleComponent({ text, showText }) {
  if (showText) {
    return (<p>{text}</p>);
  }
  return (<p>Not showing the text prop yet</p>);
}
```

`test/components/ExampleComponent/ExampleComponent.test.js`
```es6
import React from 'react';
import ExampleComponent from 'components/ExampleComponent/ExampleComponent';

import matchSnapshot from 'helpers/MatchSnapshot';

describe('<ExampleComponent />', () => {
  test('displays text prop', () => {
    const props = {
      text: 'sample text',
      showText: true,
    };
    matchSnapshot(<ExampleComponent {...props} />);
  });

  test('does not display text prop', () => {
    const props = {
      text: 'sample text',
      showText: false,
    };
    matchSnapshot(<ExampleComponent {...props} />);
  });
});
```

Running `npm run test` will lint the Component and test files before starting the Jest test runner, which will generate new `.snap` files in a `test/components/ExampleComponent/__snapshots__/` directory if they do not yet exist. Otherwise, it will check the existing snapshots against the current output of the test.

In the test file, enough `test` statements are created to test every case where different prop values will effect the output of the Component. The `matchSnapshot` helper is used to reduce the amount of repeated boilerplate for testing snapshots and create more readable test statements. If the tested Component contains any routing code, the `matchSnapshotWithProvider` function should be used instead of `matchSnapshot`:

```es6
import { matchSnapshotWithProvider } from 'helpers/MatchSnapshot';
```
