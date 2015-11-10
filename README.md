# Ember-stable-array

This is for pre 1.13.x ember

This is a hack, to get faster `each` re-rendering pre-glimmer.  It does so by
keeping a stable array of proxies, mutating the length of the array and proxy
content.

Yes you will get proxies all over the place, yes this will potentially cause
you some grief. But it can perform (especially for list sorting/filtering)
signifcantly better.

## Installation

`ember install ember-stable-array`

```
import stable from 'ember-stable-array/computed';
import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('columns', [1,2,3,4,5]);
    this.set('data', generateRandomArray(250));
  },

  stable: stable('data'),

  actions: {
    newData() {
      this.set('data', generateRandomArray(250));
    }
  }
});

function name() {
  return Math.random().toString(36);
}

function generateRandomArray(count) {
  var output = new Array(count);

  for (var i = 0; i < count; i++) {
    output[i] = { name: name() };
  }

  return output;
}
```

```
{{#each row in stableData}}
  {{#each column in columns}}
    {{other-component name=row.name}}
  {{/each}}
{{/each}}
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
