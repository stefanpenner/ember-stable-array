import Ember from 'ember';
import syncArray from './sync-array';

var count = 0;

export default function stable(key, reload) {
  let stableArrayName = `_stable-array-${count++}`;

  return Ember.computed(key + '.[]', reload, function() {
    if (this[stableArrayName] === undefined || this.get(reload)) {
      this[stableArrayName] = [];
    }

    var stableArray = this[stableArrayName];
    syncArray(stableArray, this.get(key));
    return stableArray;
  });
}

