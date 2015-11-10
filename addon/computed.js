import Ember from 'ember';
import syncArray from './sync-array';

var count = 0;

export default function stable(key) {
  let stableArrayName = `_stable-array-${count++}`;

  return Ember.computed(key + '.[]', function() {
    if (this[stableArrayName] === undefined) {
      this[stableArrayName] = [];
    }

    var stableArray = this[stableArrayName];
    syncArray(stableArray, this.get('data'));
    return stableArray;
  });
}

